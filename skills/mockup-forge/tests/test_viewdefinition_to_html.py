import importlib.util
import contextlib
import io
import subprocess
import tempfile
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "viewdefinition-to-html.py"
spec = importlib.util.spec_from_file_location("viewdefinition_to_html", SCRIPT)
converter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(converter)

class IndexTitleTest(unittest.TestCase):
    def test_batch_index_uses_wireframe_titles_and_preserves_links(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            input_dir = root / 'input'
            output_dir = root / 'output'
            input_dir.mkdir()
            source = input_dir / 'ViewDefinition-Example-ui.md'
            source.write_text(
                '### UI Wireframe\n<b>Zorg &amp; verslagen</b>\n'
                '<table><tr><th>Naam</th></tr><tr><td>Test</td></tr></table>',
                encoding='utf-8',
            )
            output_dir.mkdir()
            (output_dir / 'ViewDefinition-Example.png').touch()
            result = subprocess.run(
                ['python3', str(SCRIPT.with_name('batch-viewdefinition-mockups.py')),
                 '--input-dir', str(input_dir), '--output-dir', str(output_dir)],
                capture_output=True, text=True,
            )
            self.assertEqual(result.returncode, 0, result.stderr)
            index = (output_dir / 'index.html').read_text(encoding='utf-8')
            self.assertIn('<h3>Zorg &amp; verslagen</h3>', index)
            self.assertIn('href="ViewDefinition-Example.html"', index)
            self.assertIn('href="ViewDefinition-Example.png"', index)
            self.assertNotIn('<h3>Example</h3>', index)


class ScreenIconTest(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        self.addCleanup(self.temp.cleanup)
        self.fo_dir = Path(self.temp.name)

    def write_fo(self, screen, contents):
        (self.fo_dir / converter.FO_SCREENS[screen][0]).write_text(contents, encoding='utf-8')

    def icons(self, screen):
        with contextlib.redirect_stderr(io.StringIO()):
            return converter.get_screen_icons(Path(f'ViewDefinition-{screen}-ui.md'), self.fo_dir)

    def test_selected_icon_and_alias_are_read_from_screen_section(self):
        self.write_fo('Condition', """# Schermontwerp
| Icoon | [diagnose](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:diagnosis:FILL@0;wght@400) |
# Kaart
| Icoon | [ander](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:home:FILL@0) |
""")
        self.assertEqual(self.icons('Condition'), ('diagnosis',))
        self.assertEqual(self.icons('Probleemlijst'), ('diagnosis',))
        self.write_fo('Condition', '# Schermontwerp\n# Kaart\n| Icoon | [ander](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:home:FILL@0) |\n')
        self.assertEqual(self.icons('Condition'), ())

    def test_css_url_and_labeled_icons(self):
        self.write_fo('Procedure', '# Schermontwerp\n| Icoon | [scalpel](https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined&icon_names=surgical) |\n')
        self.assertEqual(self.icons('Procedure'), ('surgical',))
        self.write_fo('Mobiliteit', """# Schermontwerp
| Iconen | [gezondheidstoestand](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:list_alt_add:FILL@0) <br> [mobiliteit](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:assist_walker:FILL@0) |
""")
        self.assertEqual(self.icons('Mobiliteit'), ('assist_walker',))
        self.assertEqual(self.icons('NutritionAdvice'), ())

    def test_composite_icon_and_missing_metadata_are_reported(self):
        self.write_fo('Intoxicaties', """# Schermontwerp
| Icoon | [Wine bar](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:wine_bar:FILL@0) en [Smoking Rooms](https://fonts.google.com/icons?selected=Material+Symbols+Outlined:smoking_rooms:FILL@0) |
""")
        stderr = io.StringIO()
        with contextlib.redirect_stderr(stderr):
            icons = converter.get_screen_icons(Path('ViewDefinition-Intoxicaties-ui.md'), self.fo_dir)
            missing = converter.get_screen_icons(Path('ViewDefinition-Correspondentie-ui.md'), self.fo_dir)
            unknown = converter.get_screen_icons(Path('ViewDefinition-Unknown-ui.md'), self.fo_dir)
        self.assertEqual(icons, ('wine_bar', 'smoking_rooms'))
        self.assertEqual(missing, ())
        self.assertEqual(unknown, ())
        self.assertIn('benadering', stderr.getvalue())
        self.assertIn('FO niet gevonden', stderr.getvalue())
        self.assertIn('geen FO-icoon gekoppeld', stderr.getvalue())

    def test_symbols_are_loaded_only_for_title_and_default_is_preserved(self):
        tables = converter.extract_tables('<table><tr><th></th><th>Naam</th></tr><tr><td></td><td>Test</td></tr></table>')
        html = converter.generate_full_mockup_html('Test', tables, title_icons=('labs',))
        self.assertIn('icon_names=labs', html)
        self.assertIn('<div class="panel-icon"><span class="material-symbols-outlined" aria-hidden="true">labs</span></div>', html)
        self.assertIn('class="material-icons-outlined sidebar-icon" aria-hidden="true">description</span>', html)
        default = converter.generate_full_mockup_html('Test', tables)
        self.assertNotIn('icon_names=', default)
        self.assertIn('<div class="panel-icon"><span class="material-icons-outlined" aria-hidden="true">description</span></div>', default)


class CorrespondenceDetailsTest(unittest.TestCase):
    def setUp(self):
        source = """<table><tr><th></th><th>Bron</th><th>Naam</th></tr>
        <tr><td>▼</td><td>Epic</td><td>Eerste</td></tr>
        <tr><td></td><td colspan="2"><b>Verslag</b><br/>Eerste tekst</td></tr>
        <tr><td></td><td>Epic</td><td>Tweede zonder details</td></tr>
        <tr><td>▼</td><td>Epic</td><td>Derde</td></tr>
        <tr><td></td><td colspan="2"><b>Verslag</b><br/>Derde tekst</td></tr>
        </table>"""
        self.tables = converter.extract_tables(source)

    def test_correspondence_renders_separate_selectable_details(self):
        html = converter.generate_full_mockup_html("Correspondentie", self.tables, side_details=True)
        self.assertIn('<aside class="correspondence-details"', html)
        self.assertIn('<div id="detail-content" aria-live="polite"><b>Verslag</b><br/>Eerste tekst</div>', html)
        self.assertEqual(html.count('class="selectable-row"'), 3)
        self.assertEqual(html.count('<tr class="selectable-row" tabindex="0" aria-selected="true"'), 1)
        self.assertIn('<h2 id="detail-title">Epic</h2>', html)
        self.assertIn('<template></template>', html)
        self.assertIn('<template><b>Verslag</b><br/>Derde tekst</template>', html)
        self.assertNotIn('<tr data-detail-row="true">', html)
        self.assertNotIn('selection-icon', html)
        self.assertNotIn('▶', html)
        self.assertNotIn('<th></th>', html)
        self.assertIn('<th>Bron <span', html)
        self.assertIn('class="bron-circle"', html)
        self.assertLess(html.index('<div class="panel-body"><table>'), html.index('<aside class="correspondence-details"'))

    def test_other_mockups_keep_inline_details(self):
        html = converter.generate_full_mockup_html("Medicatie", self.tables)
        self.assertNotIn('<aside class="correspondence-details"', html)
        self.assertNotIn('class="selectable-row"', html)
        self.assertIn('<tr data-detail-row="true">', html)
        self.assertIn('<b>Verslag</b><br/>Eerste tekst', html)
        self.assertIn('<th></th>', html)
        self.assertIn('>expand_more</span>', html)

    def test_empty_table_shows_no_details_message(self):
        tables = converter.extract_tables("<table><tr><th></th><th>Bron</th></tr></table>")
        html = converter.generate_full_mockup_html("Correspondentie", tables, side_details=True)
        self.assertIn('Geen details beschikbaar voor deze regel.', html)
        self.assertIn('<h2 id="detail-title">Details</h2>', html)

    def test_title_uses_source_fields_in_order_and_escapes_values(self):
        source = """<table><tr><th></th><th>Beschrijving</th><th>Datum</th><th>Bron</th></tr>
        <tr><td>▼</td><td>Brief &amp; &quot;verslag&quot;</td><td>1-2-2025</td><td>NedapONS</td></tr>
        <tr><td></td><td colspan="3"><b>Verslag</b><br/>Inhoud</td></tr>
        <tr><td></td><td></td><td>2-2-2025</td><td>Epic</td></tr>
        </table>"""
        html = converter.generate_full_mockup_html(
            "Correspondentie", converter.extract_tables(source), side_details=True
        )
        self.assertIn(
            '<h2 id="detail-title">NedapONS · 1-2-2025 · Brief &amp; &quot;verslag&quot;</h2>',
            html,
        )
        self.assertIn('data-detail-title="Epic · 2-2-2025"', html)


class InlineDetailsIconTest(unittest.TestCase):
    def render(self, rows):
        source = (
            '<table><tr><th></th><th>Bron</th><th>Naam</th><th>(Verborgen)</th></tr>'
            + rows + '</table>'
        )
        return converter.create_html_mockup("Gegevens", converter.extract_tables(source))[0]

    def test_mixed_details_only_show_icon_for_nonempty_details(self):
        html = self.render(
            '<tr><td>▼</td><td>Epic</td><td>Eerste</td><td>geheim</td></tr>'
            '<tr><td></td><td colspan="3"><b>Details</b><br/>Inhoud</td></tr>'
            '<tr><td>▼</td><td>CGM</td><td>Tweede</td><td>geheim</td></tr>'
            '<tr><td></td><td colspan="3"><br/><b></b></td></tr>'
            '<tr><td></td><td>Nexus</td><td>Derde</td><td>geheim</td></tr>'
        )
        self.assertIn('<th></th>', html)
        self.assertEqual(html.count('>expand_more</span>'), 1)
        self.assertNotIn('▶', html)
        self.assertEqual(html.count('<tr>\n  <td></td>'), 2)
        self.assertEqual(html.count('data-detail-row="true"'), 1)
        self.assertIn(
            '<tr data-detail-row="true">\n  <td></td>\n'
            '  <td colspan="2"><div>'
            '<b>Details</b><br/>Inhoud</div></td>',
            html,
        )
        self.assertIn('Tweede', html)
        self.assertIn('Derde', html)
        self.assertNotIn('geheim', html)

    def test_no_details_omits_column_but_preserves_full_rows(self):
        html = self.render(
            '<tr><td></td><td>Epic</td><td>Eerste</td><td>geheim</td></tr>'
            '<tr><td></td><td>CGM</td><td>Tweede</td><td>geheim</td></tr>'
            '<tr><td></td><td colspan="3"><br/><b> </b>&nbsp;</td></tr>'
        )
        self.assertNotIn('<th></th>', html)
        self.assertNotIn('>expand_more</span>', html)
        self.assertNotIn('▶', html)
        self.assertNotIn('data-detail-row="true"', html)
        self.assertEqual(html.count('class="bron-circle"'), 2)
        self.assertIn('Eerste', html)
        self.assertIn('Tweede', html)
        self.assertIn('<th>Bron <span', html)

    def test_google_icons_for_data_headers_only(self):
        source = '<tr><td>▼</td><td>Epic</td><td>Eerste</td><td>geheim</td></tr><tr><td></td><td colspan="3">Details</td></tr>'
        html = self.render(source)
        self.assertIn('<th></th>', html)
        self.assertEqual(html.count('>arrow_upward</span>'), 2)
        self.assertEqual(html.count('>arrow_downward</span>'), 2)
        self.assertEqual(html.count('>filter_alt</span>'), 2)

    def test_group_headings_are_preserved_and_not_treated_as_details(self):
        html = self.render(
            '<tr><td colspan="5"><b>Alcohol</b></td></tr>'
            '<tr><td>▼</td><td>Epic</td><td>Eerste</td><td>geheim</td></tr>'
            '<tr><td colspan="5"><b>Roken</b></td></tr>'
            '<tr><td>▼</td><td>CGM</td><td>Tweede</td><td>geheim</td></tr>'
            '<tr><td></td><td colspan="3"><b>Toelichting</b><br/>Inhoud</td></tr>'
        )
        alcohol = '<tr class="group-row"><td colspan="3"><b>Alcohol</b></td></tr>'
        roken = '<tr class="group-row"><td colspan="3"><b>Roken</b></td></tr>'
        self.assertIn(alcohol, html)
        self.assertIn(roken, html)
        self.assertLess(html.index(alcohol), html.index('Eerste'))
        self.assertLess(html.index('Eerste'), html.index(roken))
        self.assertLess(html.index(roken), html.index('Tweede'))
        self.assertEqual(html.count('>expand_more</span>'), 1)
        self.assertEqual(html.count('data-detail-row="true"'), 1)


class NestedTableTest(unittest.TestCase):
    def test_nested_tables_stay_in_their_outer_cells_and_rows(self):
        source = """<table><tr><th></th><th>Bron</th><th>Code</th></tr>
        <tr><td>▼</td><td>Epic</td><td>Eerste</td></tr>
        <tr><td></td><td colspan="2"><b>Componenten</b><br/>
        <table><tr valign="top"><td style="white-space: nowrap">KALIUM</td><td>A &amp; B <br/> Afgenomen</td></tr>
        <tr><td>HB</td><td>Gemeten</td></tr></table><br/>Na de tabel</td></tr>
        <tr><td>▼</td><td>Epic</td><td>Tweede</td></tr>
        <tr><td></td><td colspan="2"><table><tr><td>Laatste</td><td>Waarde</td></tr></table></td></tr>
        <tr><td></td><td>CGM</td><td>Derde</td></tr>
        </table><table><tr><th>Andere tabel</th></tr><tr><td>Inhoud</td></tr></table>"""
        tables = converter.extract_tables(source)
        self.assertEqual(len(tables), 2)
        self.assertEqual([cell['content'] for cell in tables[0]['headers']], ['', 'Bron', 'Code'])
        self.assertEqual(len(tables[0]['rows']), 5)
        html = converter.create_html_mockup('Verslagen', tables)[0]
        self.assertEqual(html.count('data-detail-row="true"'), 2)
        self.assertEqual(html.count('>expand_more</span>'), 2)
        self.assertIn('<b>Componenten</b><br/><table class="nested-wireframe-table">', html)
        self.assertIn('<td style="white-space: nowrap">KALIUM</td><td>A &amp; B <br/> Afgenomen</td>', html)
        self.assertIn('<tr><td>HB</td><td>Gemeten</td></tr></table><br/>Na de tabel', html)
        self.assertLess(html.index('Na de tabel'), html.index('Tweede'))
        self.assertLess(html.index('Waarde'), html.index('Derde'))
        self.assertEqual(tables[1]['headers'][0]['content'], 'Andere tabel')

    def test_empty_nested_table_does_not_create_details(self):
        source = ('<table><tr><th></th><th>Bron</th></tr>'
                  '<tr><td>▼</td><td>Epic</td></tr>'
                  '<tr><td></td><td><table><tr><td><br/></td></tr></table></td></tr></table>')
        html = converter.create_html_mockup('Verslagen', converter.extract_tables(source))[0]
        self.assertNotIn('data-detail-row="true"', html)
        self.assertNotIn('>expand_more</span>', html)


if __name__ == "__main__":
    unittest.main()
