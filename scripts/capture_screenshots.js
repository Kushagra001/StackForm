const fs = require('fs');
const path = require('path');
const playwright = require('playwright');

const outDir = path.join(__dirname, '..', 'work', 'screenshots');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { slug: 'home', url: 'https://www.stack-form.dev/' },
  { slug: 'arca', url: 'https://www.stack-form.dev/work/arca' },
  { slug: 'medica', url: 'https://www.stack-form.dev/work/medica' },
  { slug: 'kern', url: 'https://www.stack-form.dev/work/kern' },
  { slug: 'axiom', url: 'https://www.stack-form.dev/work/axiom' },
  { slug: 'flow', url: 'https://www.stack-form.dev/work/flow' }
];

(async () => {
  const browser = await playwright.chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const p of pages) {
    try {
      // laptop
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(p.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);
      const lp = path.join(outDir, `${p.slug}_laptop.png`);
      await page.screenshot({ path: lp, fullPage: false });

      // mobile
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(p.url, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);
      const mp = path.join(outDir, `${p.slug}_mobile.png`);
      await page.screenshot({ path: mp, fullPage: false });

      console.log('Saved', lp, mp);
    } catch (err) {
      console.error('Error capturing', p.url, err.message);
    }
  }

  await browser.close();
  console.log('All screenshots saved to', outDir);
})();
