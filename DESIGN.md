# Design tokens and constraints — Stackform

Color
- Accent / primary: #4f6ef7 (electric blue)
- Background: #080810 (near-black)
- Neutrals: tint the near-black toward the brand hue for true blacks (avoid pure #000). Use very low chroma tints for grays.
- Color strategy: Committed (a single saturated accent anchors the surface; use reservedly for CTAs, links, and highlights). No gradients.

Typography
- Display / headings: Cal Sans — scalable sizes: 48/36/28/20 (H1..H4)
- Body: Inter — base 16px, line-height 1.45, max line length 65–75ch.
- Code / labels: JetBrains Mono for monospace needs.

Layout & spacing
- Rhythm: use a 4px baseline grid with larger steps at 8/16/24/32 for sections.
- Max content width: 1100px for case studies; hero may run wider with controlled gutters.

Motion
- Avoid animating layout properties. Use transforms & opacity with ease-out-quart timing.
- Respect `prefers-reduced-motion` — provide reduced or disabled motion variants.

Accessibility
- Target WCAG AA. Ensure body text ≥ 4.5:1 against background. Use the accent only where contrast meets this threshold or on larger UI elements (≥18pt/14pt bold).

Components
- Buttons: solid accent on dark surface for primary CTAs; subtle tinted-neural outlines for secondary actions.
- Links: accent color, underlines optional, focus-visible outlines required.

Bans
- No gradient text, no side-stripe borders, no glassmorphism as default.
