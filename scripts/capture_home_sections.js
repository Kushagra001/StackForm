const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

const outDir = path.join(__dirname, '..', 'work', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const base = 'https://www.stack-form.dev/';
const anchors = [
  { id: 'work', label: 'work' },
  { id: 'services', label: 'services' },
  { id: 'about', label: 'about' },
  { id: 'contact', label: 'contact' }
];

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const a of anchors) {
    const url = base + '#' + a.id;
    try {
      // laptop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const lp = path.join(outDir, `home_${a.label}_laptop.png`);
      await page.screenshot({ path: lp, fullPage: false });

      // mobile
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(600);
      const mp = path.join(outDir, `home_${a.label}_mobile.png`);
      await page.screenshot({ path: mp, fullPage: false });

      console.log('Saved', lp, mp);
    } catch (err) {
      console.error('Error capturing', url, err.message);
    }
  }

  await browser.close();
  console.log('Homepage sections captured to', outDir);
})();
