const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'work', 'screenshots');
const outDir = path.join(__dirname, '..', 'work', 'mockups');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

function svgRoundedRect(w, h, r, fill = '#fff', stroke = 'none', strokeWidth = 0) {
  return `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>`+
    `<rect x='0' y='0' width='${w}' height='${h}' rx='${r}' ry='${r}' fill='${fill}' stroke='${stroke}' stroke-width='${strokeWidth}'/>`+
    `</svg>`;
}

function svgBackground(w, h) {
  return `<?xml version="1.0" encoding="utf-8"?>\n`+
    `<svg xmlns='http://www.w3.org/2000/svg' width='${w}' height='${h}'>`+
    `<defs>`+
    `<linearGradient id='g' x1='0' x2='1' y1='0' y2='1'>`+
    `<stop offset='0' stop-color='#0f172a'/>`+
    `<stop offset='1' stop-color='#0b1220'/>`+
    `</linearGradient>`+
    `</defs>`+
    `<rect width='100%' height='100%' fill='url(#g)'/>`+
    `</svg>`;
}

async function makeMockup(baseName, laptopPath, mobilePath) {
  const canvasW = 1600, canvasH = 900;

  // Load and resize laptop screenshot
  const laptop = sharp(laptopPath);
  const laptopMeta = await laptop.metadata();
  const maxLaptopW = 1100;
  const laptopResizeW = Math.min(maxLaptopW, laptopMeta.width);
  const laptopBuf = await laptop.resize({ width: laptopResizeW }).toBuffer();
  const laptopImg = sharp(laptopBuf);
  const laptopSize = await laptopImg.metadata();

  // Create shadow by rendering a rounded rect SVG then blurring it
  const shadowSvg = svgRoundedRect(laptopSize.width, laptopSize.height, 18, '#000', 'none', 0);
  const shadowBuf = await sharp(Buffer.from(shadowSvg)).png().toBuffer();
  const shadow = await sharp(shadowBuf).png().blur(10).toBuffer();

  // Create framed screenshot with rounded corners and light border
  const maskSvg = svgRoundedRect(laptopSize.width, laptopSize.height, 18, '#fff');
  const borderSvg = svgRoundedRect(laptopSize.width + 8, laptopSize.height + 8, 22, 'none', '#ffffff', 6);

  const framedLaptop = await sharp({
    create: { width: laptopSize.width + 16, height: laptopSize.height + 16, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } }
  })
    .composite([
      { input: Buffer.from(borderSvg), top: 0, left: 0 },
      { input: shadow, top: 10, left: 10 },
      { input: laptopBuf, top: 8, left: 8 }
    ])
    .png()
    .toBuffer();

  // Compose onto background
  const bg = Buffer.from(svgBackground(canvasW, canvasH));
  const centerX = Math.round((canvasW - (laptopSize.width + 16)) / 2);
  const centerY = Math.round((canvasH - (laptopSize.height + 16)) / 2) - 20;

  const titleSvg = `<svg width='${canvasW}' height='120'>`+
    `<style> .t{font-family:Inter,Arial,sans-serif;fill:#fff;font-weight:700;font-size:44px}</style>`+
    `<text x='80' y='72' class='t'>${escapeXml(baseName.replace(/[-_]/g, ' '))}</text>`+
    `</svg>`;

  const outPath = path.join(outDir, `${baseName}_hero.png`);
  await sharp(bg)
    .composite([
      { input: framedLaptop, left: centerX, top: centerY },
      { input: Buffer.from(titleSvg), left: 0, top: 30 }
    ])
    .png()
    .toFile(outPath);

  console.log('Wrote', outPath);
}

function escapeXml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/'/g, '&apos;').replace(/"/g, '&quot;');
}

async function main() {
  const files = fs.readdirSync(screenshotsDir).filter(f => f.endsWith('.png'));
  const grouped = {};
  for (const f of files) {
    const m = f.match(/(.+?)_(laptop|mobile)\.png$/);
    if (!m) continue;
    const base = m[1];
    grouped[base] = grouped[base] || {};
    grouped[base][m[2]] = path.join(screenshotsDir, f);
  }

  for (const base of Object.keys(grouped)) {
    const pair = grouped[base];
    if (pair.laptop) {
      await makeMockup(base, pair.laptop, pair.mobile);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
