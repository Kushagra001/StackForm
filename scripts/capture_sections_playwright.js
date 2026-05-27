const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function arg(name, fallback = null) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

async function main() {
  const url = arg('--url');
  const project = arg('--project', 'project');

  if (!url) {
    throw new Error('Missing --url');
  }

  const outDir = path.join(__dirname, '..', 'work', project, 'sections');
  const desktopDir = path.join(outDir, 'desktop');
  const mobileDir = path.join(outDir, 'mobile');
  fs.mkdirSync(desktopDir, { recursive: true });
  fs.mkdirSync(mobileDir, { recursive: true });

  const names = ['hero', 'used-at', 'intelligence', 'trusted', 'how-it-works', 'testimonials', 'pricing', 'cta', 'footer'];
  const presets = [
    { name: 'desktop', dir: desktopDir, viewport: { width: 1440, height: 2200 } },
    { name: 'mobile', dir: mobileDir, viewport: { width: 390, height: 1800 } },
  ];

  const browser = await chromium.launch({ headless: true });

  try {
    for (const preset of presets) {
      const page = await browser.newPage({ viewport: preset.viewport, deviceScaleFactor: 2 });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(5000);

      const sections = page.locator('main > *');
      const count = await sections.count();
      const limit = Math.min(count, names.length);

      for (let index = 0; index < limit; index += 1) {
        const section = sections.nth(index);
        const fileName = `${String(index + 1).padStart(2, '0')}-${names[index]}.png`;
        await section.scrollIntoViewIfNeeded();
        await section.screenshot({ path: path.join(preset.dir, fileName) });
      }

      const footer = page.getByRole('contentinfo');
      if (await footer.count()) {
        await footer.scrollIntoViewIfNeeded();
        await footer.screenshot({ path: path.join(preset.dir, '09-footer.png') });
      }

      await page.close();
    }
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});