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
from pathlib import Path
from html.parser import HTMLParser


class TableExtractor(HTMLParser):
    """Extraheert tabellen uit HTML content."""
    
    def __init__(self):
        super().__init__()
        self.tables = []
        self.current_table = None
        self.current_row = None
        self.current_cell = None
        self.current_cell_data = []
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
                    
    def handle_data(self, data):
        if self.current_cell is not None:
            self.current_cell_data.append(data.strip())
            
    def handle_endtag(self, tag):
        if tag in ('th', 'td') and self.current_cell is not None:
            self.current_cell['content'] = ' '.join(self.current_cell_data)
            self.current_cell_data = []
            self.current_row.append(self.current_cell)
            self.current_cell = None
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
        content = cell['content'].strip()
        if content:
            return True
    return False


def get_detail_content(row, visible_indices):
    """Extraheer en format de content van een detail row. Return None als leeg."""
    detail_content = []
    for cell_idx, cell in enumerate(row):
        # Skip verborgen kolommen
        if cell_idx not in visible_indices:
            continue
        content = cell['content'].strip()
        if content:
            # Bold voor labels zoals "Verslag"
            if content in ['Verslag', 'Regels', 'Details'] or ':' in content and content.isupper():
                detail_content.append(f'<b>{content}</b>')
            else:
                detail_content.append(content)
    
    if not detail_content:
        return None
    return '<br/>'.join(detail_content)


def create_html_mockup(title, tables, icon='📄'):
    """Genereert HTML mockup van ViewDefinition tabel."""
    
    if not tables or len(tables) == 0:
        return "<p>Geen gegevens gevonden</p>"
    
    table = tables[0]  # Eerste tabel gebruiken
    headers = table.get('headers', [])
    rows = table.get('rows', [])
    
    # Filter verborgen kolommen (tussen haakjes)
    visible_indices = get_visible_column_indices(headers)
    visible_headers = [headers[i] for i in visible_indices]
    
    # HTML tabel genereren
    html_table = '<table>\n<thead>\n<tr>\n'
    
    for idx, header_cell in enumerate(visible_headers):
        header_text = header_cell["content"]
        # Skip sort/filter icons voor de eerste kolom (expand/collapse icon)
        if idx == 0:
            html_table += f'  <th>{header_text}</th>\n'
        else:
            # Add sort and filter icons to each header (except first column)
            # Using proper funnel icon (inverted triangle) for filter
            header_html = f'{header_text} <span style="margin-left: 4px; color: #999; font-size: 12px;">↑↓ ⧩</span>'
            html_table += f'  <th>{header_html}</th>\n'
    
    html_table += '</tr>\n</thead>\n<tbody>\n'
    
    # Rows verwerken - groepeer hoofd- en detailrijen
    num_header_cols = len(headers)
    i = 0
    while i < len(rows):
        row = rows[i]
        
        # Check of dit een hoofdrij is
        if is_main_row(row, num_header_cols):
            # Check of volgende rij een detail row is met content
            has_detail = False
            detail_html = None
            if i + 1 < len(rows) and is_detail_row(rows[i + 1], num_header_cols):
                next_row = rows[i + 1]
                if has_content(next_row, visible_indices):
                    has_detail = True
                    detail_html = get_detail_content(next_row, visible_indices)
            
            # Render hoofdrij
            html_table += '<tr>\n'
            for j, header_idx in enumerate(visible_indices):
                if header_idx < len(row):
                    cell = row[header_idx]
                    content = cell['content'].strip()
                    
                    # Speciale behandeling voor eerste kolom (expandable icon)
                    if header_idx == 0:
                        # Toon ▼ als er details zijn, anders >
                        if has_detail:
                            html_table += f'  <td style="text-align: center; color: #00838F;">▼</td>\n'
                        else:
                            html_table += f'  <td style="text-align: center; color: #00838F;">&gt;</td>\n'
                    # Bron monogram voor kolom met index 1
                    elif j == 1 and content and not content.startswith('('):
                        bron_color = get_bron_color(content)
                        bron_abbrev = ''.join([c for c in content if c.isupper()])[:2]
                        if not bron_abbrev:
                            bron_abbrev = content[:2].upper()
                        html_table += f'  <td><div class="bron-circle" style="background: {bron_color};">{bron_abbrev}</div></td>\n'
                    else:
                        html_table += f'  <td>{content}</td>\n'
            html_table += '</tr>\n'
            
            # Render detail row ALLEEN als het content heeft
            if has_detail and detail_html:
                num_visible_cols = len(visible_indices)
                html_table += '<tr style="background: #F9FAFB;">\n'
                html_table += f'  <td colspan="{num_visible_cols}"><div style="padding: 12px; background: #F9FAFB; border-radius: 4px;">'
                html_table += detail_html
                html_table += '</div></td>\n'
                html_table += '</tr>\n'
                i += 2  # Skip detail row dat we net verwerkt hebben
            else:
                i += 1  # Alleen hoofd-rij, geen detail
        elif is_detail_row(row, num_header_cols):
            # Dit is een verwaasde detail row zonder hoofd-rij (skip)
            i += 1
        else:
            i += 1
    
    html_table += '</tbody>\n</table>'
    
    return html_table


def generate_full_mockup_html(title, tables, icon='📄'):
    """Genereert volledige Zorgviewer mockup HTML."""
    
    table_html = create_html_mockup(title, tables, icon)
    
    html_content = f"""<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zorgviewer - {title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">
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
            background: #ffffff;
            color: #2D3748;
        }}
        
        /* Topbar */
        .topbar {{
            display: flex;
            align-items: center;
            justify-content: space-between;
            height: 64px;
            background: #ffffff;
            border-bottom: 1px solid #E2E8F0;
            padding: 0 24px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
        }}
        
        .topbar-left {{
            display: flex;
            align-items: center;
            gap: 20px;
        }}
        
        .logo {{
            font-size: 18px;
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
            font-size: 13px;
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
            font-size: 13px;
            color: #2D3748;
        }}
        
        .layout-container {{
            display: flex;
            height: calc(100vh - 64px);
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
            font-size: 13px;
            font-weight: 700;
            color: #006B73;
            padding: 0 16px;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
        }}
        
        .sidebar-item {{
            padding: 12px 16px;
            font-size: 14px;
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
            padding: 24px;
            overflow-y: auto;
        }}
        
        /* Panel */
        .panel {{
            background: #ffffff;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            overflow: hidden;
        }}
        
        .panel-header {{
            background: #EFF6F7;
            padding: 16px 20px;
            border-bottom: 1px solid #E2E8F0;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }}
        
        .panel-header-left {{
            display: flex;
            align-items: center;
            gap: 12px;
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
        
        .panel-title {{
            font-size: 17px;
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
            padding: 20px;
        }}
        
        /* Table */
        table {{
            width: 100%;
            border-collapse: collapse;
        }}
        
        thead {{
            background: #F1F5F9;
        }}
        
        th {{
            padding: 12px 16px;
            text-align: left;
            font-size: 13px;
            font-weight: 600;
            color: #00838F;
            border-bottom: 1px solid #E2E8F0;
        }}
        
        td {{
            padding: 14px 16px;
            font-size: 14px;
            color: #2D3748;
            border-bottom: 1px solid #E2E8F0;
        }}
        
        tbody tr:last-child td {{
            border-bottom: none;
        }}
        
        tbody tr:hover {{
            background: #F9FAFB;
        }}
        
        .bron-circle {{
            width: 28px;
            height: 28px;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-weight: 700;
            font-size: 11px;
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
            font-size: 13px;
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
                ⚕️ Zorgviewer
            </div>
            <div class="pills-container">
                <div class="pill">
                    <span style="color: #00838F;">👤</span>
                    <span>H.P. Hendriks</span>
                </div>
                <div class="pill">
                    <span style="color: #00838F;">📅</span>
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
                <span style="color: #00838F;">👥</span>
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
                        <span style="font-size: 16px;">⏱️</span>
                        <span>Tijdlijn</span>
                    </div>
                </div>
                
                <div class="sidebar-section">
                    <div class="sidebar-section-title">Gegevens</div>
                    <div class="sidebar-item active">
                        <span style="font-size: 16px;">📄</span>
                        <span>{title}</span>
                    </div>
                    <div class="sidebar-item">
                        <span style="font-size: 16px;">⚠️</span>
                        <span>Problemen (incl. diagnoses)</span>
                    </div>
                    <div class="sidebar-item">
                        <span style="font-size: 16px;">✂️</span>
                        <span>Verrichtingen</span>
                    </div>
                    <div class="sidebar-item">
                        <span style="font-size: 16px;">📋</span>
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
                        <div class="panel-icon">{icon}</div>
                        <div class="panel-title">{title}</div>
                    </div>
                    <div class="panel-header-right">
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="1"></circle>
                            <path d="M12 19a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"></path>
                            <path d="M12 9v6"></path>
                        </svg>
                        <svg class="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <polyline points="23 4 23 10 17 10"></polyline>
                            <path d="M20.49 15a9 9 0 1 1-2-8.83"></path>
                        </svg>
                    </div>
                </div>
                
                <div class="panel-body">
                    {table_html}
                </div>
            </div>
        </div>
    </div>
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
        html_content = generate_full_mockup_html(title, tables)
    
    # Schrijf HTML
    output_path.parent.mkdir(parents=True, exist_ok=True)
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(html_content)
    
    print(f"HTML mockup gegenereerd: {output_path}")


if __name__ == "__main__":
    main()
