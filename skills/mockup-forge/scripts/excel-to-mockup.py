#!/usr/bin/env python3
"""
excel-to-mockup.py — Zet een Excel-tabel om in een Zorgviewer-stijl HTML mockup.

Onderdeel van de MockupForge skill (Mode D).

GEBRUIK:
    python3 excel-to-mockup.py --input table.xlsx --output mockup.html [--render-png]
    python3 excel-to-mockup.py --input table.xlsx --output mockup.html --title "Medicatie"

VERWACHTE XLSX-STRUCTUUR:
    - Sheet-naam = paneeltitel (override met --title)
    - Eerste rij met 3+ gevulde cellen = kolomheaders
    - Daarna data-rijen (kunnen multi-block zijn — duplicate headers worden geskipped)
    - SUB-RIJEN: rijen waarbij alleen de eerste data-cel gevuld is.
      * Formaat "Label: Value" wordt automatisch gesplitst in label en value
      * Anders wordt de hele cel als label gebruikt (zonder value)

BRON-KOLOM:
    Kolom "Bron" → monogram-cirkels per bronsysteem (EPS, Nictiz, Epic, Chipsoft, Nexus, CGM).
    Sub-rij met "Bron: X" → wordt ook gerenderd als monogram-cirkel.

LEGE CELLEN:
    Lege cellen blijven écht leeg — geen em-dash of placeholder.

DEPENDENCIES:
    pip install openpyxl
    pip install weasyprint    # alleen nodig met --render-png
"""

from __future__ import annotations

import argparse
import html
import sys
import subprocess
from pathlib import Path

try:
    import openpyxl
except ImportError:
    sys.exit("ERROR: openpyxl niet geïnstalleerd. Run: pip install openpyxl")


# ============================================================================
# DESIGN SYSTEM CONSTANTS
# ============================================================================

BRON_COLORS = {
    "eps":      ("eps",      "#4A5568", "EPS"),
    "nictiz":   ("nictiz",   "#0E7490", "N"),
    "epic":     ("epic",     "#C2410C", "E"),
    "chipsoft": ("chipsoft", "#1565C0", "CS"),
    "nexus":    ("nexus",    "#6D28D9", "N"),
    "cgm":      ("cgm",      "#1565C0", "CGM"),
    "lsp":      ("lsp",      "#0F766E", "LSP"),
}
DEFAULT_BRON_COLOR = "#4A5568"

SIDEBAR_OVERZICHT = [
    ("Tijdlijn", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="14 7 21 7 21 14"/></svg>', False),
]
SIDEBAR_GEGEVENS = [
    ("Correspondentie en SOEP-verslagen", '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>', False),
    ("Problemen (incl. diagnoses)",       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M12 18l-2.6-2.6a1.6 1.6 0 0 1 2.6-1.9 1.6 1.6 0 0 1 2.6 1.9L12 18z"/></svg>', False),
    ("Verrichtingen",                     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/></svg>', False),
    ("Behandelaanwijzingen",              '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 21v-9"/><path d="M22 21v-6a3 3 0 0 0-3-3h-8v-3a1 1 0 0 0-1-1H2"/><line x1="2" y1="17" x2="22" y2="17"/><circle cx="6" cy="9.5" r="1.6"/></svg>', False),
    ("Wilsverklaringen",                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 11l3 3 8-8"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>', False),
    ("Laboratoriumuitslagen",             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2v6.5L4 17a4 4 0 0 0 3.5 6h9A4 4 0 0 0 20 17l-6-8.5V2"/><line x1="9" y1="2" x2="15" y2="2"/></svg>', False),
    ("Alerts / Waarschuwingen",           '<svg viewBox="0 0 24 24" fill="none" stroke="#E69500" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 22 20 2 20"/><line x1="12" y1="10" x2="12" y2="14"/><circle cx="12" cy="17" r="0.8" fill="#E69500"/></svg>', False),
    ("Allergieën en intoleranties",       '<svg viewBox="0 0 24 24" fill="none" stroke="#E53E3E" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21l8.84-8.61a5.5 5.5 0 0 0 0-7.78z"/><line x1="4" y1="4" x2="20" y2="20"/></svg>', False),
    ("Medicatie",                         '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg>', False),
    ("Medische hulpmiddelen",             '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6"/><rect x="3" y="6" width="18" height="14" rx="2"/><line x1="12" y1="10" x2="12" y2="17"/><line x1="8.5" y1="13.5" x2="15.5" y2="13.5"/></svg>', False),
    ("Vaccinaties",                       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2l4 4"/><path d="M16 4l4 4"/><path d="M20 6L8 18l-3 3-3-3 3-3L17 3"/><path d="M9 11l4 4"/></svg>', True),
    ("Vitale gegevens",                   '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 12 7 12 10 5 14 19 17 12 21 12"/></svg>', True),
    ("Patiëntcontext",                    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="9" cy="7" r="3"/><circle cx="17" cy="9" r="2.2"/><path d="M2 21v-1a5 5 0 0 1 5-5h4a5 5 0 0 1 5 5v1"/><path d="M15 21v-.5a3.5 3.5 0 0 1 3.5-3.5H20a2 2 0 0 1 2 2v2"/></svg>', False),
    ("Voeding en vocht",                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2v8a2 2 0 0 1-4 0V2"/><line x1="5" y1="10" x2="5" y2="22"/><path d="M21 14V5a3 3 0 0 0-6 0v9z"/><line x1="18" y1="14" x2="18" y2="22"/></svg>', False),
]

PANEL_ICONS = {
    "medische hulpmiddelen": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 6V4.5A1.5 1.5 0 0 1 10.5 3h3A1.5 1.5 0 0 1 15 4.5V6"/><rect x="3" y="6" width="18" height="14" rx="2"/><line x1="12" y1="10" x2="12" y2="17"/><line x1="8.5" y1="13.5" x2="15.5" y2="13.5"/></svg>',
    "problemen (incl. diagnoses)": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="4" width="14" height="18" rx="2"/><rect x="9" y="2" width="6" height="4" rx="1"/><path d="M12 18l-2.6-2.6a1.6 1.6 0 0 1 2.6-1.9 1.6 1.6 0 0 1 2.6 1.9L12 18z"/></svg>',
    "medicatie": '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="9" width="18" height="6" rx="3"/><line x1="12" y1="9" x2="12" y2="15"/></svg>',
}
DEFAULT_PANEL_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/></svg>'

# Bekende titel-keywords om sheet-naam te verbeteren
TITLE_FROM_HEADERS = {
    ("medicatie",): "Medicatie",
    ("hulpmiddel",): "Medische hulpmiddelen",
    ("diagnose",): "Problemen (incl. diagnoses)",
    ("verrichting",): "Verrichtingen",
}


# ============================================================================
# XLSX PARSER
# ============================================================================

def _row_to_strings(row):
    return [str(c).strip() if c is not None else "" for c in row]


def parse_xlsx(path: Path, title_override: str | None = None):
    """Lees een xlsx en geef (title, headers, rows) terug.

    rows is een lijst van dicts:
      - {'type': 'main', 'values': [str, ...]}
      - {'type': 'sub',  'label': str, 'value': str}
    """
    wb = openpyxl.load_workbook(path, data_only=True)
    sheet = wb.active

    raw_rows = [_row_to_strings(r) for r in sheet.iter_rows(values_only=True)]
    if not raw_rows:
        raise ValueError("Lege sheet.")

    # Vind header-rij (eerste rij met ≥ 3 gevulde cellen)
    header_idx = None
    for i, row in enumerate(raw_rows):
        if sum(1 for c in row if c) >= 3:
            header_idx = i
            break
    if header_idx is None:
        raise ValueError("Kon geen header-rij vinden (rij met 3+ gevulde cellen).")

    header_row = raw_rows[header_idx]
    # Bepaal kolomgrenzen op basis van header-rij
    col_start = next((i for i, c in enumerate(header_row) if c), 0)
    col_end = max((i for i, c in enumerate(header_row) if c), default=col_start)

    headers = [c for c in header_row[col_start:col_end + 1]]
    header_sig = tuple(h.lower() for h in headers)

    # Titel bepalen
    title = (title_override or "").strip()
    if not title:
        # Probeer cel A1 als die er informatief uitziet
        if header_idx > 0 and raw_rows[0]:
            a1 = raw_rows[0][0] if raw_rows[0] else ""
            if a1 and "wireframe" not in a1.lower() and len(a1) > 3:
                title = a1
    if not title:
        # Match op header-keywords
        joined = " ".join(headers).lower()
        for keywords, mapped in TITLE_FROM_HEADERS.items():
            if all(k in joined for k in keywords):
                title = mapped
                break
    if not title:
        title = sheet.title

    # Data-rijen parsen
    rows = []
    for raw in raw_rows[header_idx + 1:]:
        values = raw[col_start:col_end + 1]
        # Pad / trim
        while len(values) < len(headers):
            values.append("")
        values = values[:len(headers)]

        # Skip volledig lege rijen
        if not any(v.strip() for v in values):
            continue

        # Skip dubbele header-rijen (multi-block sheets)
        if tuple(v.lower() for v in values) == header_sig:
            continue

        non_empty_idx = [i for i, v in enumerate(values) if v.strip()]

        if non_empty_idx == [0]:
            # Sub-rij: alleen eerste cel gevuld
            cell = values[0]
            if ":" in cell:
                label, _, val = cell.partition(":")
                rows.append({"type": "sub", "label": label.strip(), "value": val.strip()})
            else:
                rows.append({"type": "sub", "label": cell, "value": ""})
        else:
            # Hoofd-rij
            rows.append({"type": "main", "values": values})

    return title, headers, rows


# ============================================================================
# HTML GENERATIE
# ============================================================================

def bron_cell_html(value: str) -> str:
    """Render een Bron-waarde als monogram-cirkel."""
    if not value.strip():
        return ""
    key = value.strip().lower()
    if key in BRON_COLORS:
        cls, _, label = BRON_COLORS[key]
        return f'<span class="src-ic src-{cls}">{html.escape(label)}</span>'
    label = value.strip()[:3].upper() if len(value.strip()) > 2 else value.strip().upper()
    return f'<span class="src-ic src-default" style="background:{DEFAULT_BRON_COLOR}">{html.escape(label)}</span>'


def render_sidebar(active_label: str) -> str:
    def render_item(label, svg, is_disabled):
        cls = "nav-item"
        if is_disabled:
            cls += " is-disabled"
        if label.lower() == active_label.lower():
            cls = "nav-item is-active"
        return f'<div class="{cls}">{svg}{html.escape(label)}</div>'

    out = ['<div class="sidebar-nav">']
    out.append('<div class="nav-section">Overzicht</div>')
    for lbl, svg, dis in SIDEBAR_OVERZICHT:
        out.append(render_item(lbl, svg, dis))
    out.append('<div class="nav-section">Gegevens</div>')
    for lbl, svg, dis in SIDEBAR_GEGEVENS:
        out.append(render_item(lbl, svg, dis))
    out.append('</div>')
    out.append('''<div class="sidebar-footer">
      <div class="nav-item">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>
        Help &amp; Info
      </div>
      <span class="collapse-btn">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="11 17 6 12 11 7"/><polyline points="18 17 13 12 18 7"/></svg>
      </span>
    </div>''')
    return "\n".join(out)


HEADER_ICONS = (
    '<span class="sort-pair">'
    '<svg class="ic" width="11" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 2V12M3 6L7 2L11 6"/></svg>'
    '<svg class="ic" width="11" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 12V2M3 8L7 12L11 8"/></svg>'
    '</span>'
    '<svg class="ic flt" width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"><path d="M1.5 2H12.5L8 7.5V11L6 12V7.5Z"/></svg>'
)

CHEVRON_RIGHT = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 6 15 12 9 18"/></svg>'
CHEVRON_DOWN  = '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>'


def render_table(headers, rows) -> str:
    bron_idx = next((i for i, h in enumerate(headers) if h.lower() == "bron"), None)

    thead = ['<thead><tr>']
    thead.append('<th class="col-toggle"><span class="hc"><svg class="ic" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg></span></th>')
    for h in headers:
        thead.append(f'<th><span class="hc">{html.escape(h)}{HEADER_ICONS}</span></th>')
    thead.append('</tr></thead>')

    # Markeer welke main-rijen direct gevolgd worden door 1+ sub-rij(en)
    has_sub = [False] * len(rows)
    for i, r in enumerate(rows):
        if r["type"] == "main":
            j = i + 1
            while j < len(rows) and rows[j]["type"] == "sub":
                has_sub[i] = True
                break

    tbody = ['<tbody>']
    for i, r in enumerate(rows):
        if r["type"] == "sub":
            label = r["label"]
            value = r["value"]
            # Eerste/laatste sub-rij in een aaneengesloten groep krijgen markers
            is_first = (i == 0) or rows[i-1]["type"] != "sub"
            is_last  = (i == len(rows) - 1) or rows[i+1]["type"] != "sub"
            cls = "sub"
            if is_first:
                cls += " sub-first"
            if is_last:
                cls += " sub-last"
            if label.lower() == "bron":
                tbody.append(
                    f'<tr class="{cls}"><td></td><td colspan="{len(headers)}">'
                    f'{bron_cell_html(value)}'
                    f'</td></tr>'
                )
            else:
                tbody.append(
                    f'<tr class="{cls}"><td></td><td colspan="{len(headers)}">'
                    f'<span class="sub-label">{html.escape(label)}</span>'
                    f'<span class="sub-value">{html.escape(value)}</span>'
                    f'</td></tr>'
                )
            continue
        chev = CHEVRON_DOWN if has_sub[i] else CHEVRON_RIGHT
        cells = [f'<td class="col-toggle">{chev}</td>']
        for j, v in enumerate(r["values"]):
            if j == bron_idx:
                cells.append(f'<td class="src">{bron_cell_html(v)}</td>')
            else:
                cells.append(f'<td>{html.escape(v)}</td>')
        tbody.append('<tr>' + "".join(cells) + '</tr>')
    tbody.append('</tbody>')

    return "<table class=\"dt\">" + "\n".join(thead) + "\n" + "\n".join(tbody) + "</table>"


def render_html(title: str, headers: list, rows: list) -> str:
    panel_icon = PANEL_ICONS.get(title.lower(), DEFAULT_PANEL_ICON)
    sidebar = render_sidebar(active_label=title)
    table = render_table(headers, rows)

    return f'''<!DOCTYPE html>
<html lang="nl">
<head>
<meta charset="UTF-8" />
<title>Zorgviewer — {html.escape(title)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*, *::before, *::after {{ margin: 0; padding: 0; box-sizing: border-box; }}
html {{ direction: ltr; }}
body {{ font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #FFFFFF; color: #2D3748; font-size: 14px; line-height: 1.4; }}

.topbar {{ display: flex; align-items: center; justify-content: space-between; padding: 12px 24px; border-bottom: 1px solid #E2E8F0; background: #FFFFFF; gap: 24px; }}
.topbar-left {{ display: flex; align-items: center; gap: 32px; flex: 1; }}
.brand {{ display: flex; align-items: center; gap: 8px; color: #00838F; font-size: 20px; font-weight: 600; white-space: nowrap; }}
.brand svg {{ width: 26px; height: 26px; }}
.patient-pills {{ display: flex; align-items: center; gap: 16px; }}
.pill {{ display: inline-flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1px solid #D6E5E7; border-radius: 8px; padding: 8px 14px; font-size: 14px; color: #2D3748; white-space: nowrap; }}
.pill svg {{ width: 16px; height: 16px; color: #00838F; flex-shrink: 0; }}
.pill .label {{ color: #00838F; font-size: 13px; font-weight: 600; }}
.user-chip {{ display: inline-flex; align-items: center; gap: 10px; background: #FFFFFF; border: 1px solid #D6E5E7; border-radius: 8px; padding: 8px 14px; color: #2D3748; white-space: nowrap; }}
.user-chip svg {{ width: 16px; height: 16px; color: #00838F; }}

.layout {{ display: grid; grid-template-columns: 260px 1fr; min-height: calc(100vh - 64px); }}

.sidebar {{ background: #FFFFFF; border-right: 1px solid #E2E8F0; padding: 12px 0 0 0; display: flex; flex-direction: column; }}
.sidebar-nav {{ flex: 1; }}
.sidebar-footer {{ border-top: 1px solid #E2E8F0; padding: 10px 0; display: flex; align-items: center; justify-content: space-between; }}
.sidebar-footer .nav-item {{ flex: 1; }}
.sidebar-footer .collapse-btn {{ color: #00838F; padding: 8px 14px; display: inline-flex; align-items: center; }}
.sidebar-footer .collapse-btn svg {{ width: 16px; height: 16px; }}
.nav-item {{ display: flex; align-items: center; gap: 12px; padding: 10px 20px; color: #2D3748; font-size: 14px; }}
.nav-item.is-disabled {{ color: #B0B7C3; }}
.nav-item.is-disabled svg {{ color: #B0B7C3; }}
.nav-item svg {{ width: 18px; height: 18px; color: #4A5568; flex-shrink: 0; }}
.nav-item.is-active {{ background: #ECF6F7; color: #2D3748; font-weight: 500; }}
.nav-item.is-active svg {{ color: #00838F; }}
.nav-section {{ padding: 16px 20px 6px; font-size: 14px; font-weight: 700; color: #006B73; }}

.content {{ background: #EFF6F7; padding: 24px; }}
.panel {{ background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 1px 3px rgba(0,0,0,0.04); overflow: hidden; }}
.panel-header {{ display: flex; align-items: center; justify-content: space-between; padding: 16px 20px; background: #EFF6F7; border-bottom: 1px solid #E2E8F0; }}
.panel-title {{ display: flex; align-items: center; gap: 14px; }}
.panel-icon {{ width: 40px; height: 40px; border-radius: 10px; border: 2px solid #00838F; display: inline-flex; align-items: center; justify-content: center; color: #00838F; background: #FFFFFF; }}
.panel-icon svg {{ width: 22px; height: 22px; }}
.panel-title h2 {{ font-size: 17px; font-weight: 600; color: #2D3748; }}
.panel-actions {{ display: inline-flex; align-items: center; gap: 14px; color: #00838F; }}
.panel-actions svg {{ width: 20px; height: 20px; }}

table.dt {{ width: 100%; border-collapse: collapse; font-size: 14px; }}
table.dt thead th {{ background: #F1F5F9; color: #00838F; font-size: 13px; font-weight: 600; text-align: left; padding: 12px 16px; border-bottom: 1px solid #E2E8F0; white-space: nowrap; }}
table.dt thead th .hc {{ display: inline-flex; align-items: center; gap: 8px; }}
table.dt thead th .sort-pair {{ display: inline-flex; align-items: center; gap: 1px; }}
table.dt thead th .ic {{ opacity: 0.55; }}
table.dt thead th .ic.flt {{ margin-left: 4px; }}
table.dt tbody td {{ padding: 14px 16px; border-bottom: 1px solid #E2E8F0; color: #2D3748; vertical-align: middle; }}

.chev {{ color: #00838F; width: 18px; height: 18px; display: inline-block; }}
.col-toggle {{ width: 36px; padding-left: 16px !important; padding-right: 0 !important; }}

.src {{ padding-left: 16px; }}
.src-ic {{ width: 28px; height: 28px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; color: #FFFFFF; }}
.src-eps {{ background: #4A5568; }}
.src-nictiz {{ background: #0E7490; }}
.src-epic {{ background: #C2410C; }}
.src-chipsoft {{ background: #1565C0; }}
.src-nexus {{ background: #6D28D9; }}
.src-cgm {{ background: #1565C0; }}
.src-lsp {{ background: #0F766E; }}

table.dt tbody tr.sub td {{ background: #FFFFFF; border-bottom: none !important; padding: 6px 16px; }}
table.dt tbody tr.sub.sub-first td {{ padding-top: 12px; }}
table.dt tbody tr.sub.sub-last td {{ border-bottom: 1px solid #E2E8F0 !important; padding-bottom: 12px; }}
.sub-label {{ font-weight: 700; color: #2D3748; font-size: 13px; margin-right: 8px; }}
.sub-value {{ color: #2D3748; font-size: 13px; }}
</style>
</head>
<body>

<header class="topbar">
  <div class="topbar-left">
    <div class="brand">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>
      Zorgviewer
    </div>
    <div class="patient-pills">
      <span class="pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> H.P. Hendriks</span>
      <span class="pill"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> 1-1-1950 (75 jaar)</span>
      <span class="pill"><span class="label">BSN</span> 390891022</span>
    </div>
  </div>
  <div class="user-chip">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="14" rx="2"/><circle cx="9" cy="11" r="2"/><path d="M14 9h4M14 13h3"/></svg>
    T.R. Visser
  </div>
</header>

<div class="layout">
  <aside class="sidebar">
{sidebar}
  </aside>
  <main class="content">
    <section class="panel">
      <div class="panel-header">
        <div class="panel-title">
          <span class="panel-icon">{panel_icon}</span>
          <h2>{html.escape(title)}</h2>
        </div>
        <div class="panel-actions">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
        </div>
      </div>
      {table}
    </section>
  </main>
</div>

</body>
</html>
'''


# ============================================================================
# OPTIONELE PNG RENDERING (weasyprint)
# ============================================================================

def render_png(html_path: Path, png_path: Path):
    try:
        import weasyprint
    except ImportError:
        print("WAARSCHUWING: weasyprint niet geïnstalleerd, sla PNG-render over.")
        return
    pdf_path = html_path.with_suffix(".pdf")
    extra_css = weasyprint.CSS(string='@page { size: 1440px 2000px; margin: 0; } html, body { width: 1440px; } .panel-title h2 { white-space: nowrap; }')
    weasyprint.HTML(filename=str(html_path)).write_pdf(str(pdf_path), stylesheets=[extra_css])
    base = png_path.parent / (png_path.stem + "_tmp")
    subprocess.run(["pdftoppm", "-png", "-r", "144", str(pdf_path), str(base)], check=True)
    generated = base.parent / (base.name + "-1.png")
    if generated.exists():
        generated.rename(png_path)
    pdf_path.unlink(missing_ok=True)
    print(f"PNG geschreven naar: {png_path}")


# ============================================================================
# CLI
# ============================================================================

def main():
    parser = argparse.ArgumentParser(description="Excel → Zorgviewer mockup HTML")
    parser.add_argument("--input", required=True, help="Pad naar xlsx-bestand")
    parser.add_argument("--output", required=True, help="Pad naar output HTML-bestand")
    parser.add_argument("--title", help="Override paneeltitel (anders automatisch)")
    parser.add_argument("--render-png", action="store_true", help="Render ook een PNG")
    args = parser.parse_args()

    input_path = Path(args.input).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()
    if not input_path.exists():
        sys.exit(f"ERROR: input bestaat niet: {input_path}")

    print(f"Lezen: {input_path}")
    title, headers, rows = parse_xlsx(input_path, title_override=args.title)
    print(f"Titel: {title}")
    print(f"Kolommen: {headers}")
    print(f"Rijen: {len(rows)} (waarvan {sum(1 for r in rows if r['type']=='sub')} sub-rijen)")

    html_out = render_html(title, headers, rows)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    output_path.write_text(html_out, encoding="utf-8")
    print(f"HTML geschreven naar: {output_path}")

    if args.render_png:
        png_path = output_path.with_suffix(".png")
        render_png(output_path, png_path)


if __name__ == "__main__":
    main()
