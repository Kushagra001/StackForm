const JimpImport = require('jimp');
const Jimp = JimpImport && JimpImport.default ? JimpImport.default : JimpImport;
const fs = require('fs');
const path = require('path');

const screenshotsDir = path.join(__dirname, '..', 'work', 'screenshots');
const outDir = path.join(__dirname, '..', 'work', 'mockups');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

async function makeMockup(baseName, laptopPath) {
  const canvasW = 1600, canvasH = 900;
  const bgColor = 0x0b1220ff;

  const canvas = await new Jimp(canvasW, canvasH, bgColor);
  const laptop = await Jimp.read(laptopPath);
  const laptopResizeW = Math.min(1100, laptop.bitmap.width);
  laptop.resize(laptopResizeW, Jimp.AUTO);

  // shadow
  const shadow = laptop.clone().color([{ apply: 'black', params: [100] }]).opacity(0.6).blur(10);
  const frameW = laptop.bitmap.width + 20;
  const frameH = laptop.bitmap.height + 20;
  const frame = await new Jimp(frameW, frameH, 0x00000000);
  // white border
  frame.scan(0, 0, frameW, frameH, function (x, y, idx) {
    const border = 3;
    if (x < border || y < border || x >= frameW - border || y >= frameH - border) {
      this.bitmap.data[idx + 0] = 255;
      this.bitmap.data[idx + 1] = 255;
      this.bitmap.data[idx + 2] = 255;
      this.bitmap.data[idx + 3] = 255;
    }
  });

  const centerX = Math.round((canvasW - frameW) / 2);
  const centerY = Math.round((canvasH - frameH) / 2) - 30;

  canvas.composite(shadow, centerX + 12, centerY + 12);
  canvas.composite(frame, centerX, centerY);
  canvas.composite(laptop, centerX + 10, centerY + 10);

  // Title text
  const font = await Jimp.loadFont(Jimp.FONT_SANS_64_WHITE);
  const title = baseName.replace(/[-_]/g, ' ');
  canvas.print(font, 80, 40, title);

  const outPath = path.join(outDir, `${baseName}_hero.png`);
  await canvas.quality(90).writeAsync(outPath);
  console.log('Wrote', outPath);
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
      await makeMockup(base, pair.laptop);
    }
  }
}

main().catch(err => { console.error(err); process.exit(1); });
