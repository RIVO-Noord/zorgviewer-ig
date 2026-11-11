import importlib.util
import unittest
from pathlib import Path


SCRIPT = Path(__file__).resolve().parents[1] / "scripts" / "viewdefinition-to-html.py"
spec = importlib.util.spec_from_file_location("viewdefinition_to_html", SCRIPT)
converter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(converter)


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
        self.assertIn('▼', html)

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
        self.assertEqual(html.count('>▼</td>'), 1)
        self.assertNotIn('▶', html)
        self.assertEqual(html.count('<tr>\n  <td></td>'), 2)
        self.assertEqual(html.count('data-detail-row="true"'), 1)
        self.assertIn('colspan="3"', html)
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
        self.assertNotIn('>▼</td>', html)
        self.assertNotIn('▶', html)
        self.assertNotIn('data-detail-row="true"', html)
        self.assertEqual(html.count('class="bron-circle"'), 2)
        self.assertIn('Eerste', html)
        self.assertIn('Tweede', html)
        self.assertIn('<th>Bron <span', html)


if __name__ == "__main__":
    unittest.main()
