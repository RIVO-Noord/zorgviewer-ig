#!/usr/bin/env python3
"""
generate-mockup.py — Render een HTML mockup naar PNG met Puppeteer (Chrome).

Onderdeel van de MockupForge skill.

GEBRUIK:
    python3 generate-mockup.py --html <pad-naar-html> --output <pad-naar-png> [--width 1280] [--scale 2]
"""

import argparse
import subprocess
import sys
from pathlib import Path

NODE_SCRIPT = """
const puppeteer = require('/tmp/renderer/node_modules/puppeteer');

(async () => {
    const args = process.argv.slice(2);
    const htmlPath = args[0];
    const outputPath = args[1];
    const width = parseInt(args[2] || '1280', 10);
    const scale = parseFloat(args[3] || '2');

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--font-render-hinting=none'
        ]
    });

    try {
        const page = await browser.newPage();
        await page.setViewport({
            width: width,
            height: 900,
            deviceScaleFactor: scale
        });

        const fileUrl = 'file://' + htmlPath;
        await page.goto(fileUrl, { waitUntil: ['networkidle0', 'domcontentloaded'] });

        // Wacht op eventuele Google Fonts
        await page.evaluateHandle('document.fonts.ready');

        // Maak screenshot
        await page.screenshot({
            path: outputPath,
            fullPage: false
        });

        console.log('Screenshot opgeslagen: ' + outputPath);
    } finally {
        await browser.close();
    }
})();
"""

def main():
    parser = argparse.ArgumentParser(description="Render HTML mockup naar PNG")
    parser.add_argument("--html", required=True, help="Pad naar HTML-bestand")
    parser.add_argument("--output", required=True, help="Pad naar output PNG-bestand")
    parser.add_argument("--width", type=int, default=1280, help="Viewport breedte (default: 1280)")
    parser.add_argument("--height", type=int, default=800, help="Viewport hoogte (default: 800)")
    parser.add_argument("--scale", type=float, default=2.0, help="Device scale factor (default: 2.0)")
    parser.add_argument("--full-page", action="store_true", help="Screenshot van de volledige pagina")
    args = parser.parse_args()

    html_path = Path(args.html).expanduser().resolve()
    output_path = Path(args.output).expanduser().resolve()

    if not html_path.exists():
        sys.exit(f"ERROR: HTML bestand bestaat niet: {html_path}")

    output_path.parent.mkdir(parents=True, exist_ok=True)

    # Voer Node script uit
    js_code = f"""
const puppeteer = require('/tmp/renderer/node_modules/puppeteer');

(async () => {{
    const browser = await puppeteer.launch({{
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--font-render-hinting=none'
        ]
    }});

    try {{
        const page = await browser.newPage();
        await page.setViewport({{
            width: {args.width},
            height: {args.height},
            deviceScaleFactor: {args.scale}
        }});

        await page.goto('file://{html_path}', {{ waitUntil: ['networkidle0', 'domcontentloaded'] }});
        await page.evaluateHandle('document.fonts.ready');

        await page.screenshot({{
            path: '{output_path}',
            fullPage: {'true' if args.full_page else 'false'}
        }});

        console.log('PNG succesvol gegenereerd: {output_path}');
    }} catch (err) {{
        console.error('Fout bij renderen:', err);
        process.exit(1);
    }} finally {{
        await browser.close();
    }}
}})();
"""
    result = subprocess.run(["node", "-e", js_code], capture_output=True, text=True)
    if result.returncode != 0:
        sys.exit(f"Node execution failed:\n{result.stderr}")
    print(result.stdout.strip())

if __name__ == "__main__":
    main()
