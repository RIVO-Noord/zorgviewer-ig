#!/usr/bin/env python3
"""
viewdefinition-to-html.py — Zet ViewDefinition-ui.md wireframes om in HTML mockups.

Dit script leest ViewDefinition-ui.md bestanden en genereert HTML mockups
met echte gegevens uit de wireframe tabellen.

GEBRUIK:
    python3 viewdefinition-to-html.py --input <path-to-ui.md> --output <path-to-html>
    
VOORBEELD:
    python3 viewdefinition-to-html.py \\
        --input /app/input/includes/ViewDefinition-Correspondentie-ui.md \\
        --output /tmp/mockup.html
"""

import re
import json
import argparse
import sys
from pathlib import Path
from html import escape, unescape
from html.parser import HTMLParser
from urllib.parse import parse_qs, urlsplit


FO_DIR = Path(__file__).resolve().parents[3] / "_local/Zorgviewer.wiki/Functionele-Ontwerpen-(FO's)"
FO_SCREENS = {
    'AllergyIntolerance': ('Allergieën-en-intoleranties.md', ()),
    'Appointment': ('Contacten-en-Afspraken-(pilot).md', ()),
    'Behandelaanwijzingen': ('Behandelvoorkeuren-(werktitel,-misschien-behandelgrenzen).md', ()),
    'Condition': ('Problemen-(incl.-diagnoses).md', ()),
    'ContactenAfspraken': ('Contacten-en-Afspraken-(pilot).md', ()),
    'Contactpersonen': ('Patiëntcontext.md', ('Contactpersoon',)),
    'Correspondentie': ('Correspondentie-en-verslagen.md', ()),
    'Encounter': ('Contacten-en-Afspraken-(pilot).md', ()),
    'Flag': ('Alerts-of-waarschuwingen.md', ()),
    'GeplandeZorgactiviteiten': ('Zorgactiviteiten.md', ()),
    'Immunization': ('Vaccinaties.md', ()),
    'Intoxicaties': ('Intoxicaties.md', ('Wine bar', 'Smoking Rooms')),
    'LaboratoryTestResult': ('Laboratoriumuitslagen.md', ()),
    'LivingSituation': ('Patiëntcontext.md', ('Woonsituatie',)),
    'Medicatiegegevens': ('Medicatiegegevens.md', ()),
    'MedicationRequest': ('Medicatiegegevens.md', ()),
    'MedicationStatement': ('Medicatiegegevens.md', ()),
    'MedischHulpmiddel': ('Medische-hulpmiddelen.md', ()),
    'Mobiliteit': ('Gezondheidstoestand.md', ('mobiliteit',)),
    'NutritionAdvice': ('Gezondheidstoestand.md', ('voeding en vocht',)),
    'Probleemlijst': ('Problemen-(incl.-diagnoses).md', ()),
    'Procedure': ('Verrichtingen.md', ()),
    'Toedieningsafspraak': ('Medicatiegegevens.md', ()),
    'VitalSign': ('Vitale-gegevens.md', ()),
    'Wilsbeschikkingen': ('Behandelvoorkeuren-(werktitel,-misschien-behandelgrenzen).md', ()),
}


def get_screen_icons(input_path, fo_dir=FO_DIR):
    """Lees de titeliconen uit de icoonregel van het bijbehorende FO."""
    screen = input_path.stem.removeprefix('ViewDefinition-').removesuffix('-ui')
    mapping = FO_SCREENS.get(screen)
    if mapping is None:
        print(f"Waarschuwing: geen FO-icoon gekoppeld aan {input_path.name}; standaardicoon gebruikt.", file=sys.stderr)
        return ()
    filename, labels = mapping
    fo_path = fo_dir / filename
    if not fo_path.is_file():
        print(f"Waarschuwing: FO niet gevonden: {fo_path}; standaardicoon gebruikt.", file=sys.stderr)
        return ()
    text = fo_path.read_text(encoding='utf-8')
    section = re.search(r'^#\s+Schermontwerp\s*$', text, re.MULTILINE | re.IGNORECASE)
    if section is None:
        print(f"Waarschuwing: geen Schermontwerp gevonden in {fo_path}; standaardicoon gebruikt.", file=sys.stderr)
        return ()
    section_text = re.split(r'^#\s+', text[section.end():], maxsplit=1, flags=re.MULTILINE)[0]
    icon_row = re.search(r'^\|\s*Ico(?:on|nen)\s*\|([^\n]*)', section_text, re.MULTILINE | re.IGNORECASE)
    if icon_row is None:
        print(f"Waarschuwing: geen icoonregel gevonden in {fo_path}; standaardicoon gebruikt.", file=sys.stderr)
        return ()
    links = re.findall(r'\[([^\]]+)\]\((https?://[^)\s]+)\)', icon_row.group(1))
    icons = {}
    for label, url in links:
        parsed = urlsplit(url)
        if parsed.netloc not in ('fonts.google.com', 'fonts.googleapis.com'):
            continue
        query = parse_qs(parsed.query)
        selected = query.get('selected', [''])[0]
        match = re.fullmatch(r'Material Symbols Outlined:([a-z0-9_]+):.*', selected)
        name = match.group(1) if match else query.get('icon_names', [''])[0]
        if re.fullmatch(r'[a-z0-9_]+', name):
            icons[label.strip().casefold()] = name
    if labels:
        names = [icons.get(label.casefold()) for label in labels]
    else:
        names = list(icons.values())[:1]
    if not names or any(name is None for name in names):
        print(f"Waarschuwing: FO-icoon niet gevonden in {fo_path}; standaardicoon gebruikt.", file=sys.stderr)
        return ()
    if screen == 'Intoxicaties':
        print("Waarschuwing: voor het SharePoint-maatwerkicoon van Intoxicaties worden de twee FO-symbolen als benadering gebruikt.", file=sys.stderr)
    return tuple(names)


class TableExtractor(HTMLParser):
    """Extraheert tabellen uit HTML content."""
    
    def __init__(self):
        super().__init__()
        self.tables = []
        self.current_table = None
        self.current_row = None
        self.current_cell = None
        self.current_cell_html = []  # Changed: collect HTML, not just text
        self.cell_is_header = False
        
    def handle_starttag(self, tag, attrs):
        if tag == 'table':
            self.current_table = {'headers': [], 'rows': []}
        elif tag == 'tr' and self.current_table is not None:
            self.current_row = []
        elif tag in ('th', 'td') and self.current_row is not None:
            self.cell_is_header = tag == 'th'
            self.current_cell = {'content': '', 'colspan': 1}
            for attr, value in attrs:
                if attr == 'colspan':
                    self.current_cell['colspan'] = int(value)
        elif self.current_cell is not None:
            # Preserve HTML tags inside cells (like <b>, <br/>)
            if tag == 'b':
                self.current_cell_html.append('<b>')
            elif tag == 'br':
                self.current_cell_html.append('<br/>')
                    
    def handle_data(self, data):
        if self.current_cell is not None:
            stripped = data.strip()
            if stripped:
                self.current_cell_html.append(stripped)
            
    def handle_endtag(self, tag):
        if tag in ('th', 'td') and self.current_cell is not None:
            self.current_cell['content'] = ''.join(self.current_cell_html)
            self.current_cell_html = []
            self.current_row.append(self.current_cell)
            self.current_cell = None
        elif tag == 'b' and self.current_cell is not None:
            self.current_cell_html.append('</b>')
        elif tag == 'tr' and self.current_row is not None:
            if len(self.current_row) > 0:
                if self.cell_is_header or not self.current_table['headers']:
                    # Dit is een header rij
                    self.current_table['headers'] = self.current_row
                else:
                    self.current_table['rows'].append(self.current_row)
            self.current_row = None
        elif tag == 'table' and self.current_table is not None:
            self.tables.append(self.current_table)
            self.current_table = None


def extract_title(content):
    """Extraheert de titel uit de wireframe."""
    match = re.search(r'<b>([^<]+)</b>', content)
    if match:
        return match.group(1)
    return "Gegevens"


def extract_tables(content):
    """Extraheert alle tabellen uit de MD content."""
    parser = TableExtractor()
    try:
        parser.feed(content)
    except Exception:
        pass
    return parser.tables


def get_bron_color(bron_naam):
    """Geeft de juiste kleur voor een bron."""
    colors = {
        'EPS': '#4A5568',
        'Nictiz': '#0E7490',
        'Epic': '#C2410C',
        'Chipsoft': '#1565C0',
        'Nexus': '#6D28D9',
        'CGM': '#1565C0',
        'LSP': '#0F766E',
        'NedapONS': '#1565C0',
    }
    for key, color in colors.items():
        if key.lower() in bron_naam.lower():
            return color
    return '#4A5568'  # default


def is_hidden_column(header_text):
    """Controleer of kolom verborgen is (naam tussen haakjes)."""
    return header_text.strip().startswith('(') and header_text.strip().endswith(')')


def get_visible_column_indices(headers):
    """Geeft indices van zichtbare kolommen (niet tussen haakjes)."""
    visible_indices = []
    for i, header_cell in enumerate(headers):
        header_text = header_cell['content'].strip()
        if not is_hidden_column(header_text):
            visible_indices.append(i)
    return visible_indices


def is_detail_row(row, num_header_cols):
    """Controleer of deze rij een detail/verslag rij is (minder cellen dan headers)."""
    if len(row) == 0:
        return False
    # Detail rijen hebben MINDER cellen dan de header (vanwege colspan)
    if len(row) < num_header_cols:
        return True
    # Of ze hebben lege eerste kolom
    first_cell = row[0]['content'].strip()
    return first_cell == ''


def is_main_row(row, num_header_cols):
    """Controleer of deze rij een hoofdregel is (volledige aantal cellen)."""
    if len(row) == 0:
        return False
    # Main rijen hebben meestal hetzelfde aantal cellen als headers (of meer met colspan)
    if len(row) >= num_header_cols:
        return True
    # Of ze hebben expand-icon
    first_cell = row[0]['content'].strip()
    return first_cell in ['▼', '▲']


def has_content(row, visible_indices):
    """Controleer of een detail row daadwerkelijk content heeft (niet leeg)."""
    for cell_idx, cell in enumerate(row):
        # Skip verborgen kolommen
        if cell_idx not in visible_indices:
            continue
        content = unescape(re.sub(r'<[^>]+>', '', cell['content'])).strip()
        if content:
            return True
    return False


def is_group_row(row):
    """Herken een rij met een groepskop die over de tabelkolommen loopt."""
    return len(row) == 1 and row[0]['colspan'] > 1


def following_detail_row(rows, index, num_header_cols):
    """Geef alleen een echte detailrij terug, niet een volgende volledige hoofdrij."""
    if index + 1 >= len(rows):
        return None
    row = rows[index + 1]
    if not is_group_row(row) and is_detail_row(row, num_header_cols) and not is_main_row(row, num_header_cols):
        return row
    return None


def get_detail_content(row, visible_indices):
    """Extraheer en format de content van een detail row. Behoud HTML opmaak."""
    detail_content = []
    for cell_idx, cell in enumerate(row):
        # Skip verborgen kolommen
        if cell_idx not in visible_indices:
            continue
        content = cell['content'].strip()
        if content:
            # Content bevat al <b> en <br/> tags uit de wireframe
            # Voeg gewoon toe aan detail_content
            detail_content.append(content)
    
    if not detail_content:
        return None
    return '<br/>'.join(detail_content)


def get_correspondence_detail_title(headers, row):
    """Stel de titel samen uit de bron, datum en beschrijving van de rij."""
    header_indices = {
        header['content'].strip().casefold(): i for i, header in enumerate(headers)
    }
    parts = []
    for name in ('bron', 'datum', 'beschrijving'):
        index = header_indices.get(name)
        if index is not None and index < len(row):
            content = re.sub(r'</?b\s*>|<br\s*/?>', ' ', row[index]['content'], flags=re.I)
            content = ' '.join(content.split())
            if content:
                parts.append(content)
    return ' · '.join(parts) or 'Details'


def create_html_mockup(title, tables, icon='description', side_details=False):
    """Genereert HTML mockup van ViewDefinition tabel."""
    
    if not tables or len(tables) == 0:
        return "<p>Geen gegevens gevonden</p>", None, None
    
    table = tables[0]  # Eerste tabel gebruiken
    headers = table.get('headers', [])
    rows = table.get('rows', [])
    
    # Filter verborgen kolommen (tussen haakjes)
    visible_indices = get_visible_column_indices(headers)
    num_header_cols = len(headers)
    has_any_details = any(
        has_content(detail, visible_indices)
        for i, row in enumerate(rows)
        if is_main_row(row, num_header_cols)
        for detail in [following_detail_row(rows, i, num_header_cols)]
        if detail is not None
    )
    show_icon_column = not side_details and has_any_details
    displayed_indices = [i for i in visible_indices if i != 0 or show_icon_column]
    
    # HTML tabel genereren
    html_table = '<table>\n<thead>\n<tr>\n'
    
    for header_idx in displayed_indices:
        header_text = headers[header_idx]["content"]
        # Skip sort/filter icons voor de eerste kolom (expand/collapse icon)
        if header_idx == 0:
            html_table += f'  <th>{header_text}</th>\n'
        else:
            header_html = (
                f'{header_text} <span class="header-icons" aria-hidden="true">'
                '<span class="material-icons-outlined">arrow_upward</span>'
                '<span class="material-icons-outlined">arrow_downward</span>'
                '<span class="material-icons-outlined filter-icon">filter_alt</span>'
                '</span>'
            )
            html_table += f'  <th>{header_html}</th>\n'
    
    html_table += '</tr>\n</thead>\n<tbody>\n'
    
    # Rows verwerken - groepeer hoofd- en detailrijen
    i = 0
    first_detail = None
    first_detail_title = None
    first_row = True
    while i < len(rows):
        row = rows[i]
        if is_group_row(row):
            html_table += f'<tr class="group-row"><td colspan="{len(displayed_indices)}">{row[0]["content"]}</td></tr>\n'
            i += 1
            continue

        # Check of dit een hoofdrij is
        if is_main_row(row, num_header_cols):
            # Check of volgende rij een detail row is met content
            next_row = following_detail_row(rows, i, num_header_cols)
            has_detail = next_row is not None and has_content(next_row, visible_indices)
            detail_html = get_detail_content(next_row, visible_indices) if has_detail else None
            
            # Render hoofdrij
            if side_details:
                selected = 'true' if first_row else 'false'
                detail_title = get_correspondence_detail_title(headers, row)
                html_table += (
                    f'<tr class="selectable-row" tabindex="0" aria-selected="{selected}"'
                    f' data-detail-title="{escape(detail_title, quote=True)}">\n'
                )
                if first_row:
                    first_detail = detail_html
                    first_detail_title = detail_title
                first_row = False
            else:
                html_table += '<tr>\n'
            for j, header_idx in enumerate(visible_indices):
                if header_idx == 0 and not show_icon_column:
                    continue
                if header_idx < len(row):
                    cell = row[header_idx]
                    content = cell['content'].strip()
                    detail_template = (
                        f'<template>{detail_html or ""}</template>'
                        if side_details and header_idx == displayed_indices[0] else ''
                    )
                    
                    # Speciale behandeling voor eerste kolom (expandable icon)
                    if header_idx == 0:
                        if has_detail:
                            html_table += '  <td class="detail-icon"><span class="material-icons-outlined" aria-hidden="true">expand_more</span></td>\n'
                        else:
                            html_table += '  <td></td>\n'
                    # Bron monogram voor kolom met index 1
                    elif j == 1 and content and not content.startswith('('):
                        bron_color = get_bron_color(content)
                        bron_abbrev = ''.join([c for c in content if c.isupper()])[:2]
                        if not bron_abbrev:
                            bron_abbrev = content[:2].upper()
                        html_table += f'  <td>{detail_template}<div class="bron-circle" style="background: {bron_color};">{bron_abbrev}</div></td>\n'
                    else:
                        html_table += f'  <td>{detail_template}{content}</td>\n'
            html_table += '</tr>\n'
            
            # Render detail row ALLEEN als het content heeft
            if not side_details and has_detail and detail_html:
                num_visible_cols = len(displayed_indices)
                html_table += '<tr data-detail-row="true">\n'
                if show_icon_column and num_visible_cols > 1:
                    html_table += '  <td></td>\n'
                    num_visible_cols -= 1
                html_table += f'  <td colspan="{num_visible_cols}"><div style="padding: 16px 0; background: #F5F8FA;">'
                html_table += detail_html
                html_table += '</div></td>\n'
                html_table += '</tr>\n'
            i += 2 if next_row is not None else 1
        elif is_detail_row(row, num_header_cols):
            # Dit is een verwaasde detail row zonder hoofd-rij (skip)
            i += 1
        else:
            i += 1
    
    html_table += '</tbody>\n</table>'
    
    return html_table, first_detail, first_detail_title


def generate_full_mockup_html(title, tables, icon='description', side_details=False, title_icons=()):
    """Genereert volledige Zorgviewer mockup HTML."""
    
    table_html, first_detail, first_detail_title = create_html_mockup(title, tables, icon, side_details)
    if title_icons:
        names = ','.join(sorted(set(title_icons)))
        symbols_css = (
            '<link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined'
            f':opsz,wght,FILL,GRAD@24,400,0,0&amp;icon_names={escape(names)}" rel="stylesheet">'
        )
        title_icon_html = ''.join(
            f'<span class="material-symbols-outlined" aria-hidden="true">{escape(name)}</span>'
            for name in title_icons
        )
    else:
        symbols_css = ''
        title_icon_html = f'<span class="material-icons-outlined" aria-hidden="true">{escape(icon)}</span>'
    if side_details:
        detail_content = first_detail or 'Geen details beschikbaar voor deze regel.'
        panel_content = f"""
                <div class="correspondence-layout">
                    <div class="panel-body">{table_html}</div>
                    <aside class="correspondence-details" aria-labelledby="detail-title">
                        <h2 id="detail-title">{escape(first_detail_title or 'Details')}</h2>
                        <div id="detail-content" aria-live="polite">{detail_content}</div>
                    </aside>
                </div>"""
        selection_script = """
    <script>
        const detailContent = document.getElementById('detail-content');
        const detailTitle = document.getElementById('detail-title');
        const rows = document.querySelectorAll('.selectable-row');
        function selectRow(row) {
            rows.forEach(item => item.setAttribute('aria-selected', String(item === row)));
            detailTitle.textContent = row.dataset.detailTitle;
            const template = row.querySelector('template');
            detailContent.replaceChildren();
            if (template && template.content.textContent.trim()) {
                detailContent.append(template.content.cloneNode(true));
            } else {
                detailContent.textContent = 'Geen details beschikbaar voor deze regel.';
            }
        }
        rows.forEach(row => {
            row.addEventListener('click', () => selectRow(row));
            row.addEventListener('keydown', event => {
                if (event.key === 'Enter' || event.key === ' ') {
                    event.preventDefault();
                    selectRow(row);
                }
            });
        });
    </script>"""
    else:
        panel_content = f'<div class="panel-body">{table_html}</div>'
        selection_script = ''
    
    html_content = f"""<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zorgviewer - {title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons+Outlined" rel="stylesheet">
    {symbols_css}
    <style>
        *, *::before, *::after {{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }}
        
        html {{
            direction: ltr;
        }}
        
        body {{
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
            font-size: 90%;
            background: #ffffff;
            color: #2D3748;
        }}

        .material-icons-outlined {{
            font-weight: normal;
            font-style: normal;
            font-size: 20px;
            line-height: 1;
            display: inline-block;
            white-space: nowrap;
            direction: ltr;
            -webkit-font-feature-settings: 'liga';
            -webkit-font-smoothing: antialiased;
        }}

        .header-icons {{
            display: inline-flex;
            align-items: center;
            vertical-align: middle;
            margin-left: 4px;
            color: #999;
        }}

        .header-icons .material-icons-outlined {{ font-size: 14px; }}
        .header-icons .filter-icon {{ margin-left: 4px; font-size: 16px; }}
        .detail-icon {{ text-align: center; color: #00838F; }}
        
        /* Topbar */
        .topbar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 56px;
            background: #ffffff;
            border-bottom: 1px solid #E2E8F0;
            padding: 0 16px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }}
        
        .topbar-left {{
            display: flex;
            align-items: center;
            gap: 20px;
        }}
        
        .logo {{
            font-size: 16.2px;
            font-weight: 700;
            color: #00838F;
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        
        .pills-container {{
            display: flex;
            gap: 12px;
            align-items: center;
        }}
        
        .pill {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            background: #ffffff;
            border: 1px solid #D6E5E7;
            border-radius: 8px;
            font-size: 11.7px;
            color: #2D3748;
        }}
        
        .pill-icon {{
            width: 16px;
            height: 16px;
            color: #00838F;
        }}
        
        .pill-label {{
            font-weight: 600;
            color: #00838F;
        }}
        
        .topbar-right {{
            display: flex;
            align-items: center;
            gap: 20px;
        }}
        
        .user-pill {{
            display: inline-flex;
            align-items: center;
            gap: 8px;
            padding: 8px 14px;
            background: #ffffff;
            border: 1px solid #D6E5E7;
            border-radius: 8px;
            font-size: 11.7px;
            color: #2D3748;
        }}
        
        .layout-container {{
            display: flex;
            height: calc(100vh - 56px);
        }}
        
        /* Sidebar */
        .sidebar {{
            width: 260px;
            background: #ffffff;
            border-right: 1px solid #E2E8F0;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
        }}
        
        .sidebar-nav {{
            flex: 1;
            overflow-y: auto;
            padding: 20px 0;
        }}
        
        .sidebar-section {{
            margin-bottom: 24px;
        }}
        
        .sidebar-section-title {{
            font-size: 11.7px;
            font-weight: 700;
            color: #006B73;
            padding: 0 16px;
            margin-bottom: 6px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        .sidebar-item {{
            padding: 12px 16px;
            font-size: 12.6px;
            color: #2D3748;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 10px;
            transition: background 0.2s;
        }}
        
        .sidebar-item:hover {{
            background: #F1F5F9;
        }}
        
        .sidebar-item.active {{
            background: #ECF6F7;
            color: #00838F;
            font-weight: 600;
        }}
        
        .sidebar-icon {{
            width: 18px;
            height: 18px;
        }}
        
        /* Content area */
        .content-area {{
            flex: 1;
            background: #EFF6F7;
            padding: 16px;
            display: flex;
            flex-direction: column;
            min-width: 0;
            min-height: 0;
        }}
        
        /* Panel */
        .panel {{
            background: #ffffff;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            overflow: hidden;
            display: flex;
            flex-direction: column;
            flex: 1;
            min-height: 0;
        }}
        
        .panel-header {{
            background: #EFF6F7;
            padding: 12px 16px;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            align-items: center;
            justify-content: space-between;
            flex-shrink: 0;
        }}
        
        .panel-header-left {{
            display: flex;
            align-items: center;
            gap: 8px;
        }}
        
        .panel-icon {{
            width: 40px;
            height: 40px;
            border: 2px solid #00838F;
            border-radius: 10px;
            background: #ffffff;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #00838F;
            font-size: 20px;
        }}

        .panel-icon .material-symbols-outlined {{ font-size: 20px; }}
        .panel-icon .material-symbols-outlined:not(:only-child) {{ font-size: 16px; }}
        
        .panel-title {{
            font-size: 15.3px;
            font-weight: 600;
            color: #2D3748;
        }}
        
        .panel-header-right {{
            display: flex;
            gap: 12px;
            align-items: center;
        }}
        
        .btn-icon {{
            width: 20px;
            height: 20px;
            color: #00838F;
            cursor: pointer;
            flex-shrink: 0;
        }}
        
        .panel-body {{
            padding: 0;
            flex: 1;
            min-width: 0;
            min-height: 0;
            overflow-y: auto;
            overflow-x: auto;
        }}

        .correspondence-layout {{
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(200px, 30%);
            grid-template-rows: minmax(0, 1fr);
            flex: 1;
            min-height: 0;
        }}

        .correspondence-details {{
            padding: 20px;
            border-left: 1px solid #E2E8F0;
            min-height: 0;
            overflow-y: auto;
            overflow-wrap: anywhere;
        }}

        .correspondence-details h2 {{
            margin-bottom: 12px;
            font-size: 13.5px;
            color: #00838F;
        }}

        .correspondence-details #detail-content {{
            font-size: 12.6px;
            line-height: 1.5;
        }}

        .selectable-row {{ cursor: pointer; }}
        .selectable-row[aria-selected="true"],
        .selectable-row[aria-selected="true"]:hover {{ background: #ECF6F7; }}
        .selectable-row:focus-visible {{ outline: 2px solid #00838F; outline-offset: -2px; }}
        
        /* Table */
        table {{
            width: 100%;
            border-collapse: collapse;
        }}
        
        thead {{
            background: #EFF6F7;
            border-top: 1px solid #D6E5E7;
            border-bottom: 2px solid #D6E5E7;
            position: sticky;
            top: 0;
            z-index: 10;
        }}
        
        th {{
            padding: 14px 16px;
            text-align: left;
            font-size: 11.7px;
            font-weight: 600;
            color: #00838F;
            white-space: nowrap;
        }}
        
        td {{
            padding: 14px 16px;
            font-size: 12.6px;
            color: #2D3748;
            border-bottom: 1px solid #E8ECF0;
        }}
        
        tbody tr {{
            background: #ffffff;
            transition: background 0.1s;
        }}
        
        tbody tr:hover {{
            background: #F9FAFB;
        }}

        tbody tr.group-row,
        tbody tr.group-row:hover {{
            background: #EFF6F7;
        }}
        
        tbody tr[data-detail-row="true"] {{
            background: #F5F8FA;
        }}
        
        tbody tr:last-child td {{
            border-bottom: none;
        }}
        
        .bron-circle {{
            width: 32px;
            height: 32px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 10.8px;
            flex-shrink: 0;
        }}
        
        /* Filter section */
        .filter-bar {{
            display: flex;
            gap: 12px;
            margin-bottom: 20px;
            align-items: center;
        }}
        
        .filter-button {{
            display: flex;
            align-items: center;
            gap: 6px;
            padding: 8px 12px;
            background: #ffffff;
            border: 1px solid #D6E5E7;
            border-radius: 6px;
            font-size: 11.7px;
            color: #2D3748;
            cursor: pointer;
            transition: all 0.2s;
        }}
        
        .filter-button:hover {{
            border-color: #00838F;
            color: #00838F;
        }}
    </style>
</head>
<body>
    <!-- Topbar -->
    <div class="topbar">
        <div class="topbar-left">
            <div class="logo">
                <span class="material-icons-outlined" aria-hidden="true">medical_services</span> Zorgviewer
            </div>
            <div class="pills-container">
                <div class="pill">
                    <span class="material-icons-outlined pill-icon" aria-hidden="true">person_outline</span>
                    <span>H.P. Hendriks</span>
                </div>
                <div class="pill">
                    <span class="material-icons-outlined pill-icon" aria-hidden="true">calendar_today</span>
                    <span>1-1-1950 (75 jaar)</span>
                </div>
                <div class="pill">
                    <span class="pill-label">BSN</span>
                    <span>390891022</span>
                </div>
            </div>
        </div>
        <div class="topbar-right">
            <div class="user-pill">
                <span class="material-icons-outlined pill-icon" aria-hidden="true">badge</span>
                <span>T.R. Visser</span>
            </div>
        </div>
    </div>
    
    <!-- Layout -->
    <div class="layout-container">
        <!-- Sidebar -->
        <div class="sidebar">
            <div class="sidebar-nav">
                <div class="sidebar-section">
                    <div class="sidebar-section-title">Overzicht</div>
                    <div class="sidebar-item">
                        <span class="material-icons-outlined sidebar-icon" aria-hidden="true">timeline</span>
                        <span>Tijdlijn</span>
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-section-title">Gegevens</div>
                    <div class="sidebar-item active">
                        <span class="material-icons-outlined sidebar-icon" aria-hidden="true">{escape(icon)}</span>
                        <span>{title}</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="material-icons-outlined sidebar-icon" aria-hidden="true">assignment</span>
                        <span>Problemen (incl. diagnoses)</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="material-icons-outlined sidebar-icon" aria-hidden="true">healing</span>
                        <span>Verrichtingen</span>
                    </div>
                    <div class="sidebar-item">
                        <span class="material-icons-outlined sidebar-icon" aria-hidden="true">fact_check</span>
                        <span>Behandelaanwijzingen</span>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- Content area -->
        <div class="content-area">
            <!-- Panel -->
            <div class="panel" style="max-width: 1280px;">
                <div class="panel-header">
                    <div class="panel-header-left">
                        <div class="panel-icon">{title_icon_html}</div>
                        <div class="panel-title">{title}</div>
                    </div>
                    <div class="panel-header-right">
                        <span class="material-icons-outlined btn-icon" aria-hidden="true">refresh</span>
                    </div>
                </div>
                
                {panel_content}
            </div>
        </div>
    </div>
{selection_script}
</body>
</html>"""
    
    return html_content


def main():
    parser = argparse.ArgumentParser(
        description="Zet ViewDefinition-ui.md wireframes om naar HTML mockups"
    )
    parser.add_argument("--input", required=True, help="Path naar ViewDefinition-*.ui.md bestand")
    parser.add_argument("--output", required=True, help="Output pad voor HTML bestand")
    args = parser.parse_args()
    
    input_path = Path(args.input)
    output_path = Path(args.output)
    
    if not input_path.exists():
        raise FileNotFoundError(f"Bestand niet gevonden: {input_path}")
    
    # Lees de MD content
    with open(input_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract titel
    title = extract_title(content)
    
    # Extract tabellen
    tables = extract_tables(content)
    
    if not tables:
        print(f"Waarschuwing: Geen tabellen gevonden in {input_path}")
        html_content = f"<p>Geen gegevens gevonden in {input_path}</p>"
    else:
        # Genereer HTML mockup
        side_details = input_path.name == 'ViewDefinition-Correspondentie-ui.md'
        title_icons = get_screen_icons(input_path)
        html_content = generate_full_mockup_html(title, tables, side_details=side_details, title_icons=title_icons)
    
    # Schrijf HTML
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"HTML mockup gegenereerd: {output_path}")


if __name__ == "__main__":
    main()
