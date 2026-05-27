const fs = require('fs');
const path = require('path');
const { pathToFileURL } = require('url');
const { chromium } = require('playwright');

const screenshotsDir = path.join(__dirname, '..', 'work', 'screenshots');
const outDir = path.join(__dirname, '..', 'work', 'mockups');
const markupDir = path.join(outDir, 'markup');

function getArg(name) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : null;
}

const projectSlug = getArg('--project');
const baseFilter = getArg('--base');
const activeOutDir = projectSlug ? path.join(outDir, projectSlug) : outDir;
const activeMarkupDir = path.join(activeOutDir, 'markup');

if (!fs.existsSync(outDir)) {
  fs.mkdirSync(outDir, { recursive: true });
}
if (!fs.existsSync(activeOutDir)) {
  fs.mkdirSync(activeOutDir, { recursive: true });
}
if (!fs.existsSync(activeMarkupDir)) {
  fs.mkdirSync(activeMarkupDir, { recursive: true });
}

const paletteByBase = {
  home: ['#6a7ea8', '#d3d9e8', '#111827'],
  home_about: ['#8a7ca8', '#ddd5ea', '#211b2d'],
  home_work: ['#5e8b85', '#d6e4e1', '#14211f'],
  home_services: ['#a58a65', '#e8ddcf', '#2a2218'],
  home_contact: ['#9f6f74', '#ead8da', '#2a1719'],
  arca: ['#7f7497', '#ded7e8', '#1d1828'],
  axiom: ['#6d8a95', '#d7e4e7', '#152127'],
  flow: ['#9b8b6a', '#ebe2d0', '#231d14'],
  kern: ['#85708d', '#e4dae7', '#231d28'],
  medica: ['#72887d', '#dbe5dd', '#17221d'],
};

const copyByBase = {
  home: {
    title: 'Stackform Studio',
    subtitle: 'Calm, premium website systems shaped with restraint, spacing discipline, and responsive polish.',
    tags: ['Brand website', 'Responsive', 'Systems thinking'],
  },
  home_about: {
    title: 'About Section',
    subtitle: 'A quieter trust-building section with tighter hierarchy, softer spacing, and a more composed rhythm.',
    tags: ['Storytelling', 'Trust', 'Visual rhythm'],
  },
  home_work: {
    title: 'Work Showcase',
    subtitle: 'A refined showcase layout for presenting featured projects with clarity and minimal distraction.',
    tags: ['Portfolio', 'Case studies', 'Presentation'],
  },
  home_services: {
    title: 'Services Section',
    subtitle: 'Service offerings framed as outcomes, with clean hierarchy and a calmer reading pace.',
    tags: ['Offer framing', 'Clarity', 'Lead gen'],
  },
  home_contact: {
    title: 'Contact Section',
    subtitle: 'A refined final touchpoint with a simpler form surface and a more composed call to action.',
    tags: ['Conversion', 'Form UX', 'Final CTA'],
  },
  arca: {
    title: 'Arca',
    subtitle: 'A polished product surface designed to feel restrained, structured, and easy to trust.',
    tags: ['Product UI', 'Responsiveness', 'Detail'],
  },
  axiom: {
    title: 'Axiom',
    subtitle: 'A composed interface presentation with balanced contrast and a more intentional layout.',
    tags: ['Bold UI', 'Contrast', 'Modern'],
  },
  flow: {
    title: 'Flow',
    subtitle: 'A smoother visual system that keeps the interface light, deliberate, and complete.',
    tags: ['Flow', 'Navigation', 'Balance'],
  },
  kern: {
    title: 'Kern',
    subtitle: 'A typographic presentation with tighter spacing, better structure, and a quieter rhythm.',
    tags: ['Typography', 'Grid', 'Editorial'],
  },
  medica: {
    title: 'Medica',
    subtitle: 'A calm healthcare-style layout with stronger hierarchy and softer visual cues.',
    tags: ['Healthcare', 'Clarity', 'Calm'],
  },
};

function dataUri(filePath) {
  const buffer = fs.readFileSync(filePath);
  return `data:image/png;base64,${buffer.toString('base64')}`;
}

function humanizeBase(base) {
  return base
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');
}

function metaFor(base) {
  return copyByBase[base] || {
    title: humanizeBase(base),
    subtitle: 'Responsive website presentation with polished hierarchy, framed screens, and a premium finish.',
    tags: ['Responsive', 'UI polish', 'Case study'],
  };
}

function accentFor(base) {
  return paletteByBase[base] || ['#64748b', '#cbd5e1', '#111827'];
}

function shellForImage(kind, src, accent) {
  if (kind === 'mobile') {
    return `
      <div class="phone-shell" style="--accent:${accent}">
        <div class="phone-notch"></div>
        <img src="${src}" alt="mobile screenshot" />
      </div>`;
  }

  return `
    <div class="browser-shell" style="--accent:${accent}">
      <div class="browser-bar">
        <span></span><span></span><span></span>
      </div>
      <img src="${src}" alt="desktop screenshot" />
    </div>`;
}

function projectHtml(baseName, laptopPath, mobilePath) {
  const meta = metaFor(baseName);
  const [accent, accentSoft, shadowTint] = accentFor(baseName);
  const laptopUrl = dataUri(laptopPath);
  const mobileUrl = mobilePath ? dataUri(mobilePath) : '';
  const hasMobile = Boolean(mobilePath);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=1600, initial-scale=1" />
  <style>
    :root {
      --bg: #f5f1ea;
      --ink: #13141a;
      --muted: rgba(19, 20, 26, 0.62);
      --panel: rgba(255, 255, 255, 0.72);
      --stroke: rgba(19, 20, 26, 0.12);
      --accent: ${accent};
      --accent-soft: ${accentSoft};
      --shadow: ${shadowTint};
    }

    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; }
    body {
      background:
        radial-gradient(circle at 12% 16%, color-mix(in oklab, var(--accent-soft) 28%, white) 0, transparent 25%),
        radial-gradient(circle at 86% 18%, color-mix(in oklab, var(--accent) 12%, white) 0, transparent 26%),
        linear-gradient(180deg, #f6f2ec 0%, #ede8e1 100%);
      color: var(--ink);
      font-family: 'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
      overflow: hidden;
    }

    .canvas {
      width: 1600px;
      height: 1200px;
      padding: 78px 84px 72px;
      position: relative;
      isolation: isolate;
    }

    .grain {
      position: absolute;
      inset: 0;
      background-image:
        linear-gradient(rgba(19, 20, 26, 0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(19, 20, 26, 0.03) 1px, transparent 1px);
      background-size: 70px 70px;
      mask-image: radial-gradient(circle at center, black 54%, transparent 100%);
      opacity: 0.35;
      pointer-events: none;
      z-index: -2;
    }

    .halo {
      position: absolute;
      inset: 120px 140px auto auto;
      width: 540px;
      height: 540px;
      background: radial-gradient(circle, color-mix(in oklab, var(--accent) 28%, white) 0%, transparent 68%);
      filter: blur(48px);
      opacity: 0.8;
      pointer-events: none;
      z-index: -1;
    }

    .eyebrow {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 16px;
      border-radius: 999px;
      border: 1px solid var(--stroke);
      background: rgba(255, 255, 255, 0.66);
      font-size: 13px;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: var(--muted);
    }

    .eyebrow i {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--accent);
      display: inline-block;
      box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 18%, white);
    }

    .header {
      display: flex;
      justify-content: space-between;
      gap: 36px;
      align-items: flex-start;
      margin-top: 30px;
    }

    .copy {
      width: 660px;
    }

    .title {
      margin: 18px 0 0;
      font-size: 70px;
      line-height: 0.95;
      letter-spacing: -0.04em;
      font-weight: 750;
      max-width: 7.5ch;
    }

    .subtitle {
      margin: 26px 0 0;
      max-width: 56ch;
      font-size: 21px;
      line-height: 1.55;
      color: var(--muted);
    }

    .tags {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-top: 28px;
    }

    .tag {
      padding: 10px 14px;
      border-radius: 999px;
      border: 1px solid rgba(19, 20, 26, 0.12);
      background: rgba(255, 255, 255, 0.78);
      font-size: 14px;
      color: rgba(19, 20, 26, 0.8);
      box-shadow: 0 10px 30px rgba(19, 20, 26, 0.06);
    }

    .meta {
      display: grid;
      gap: 14px;
      padding-top: 22px;
      align-self: stretch;
      width: 280px;
    }

    .meta-card {
      padding: 18px 18px 16px;
      border-radius: 22px;
      border: 1px solid rgba(19, 20, 26, 0.08);
      background: rgba(255, 255, 255, 0.72);
      box-shadow: 0 24px 50px rgba(19, 20, 26, 0.08);
      backdrop-filter: blur(8px);
    }

    .meta-label {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
      color: color-mix(in oklab, var(--accent) 72%, black);
    }

    .meta-value {
      margin-top: 8px;
      font-size: 16px;
      line-height: 1.4;
      font-weight: 600;
      color: var(--ink);
    }

    .stage {
      position: relative;
      margin-top: 44px;
      height: 776px;
      border-radius: 44px;
      border: 1px solid rgba(19, 20, 26, 0.08);
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.88), rgba(255, 255, 255, 0.74)),
        linear-gradient(135deg, color-mix(in oklab, var(--accent-soft) 14%, white), rgba(255, 255, 255, 0.9));
      box-shadow:
        0 50px 120px rgba(19, 20, 26, 0.14),
        inset 0 1px 0 rgba(255, 255, 255, 0.9);
      overflow: hidden;
    }

    .stage::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: radial-gradient(circle at 20px 20px, rgba(19, 20, 26, 0.05) 0 1px, transparent 1px);
      background-size: 72px 72px;
      opacity: 0.28;
      pointer-events: none;
    }

    .device-row {
      position: absolute;
      inset: 70px 78px 54px;
      display: grid;
      grid-template-columns: minmax(0, 1fr) 312px;
      gap: 38px;
      align-items: end;
    }

    .browser-shell {
      border-radius: 30px;
      overflow: hidden;
      background: #fff;
      border: 1px solid rgba(19, 20, 26, 0.1);
      box-shadow: 0 32px 80px rgba(19, 20, 26, 0.2);
      transform: rotate(-1.2deg);
      transform-origin: center;
    }

    .browser-bar {
      height: 40px;
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 0 16px;
      background: linear-gradient(180deg, rgba(19, 20, 26, 0.03), rgba(19, 20, 26, 0.01));
      border-bottom: 1px solid rgba(19, 20, 26, 0.08);
    }

    .browser-bar span {
      width: 10px;
      height: 10px;
      border-radius: 999px;
      background: rgba(19, 20, 26, 0.18);
    }

    .browser-shell img {
      display: block;
      width: 100%;
      height: auto;
    }

    .phone-wrap {
      display: flex;
      justify-content: center;
      padding-bottom: 14px;
    }

    .phone-shell {
      position: relative;
      width: 312px;
      padding: 18px 12px 16px;
      border-radius: 42px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(234, 236, 241, 0.95));
      border: 1px solid rgba(19, 20, 26, 0.12);
      box-shadow: 0 36px 72px rgba(19, 20, 26, 0.18);
      transform: rotate(7deg);
    }

    .phone-shell::before {
      content: '';
      position: absolute;
      inset: 9px;
      border-radius: 32px;
      border: 1px solid rgba(19, 20, 26, 0.08);
      pointer-events: none;
    }

    .phone-notch {
      position: absolute;
      top: 18px;
      left: 50%;
      width: 112px;
      height: 24px;
      border-radius: 999px;
      background: rgba(19, 20, 26, 0.96);
      transform: translateX(-50%);
      z-index: 2;
    }

    .phone-shell img {
      display: block;
      width: 100%;
      border-radius: 28px;
      overflow: hidden;
    }

    .foot {
      position: absolute;
      left: 84px;
      right: 84px;
      bottom: 38px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--muted);
      font-size: 13px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    .foot strong {
      color: var(--ink);
      letter-spacing: 0;
      text-transform: none;
      font-size: 14px;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="grain"></div>
    <div class="halo"></div>

    <div class="eyebrow"><i></i> selected work</div>

    <div class="header">
      <div class="copy">
        <h1 class="title">${meta.title}</h1>
        <p class="subtitle">${meta.subtitle}</p>
        <div class="tags">
          ${meta.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>

      <div class="meta">
        <div class="meta-card">
          <div class="meta-label">Deliverable</div>
          <div class="meta-value">Premium presentation board</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Format</div>
          <div class="meta-value">Desktop showcase, mobile inset</div>
        </div>
        <div class="meta-card">
          <div class="meta-label">Use case</div>
          <div class="meta-value">Portfolio, proposals, case studies</div>
        </div>
      </div>
    </div>

    <section class="stage">
      <div class="device-row">
        <div class="browser-wrap">
          ${shellForImage('desktop', laptopUrl, accent)}
        </div>
        ${hasMobile ? `<div class="phone-wrap">${shellForImage('mobile', mobileUrl, accent)}</div>` : ''}
      </div>
      <div class="foot">
        <div><strong>${meta.title}</strong></div>
        <div>${baseName.replace(/_/g, ' / ')}</div>
      </div>
    </section>
  </div>
</body>
</html>`;
}

function coverHtml(items) {
  const featured = items.find(item => item.base === 'home') || items[0];
  const support = items.filter(item => item !== featured).slice(0, 4);

  const supportCards = support.map(item => {
    const meta = metaFor(item.base);
    const [accent, accentSoft] = accentFor(item.base);
    return `
      <article class="tile" style="--accent:${accent};--accent-soft:${accentSoft}">
        <div class="tile-head">
          <span class="tile-label">${item.base.replace(/_/g, ' / ')}</span>
          <span class="tile-dot"></span>
        </div>
        <div class="tile-title">${meta.title}</div>
        <div class="tile-subtitle">${meta.subtitle}</div>
        <div class="tile-shot">
          <img src="${dataUri(item.laptop)}" alt="${meta.title} screenshot" />
        </div>
      </article>`;
  }).join('');

  const featuredMeta = metaFor(featured.base);
  const [featuredAccent, featuredAccentSoft] = accentFor(featured.base);

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=1600, initial-scale=1" />
  <style>
    * { box-sizing: border-box; }
    html, body { margin: 0; width: 100%; height: 100%; }
    body {
      background:
        radial-gradient(circle at 18% 12%, rgba(91, 124, 250, 0.18) 0, transparent 26%),
        radial-gradient(circle at 82% 18%, rgba(16, 185, 129, 0.14) 0, transparent 24%),
        linear-gradient(180deg, #f8f6f2 0%, #efe9e0 100%);
      font-family: 'Segoe UI', system-ui, sans-serif;
      color: #13141a;
      overflow: hidden;
    }

    .canvas {
      width: 1600px;
      height: 1200px;
      padding: 72px 78px 66px;
    }

    .top {
      display: flex;
      justify-content: space-between;
      gap: 40px;
      align-items: flex-end;
      margin-bottom: 42px;
    }

    .kicker {
      font-size: 13px;
      font-weight: 700;
      letter-spacing: 0.24em;
      text-transform: uppercase;
      color: rgba(19, 20, 26, 0.56);
    }

    .headline {
      margin: 16px 0 0;
      max-width: 11ch;
      font-size: 74px;
      line-height: 0.96;
      letter-spacing: -0.05em;
      font-weight: 760;
    }

    .lede {
      max-width: 53ch;
      margin: 16px 0 0;
      color: rgba(19, 20, 26, 0.68);
      font-size: 20px;
      line-height: 1.52;
    }

    .badge {
      margin-bottom: 10px;
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 10px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.72);
      border: 1px solid rgba(19, 20, 26, 0.1);
      font-size: 13px;
      letter-spacing: 0.14em;
      text-transform: uppercase;
      color: rgba(19, 20, 26, 0.6);
    }

    .badge i {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: #5b7cfa;
      box-shadow: 0 0 0 6px rgba(91, 124, 250, 0.12);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 22px;
    }

    .featured {
      margin-bottom: 22px;
      border-radius: 36px;
      padding: 28px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.74)),
        radial-gradient(circle at top right, color-mix(in oklab, var(--accent) 14%, white) 0, transparent 42%);
      border: 1px solid rgba(19, 20, 26, 0.08);
      box-shadow: 0 30px 70px rgba(19, 20, 26, 0.1);
      position: relative;
      overflow: hidden;
      display: grid;
      grid-template-columns: minmax(0, 1.08fr) minmax(0, 0.92fr);
      gap: 26px;
      align-items: center;
      min-height: 404px;
    }

    .featured::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(19, 20, 26, 0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 20, 26, 0.025) 1px, transparent 1px);
      background-size: 72px 72px;
      opacity: 0.24;
      pointer-events: none;
    }

    .featured-copy,
    .featured-shot {
      position: relative;
      z-index: 1;
    }

    .featured-kicker {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      padding: 9px 14px;
      border-radius: 999px;
      background: rgba(255, 255, 255, 0.74);
      border: 1px solid rgba(19, 20, 26, 0.1);
      font-size: 12px;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(19, 20, 26, 0.56);
    }

    .featured-kicker i {
      width: 8px;
      height: 8px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 0 6px color-mix(in oklab, var(--accent) 16%, white);
    }

    .featured-title {
      margin: 18px 0 0;
      font-size: 46px;
      line-height: 0.98;
      letter-spacing: -0.05em;
      font-weight: 760;
      max-width: 8ch;
    }

    .featured-subtitle {
      margin: 18px 0 0;
      max-width: 44ch;
      font-size: 18px;
      line-height: 1.55;
      color: rgba(19, 20, 26, 0.68);
    }

    .featured-meta {
      display: flex;
      gap: 10px;
      flex-wrap: wrap;
      margin-top: 22px;
    }

    .featured-pill {
      padding: 8px 12px;
      border-radius: 999px;
      border: 1px solid rgba(19, 20, 26, 0.1);
      background: rgba(255, 255, 255, 0.76);
      font-size: 12px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: rgba(19, 20, 26, 0.72);
    }

    .featured-shot {
      height: 100%;
      min-height: 332px;
      border-radius: 28px;
      overflow: hidden;
      border: 1px solid rgba(19, 20, 26, 0.08);
      box-shadow: 0 26px 56px rgba(19, 20, 26, 0.12);
      background: #fff;
    }

    .featured-shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }

    .tile {
      min-height: 488px;
      border-radius: 32px;
      padding: 24px;
      background:
        linear-gradient(180deg, rgba(255, 255, 255, 0.86), rgba(255, 255, 255, 0.68)),
        radial-gradient(circle at top right, color-mix(in oklab, var(--accent) 16%, white) 0, transparent 42%);
      border: 1px solid rgba(19, 20, 26, 0.08);
      box-shadow: 0 26px 60px rgba(19, 20, 26, 0.08);
      position: relative;
      overflow: hidden;
    }

    .tile::before {
      content: '';
      position: absolute;
      inset: 0;
      background-image: linear-gradient(rgba(19, 20, 26, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(19, 20, 26, 0.03) 1px, transparent 1px);
      background-size: 64px 64px;
      opacity: 0.25;
      pointer-events: none;
    }

    .tile-head {
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      z-index: 1;
    }

    .tile-label {
      font-size: 12px;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      color: rgba(19, 20, 26, 0.55);
    }

    .tile-dot {
      width: 12px;
      height: 12px;
      border-radius: 999px;
      background: var(--accent);
      box-shadow: 0 0 0 8px rgba(255, 255, 255, 0.32);
    }

    .tile-title {
      position: relative;
      z-index: 1;
      margin-top: 18px;
      font-size: 34px;
      font-weight: 720;
      letter-spacing: -0.04em;
    }

    .tile-subtitle {
      position: relative;
      z-index: 1;
      margin-top: 10px;
      color: rgba(19, 20, 26, 0.68);
      font-size: 16px;
      line-height: 1.5;
      max-width: 40ch;
    }

    .tile-shot {
      position: absolute;
      left: 22px;
      right: 22px;
      bottom: 22px;
      height: 296px;
      border-radius: 24px;
      overflow: hidden;
      border: 1px solid rgba(19, 20, 26, 0.08);
      box-shadow: 0 24px 54px rgba(19, 20, 26, 0.14);
      transform: translateY(0);
      background: #fff;
    }

    .tile-shot img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center top;
      display: block;
    }

    .footer {
      margin-top: 22px;
      display: flex;
      justify-content: space-between;
      color: rgba(19, 20, 26, 0.55);
      font-size: 13px;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="canvas">
    <div class="top">
      <div>
        <div class="badge"><i></i> portfolio selection</div>
        <div class="kicker">portfolio presentation</div>
        <h1 class="headline">Selected work, presented with restraint.</h1>
      </div>
      <p class="lede">A compact portfolio board built from the project screenshots, shaped so the work feels calm, intentional, and ready for client-facing use anywhere.</p>
    </div>
    <section class="featured" style="--accent:${featuredAccent};--accent-soft:${featuredAccentSoft}">
      <div class="featured-copy">
        <div class="featured-kicker"><i></i> main featured section</div>
        <h2 class="featured-title">${featuredMeta.title}</h2>
        <p class="featured-subtitle">${featuredMeta.subtitle}</p>
        <div class="featured-meta">
          ${featuredMeta.tags.map(tag => `<span class="featured-pill">${tag}</span>`).join('')}
        </div>
      </div>
      <div class="featured-shot">
        <img src="${dataUri(featured.laptop)}" alt="featured screenshot" />
      </div>
    </section>
    <section class="grid">
      ${supportCards}
    </section>
    <div class="footer">
      <div>desktop and mobile compositions</div>
      <div>generated from live project screenshots</div>
    </div>
  </div>
</body>
</html>`;
}

async function renderHtml(browser, html, outputPath, width, height) {
  const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 2 });
  const page = await context.newPage();
  await page.setContent(html, { waitUntil: 'load' });
  await page.waitForTimeout(100);
  await page.screenshot({ path: outputPath, fullPage: true });
  await context.close();
}

async function main() {
  const files = fs.readdirSync(screenshotsDir).filter(file => file.endsWith('.png'));
  const grouped = new Map();

  for (const file of files) {
    const match = file.match(/(.+?)_(laptop|mobile)\.png$/);
    if (!match) continue;
    const base = match[1];
    if (!grouped.has(base)) grouped.set(base, {});
    grouped.get(base)[match[2]] = path.join(screenshotsDir, file);
  }

  const items = [];
  for (const [base, pair] of grouped.entries()) {
    if (baseFilter && base !== baseFilter) continue;
    if (pair.laptop) {
      items.push({ base, laptop: pair.laptop, mobile: pair.mobile || null });
    }
  }

  if (baseFilter && items.length === 0) {
    throw new Error(`No screenshots found for base "${baseFilter}"`);
  }

  items.sort((a, b) => a.base.localeCompare(b.base));

  const browser = await chromium.launch({ headless: true });

  try {
    const coverMarkup = coverHtml(items);
    fs.writeFileSync(path.join(activeMarkupDir, 'portfolio_cover.html'), coverMarkup, 'utf8');
    await renderHtml(browser, coverMarkup, path.join(activeOutDir, 'portfolio_cover.png'), 1600, 1200);

    for (const item of items) {
      const html = projectHtml(item.base, item.laptop, item.mobile);
      const outputPath = path.join(activeOutDir, `${item.base}_hero.png`);
      await renderHtml(browser, html, outputPath, 1600, 1200);
      fs.writeFileSync(path.join(activeMarkupDir, `${item.base}.html`), html, 'utf8');
      console.log('Wrote', outputPath);
    }

    console.log('Wrote', path.join(activeOutDir, 'portfolio_cover.png'));
  } finally {
    await browser.close();
  }
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});