#!/usr/bin/env python3
"""
batch-viewdefinition-mockups.py — Batch verwerking van ViewDefinition-ui.md bestanden.

Dit script leest alle ViewDefinition-*-ui.md bestanden uit een directory
en genereert HTML mockups voor elk daarvan.

GEBRUIK:
    python3 batch-viewdefinition-mockups.py \\
        --input-dir /app/input/includes \\
        --output-dir /app/output/mockups \\
        [--render-png]

OPTIES:
    --input-dir     Directory met ViewDefinition-*-ui.md bestanden
    --output-dir    Output directory voor HTML bestanden
    --render-png    Ook PNG's genereren (vereist: node, puppeteer)
"""

import subprocess
import sys
from pathlib import Path
import argparse
import json


def find_viewdefinition_files(input_dir):
    """Zoek alle ViewDefinition-*-ui.md bestanden."""
    pattern = "ViewDefinition-*-ui.md"
    files = sorted(Path(input_dir).glob(pattern))
    return files


def generate_html_mockup(input_file, output_file, script_dir):
    """Genereer HTML mockup uit ViewDefinition-ui.md bestand."""
    script_path = script_dir / "viewdefinition-to-html.py"
    
    cmd = [
        "python3", str(script_path),
        "--input", str(input_file),
        "--output", str(output_file)
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True)
    if result.returncode != 0:
        print(f"❌ Error processing {input_file.name}:")
        print(result.stderr)
        return False
    
    print(f"✓ {input_file.name} → {output_file.name}")
    return True


def render_png_mockup(html_file, png_file, script_dir):
    """Render HTML mockup naar PNG."""
    script_path = script_dir / "generate-mockup.py"
    
    cmd = [
        "python3", str(script_path),
        "--html", str(html_file),
        "--output", str(png_file),
        "--width", "1280",
        "--scale", "2"
    ]
    
    result = subprocess.run(cmd, capture_output=True, text=True, timeout=120)
    if result.returncode != 0:
        print(f"  ⚠️  PNG render failed for {html_file.name}:")
        print(f"     {result.stderr}")
        return False
    
    print(f"  → PNG: {png_file.name}")
    return True


def main():
    parser = argparse.ArgumentParser(
        description="Batch verwerking van ViewDefinition-ui.md bestanden naar mockups"
    )
    parser.add_argument("--input-dir", required=True, help="Input directory met ViewDefinition-*-ui.md bestanden")
    parser.add_argument("--output-dir", required=True, help="Output directory voor gegenereerde mockups")
    parser.add_argument("--render-png", action="store_true", help="Ook PNG's genereren")
    args = parser.parse_args()
    
    input_dir = Path(args.input_dir)
    output_dir = Path(args.output_dir)
    script_dir = Path(__file__).parent
    
    if not input_dir.exists():
        sys.exit(f"Input directory niet gevonden: {input_dir}")
    
    # Maak output directory
    output_dir.mkdir(parents=True, exist_ok=True)
    
    # Zoek ViewDefinition bestanden
    viewdef_files = find_viewdefinition_files(input_dir)
    
    if not viewdef_files:
        print(f"Geen ViewDefinition-*-ui.md bestanden gevonden in {input_dir}")
        return
    
    print(f"\n📋 {len(viewdef_files)} ViewDefinition-ui.md bestanden gevonden\n")
    
    # Verwerk elk bestand
    success_count = 0
    html_files = []
    
    for input_file in viewdef_files:
        # Genereer output filename
        base_name = input_file.stem.replace('-ui', '')  # ViewDefinition-X-ui → ViewDefinition-X
        html_file = output_dir / f"{base_name}.html"
        
        # Genereer HTML
        if generate_html_mockup(input_file, html_file, script_dir):
            success_count += 1
            html_files.append(html_file)
            
            # Optioneel: render PNG
            if args.render_png:
                png_file = html_file.with_suffix('.png')
                render_png_mockup(html_file, png_file, script_dir)
    
    # Summary
    print(f"\n{'='*60}")
    print(f"✅ {success_count}/{len(viewdef_files)} mockups gegenereerd")
    print(f"📁 Output directory: {output_dir}")
    
    if html_files:
        print(f"\n📄 Gegenereerde HTML-bestanden:")
        for f in html_files:
            print(f"   • {f.name}")
    
    # Genereer index
    if html_files:
        generate_index(output_dir, html_files)


def generate_index(output_dir, html_files):
    """Genereer een index HTML van alle gegenereerde mockups."""
    index_html = """<!DOCTYPE html>
<html lang="nl">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Zorgviewer Mockups - Index</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: 'Open Sans', -apple-system, BlinkMacSystemFont, sans-serif;
            background: #f5f5f5;
            color: #2D3748;
            padding: 24px;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        h1 {
            color: #00838F;
            margin-bottom: 32px;
            display: flex;
            align-items: center;
            gap: 12px;
        }
        .mockup-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 20px;
        }
        .mockup-card {
            background: white;
            border: 1px solid #E2E8F0;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 1px 3px rgba(0,0,0,0.04);
            transition: all 0.2s;
            cursor: pointer;
        }
        .mockup-card:hover {
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            transform: translateY(-2px);
        }
        .mockup-card h3 {
            color: #00838F;
            margin-bottom: 8px;
            font-size: 16px;
        }
        .mockup-card .links {
            display: flex;
            gap: 12px;
            margin-top: 16px;
        }
        .mockup-card a {
            padding: 8px 12px;
            background: #EFF6F7;
            color: #00838F;
            text-decoration: none;
            border-radius: 4px;
            font-size: 13px;
            transition: all 0.2s;
        }
        .mockup-card a:hover {
            background: #ECF6F7;
            font-weight: 600;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>⚕️ Zorgviewer Mockups</h1>
        <div class="mockup-grid">
"""
    
    for html_file in sorted(html_files):
        title = html_file.stem.replace('ViewDefinition-', '').replace('-', ' ')
        png_file = html_file.with_suffix('.png')
        
        index_html += f"""
            <div class="mockup-card">
                <h3>{title}</h3>
                <div class="links">
                    <a href="{html_file.name}" target="_blank">📄 HTML</a>
"""
        if png_file.exists():
            index_html += f'                    <a href="{png_file.name}" target="_blank">🖼️ PNG</a>\n'
        
        index_html += """                </div>
            </div>
"""
    
    index_html += """        </div>
    </div>
</body>
</html>"""
    
    index_file = output_dir / "index.html"
    with open(index_file, 'w', encoding='utf-8') as f:
        f.write(index_html)
    
    print(f"\n📇 Index gegenereerd: {index_file.name}")


if __name__ == "__main__":
    main()
