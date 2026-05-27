const fs = require('fs');
const path = require('path');
const { chromium } = require('playwright');

function arg(name, fallback = null) {
  const idx = process.argv.indexOf(name);
  return idx >= 0 ? process.argv[idx + 1] : fallback;
}

const project = arg('--project');
if (!project) {
  console.error('Usage: node generate_project_mockups.js --project <project-slug>');
  process.exit(1);
}

const projectDir = path.join(__dirname, '..', 'work', project);
const screenshotsDir = path.join(__dirname, '..', 'work', 'screenshots');
const outDir = path.join(__dirname, '..', 'work', 'mockups', project);
const markupDir = path.join(outDir, 'markup');

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });
if (!fs.existsSync(markupDir)) fs.mkdirSync(markupDir, { recursive: true });

function dataUri(fp) {
  const buf = fs.readFileSync(fp);
  return `data:image/png;base64,${buf.toString('base64')}`;
}

function humanize(base) {
  return base.split(/-|_/).map(s => s[0].toUpperCase() + s.slice(1)).join(' ');
}

function metaFor(base) {
  return {
    title: humanize(base),
    subtitle: 'Section composition for project',
    tags: ['UI', 'Section', 'Composition']
  };
}

function shellForImage(kind, src, accent) {
  if (kind === 'mobile') {
    return `<div class="phone-shell" style="--accent:${accent}"><div class="phone-notch"></div><img src="${src}"/></div>`;
  }
  return `<div class="browser-shell" style="--accent:${accent}"><div class="browser-bar"><span></span><span></span><span></span></div><img src="${src}"/></div>`;
}

function projectHtml(title, laptopSrc, mobileSrc) {
  const meta = metaFor(title);
  const laptop = dataUri(laptopSrc);
  const mobile = mobileSrc ? dataUri(mobileSrc) : '';
  const accent = '#9b8b6a';
  return `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=1600, initial-scale=1"/><style>
  html,body{margin:0;height:100%;}
  body{font-family:Segoe UI,system-ui,sans-serif;background:#f6f2ec;color:#111}
  .canvas{width:1600px;height:1200px;padding:72px}
  .title{font-size:48px;font-weight:700}
  .stage{margin-top:28px;border-radius:28px;padding:22px;background:linear-gradient(180deg,#fff,#fbfaf7);box-shadow:0 30px 80px rgba(0,0,0,0.08)}
  .browser-shell img{width:100%;display:block}
  .phone-shell{width:312px;padding:18px;background:#fff;border-radius:36px}
</style></head><body>
  <div class="canvas">
    <div class="title">${meta.title}</div>
    <div class="stage">
      <div style="display:flex;gap:28px;align-items:flex-end">
        ${shellForImage('desktop', laptop, accent)}
        ${mobile ? shellForImage('mobile', mobile, accent) : ''}
      </div>
    </div>
  </div>
</body></html>`;
}

async function renderHtml(browser, html, outPath, width = 1600, height = 1200) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(200);
  await page.screenshot({ path: outPath, fullPage: true });
  await context.close();
}

async function main() {
  const heroLaptop = path.join(screenshotsDir, `${project.replace(/-.*$/,'')}_laptop.png`);
  const heroMobile = path.join(screenshotsDir, `${project.replace(/-.*$/,'')}_mobile.png`);
  // Fallback: if specific names not present, try 'flow' base
  const baseName = project.split('-')[0];
  const heroLP = fs.existsSync(heroLaptop) ? heroLaptop : path.join(screenshotsDir, `${baseName}_laptop.png`);
  const heroMB = fs.existsSync(heroMobile) ? heroMobile : path.join(screenshotsDir, `${baseName}_mobile.png`);

  const sectionDesktopDir = path.join(projectDir, 'sections', 'desktop');
  const sectionMobileDir = path.join(projectDir, 'sections', 'mobile');

  const sections = fs.existsSync(sectionDesktopDir) ? fs.readdirSync(sectionDesktopDir).filter(f => f.endsWith('.png')).sort() : [];

  const browser = await chromium.launch({ headless: true });
  try {
    // Cover: feature hero + up to 4 section tiles
    const support = sections.slice(0,4).map(f => ({ laptop: path.join(sectionDesktopDir, f) }));
    const supportHtml = support.map(s => `<article style="width:360px;border-radius:20px;padding:16px;background:#fff;margin:8px"><img src="${dataUri(s.laptop)}" style="width:100%"/></article>`).join('');
    const coverHtml = `<!doctype html><html><head><meta charset="utf-8"/><meta name="viewport" content="width=1600, initial-scale=1"/><style>html,body{margin:0;font-family:Segoe UI,system-ui,sans-serif}body{background:linear-gradient(180deg,#f8f6f2,#efe9e0)}.wrap{padding:72px}.featured{display:flex;gap:28px;align-items:center}.title{font-size:56px;font-weight:800}.support{display:flex;flex-wrap:wrap;width:820px}</style></head><body><div class="wrap"><div class="featured"><div><div class="title">${humanize(project)}</div><p style="max-width:44ch;color:#6b6b6b">Project cover generated from live screenshots</p></div><div style="width:680px"><img src="${fs.existsSync(heroLP)?dataUri(heroLP):''}" style="width:100%;border-radius:16px"/></div></div><div style="margin-top:28px" class="support">${supportHtml}</div></div></body></html>`;
    fs.writeFileSync(path.join(markupDir, 'project_cover.html'), coverHtml, 'utf8');
    await renderHtml(browser, coverHtml, path.join(outDir, 'project_cover.png'));

    // Per-section renders
    for (const s of sections) {
      const name = s.replace(/^[0-9]+-/, '').replace('.png', '');
      const laptop = path.join(sectionDesktopDir, s);
      const mobile = path.join(sectionMobileDir, s);
      const html = projectHtml(name, laptop, fs.existsSync(mobile)?mobile:null);
      fs.writeFileSync(path.join(markupDir, `${name}.html`), html, 'utf8');
      await renderHtml(browser, html, path.join(outDir, `${name}_hero.png`));
      console.log('Wrote', path.join(outDir, `${name}_hero.png`));
    }

    console.log('Wrote cover:', path.join(outDir, 'project_cover.png'));
  } finally {
    await browser.close();
  }
}

main().catch(e => { console.error(e); process.exit(1); });
