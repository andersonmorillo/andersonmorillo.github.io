# Design — Anderson Labs

A locked design system for this site. Every page redesign reads this file before
emitting code. Do not regenerate per page — extend or amend this file when the
system needs to grow.

Source DNA: `brand-summary.html` (Magenta Mind Palette C + Syne/DM Sans + Bracket Lab Cream+Gold mark).

## Genre

atmospheric (dark AI energy) with playful CTA voice

## Macrostructure family

- Marketing pages: Feature Stack (hero → featured build → capabilities → proof)
- Content pages: Long Document (blog singles, publications)
- Profile / utility: Letter rhythm on About; calmer utility on Contact / Services

## Theme

Ash. One muted red, warm neutrals. Light accent `#8A5A56`; dark accent `#C9A39E` with ink labels on filled buttons.

- `--color-paper`   oklch(96.9% 0.004 56)   /* #F7F4F2 */
- `--color-paper-2` oklch(93.1% 0.011 39)    /* #EFE6E3 */
- `--color-ink`     oklch(20.7% 0.01 29)     /* #1C1615 */
- `--color-ink-2`   oklch(49.6% 0.022 34)    /* #6E5E5A */
- `--color-rule`    oklch(89.5% 0.012 43)    /* #E4DAD6 */
- `--color-accent`  oklch(51.9% 0.064 25)    /* #8A5A56 */
- `--color-accent-2` oklch(40.2% 0.04 28)    /* #5C403C */
- `--color-gold`    oklch(74.8% 0.046 27)    /* #C9A39E dark accent */
- `--color-focus`   oklch(51.9% 0.064 25)    /* same as accent; pale ash in dark */

Dark paper band uses `--color-ink` as body; light ink uses `--color-paper`.

## Typography

- Display: Syne, weight 700/800, style normal (never italic headers)
- Body: DM Sans, weight 400/500/700
- Mono: ui-monospace / system mono for code only
- Display tracking: -0.03em
- Type scale anchor: display = clamp(2rem, 5vw, 3.25rem)

## Spacing

4-point named scale. Values live in `tokens.css`. Pages must use named tokens
(`var(--space-md)`), never raw values in Hallmark-owned CSS.

## Motion

- Easings: `--ease-out` cubic-bezier(0.16, 1, 0.3, 1); `--ease-in-out` cubic-bezier(0.45, 0, 0.55, 1)
- Reveal: fade + slight translateY on hero clusters only (≤ 3 primitives)
- Reduced-motion: opacity-only, ≤ 150 ms

## Microinteractions stance

- Silent success (no celebratory toasts)
- Hover delay 800 ms · focus delay 0 ms
- Animate transform + opacity only

## CTA voice

- Primary CTA: filled ash (`--color-accent`), soft radius (~12px), Outfit/DM Sans bold label. Dark fill is `#C9A39E` with ink text.
- Secondary CTA: outline on rule / ink, same radius

## Per-page allowances

- Marketing pages MAY use Tier-A CSS atmosphere (radial washes) — no invented stock.
- Content pages: typography-led; Maker Desk imagery rules (hands-on builds, not robot stock).
- App-like utility (contact form): full 8 interactive states on controls.

## What pages MUST share

- Wordmark / Bracket Lab Cream+Gold mark
- Accent placement (ash primary in light, pale ash in dark)
- Syne + DM Sans
- CTA voice
- Brand chrome name: **Anderson Labs**

## What pages MAY differ on

- Macrostructure within the page-type family
- Hero archetype knobs within Feature Stack / Letter
- Section density

## Naming (2A)

- Chrome: Anderson Labs (title, logo text, copyright, meta brand chrome)
- Person: Anderson Morillo (bylines, authors, publication credits, `metadata.author`)

## Brand voice

- Descriptors: Curious · Trustworthy · Bold
- Archetype: Magician (primary) + Creator (secondary)
- Pillars: Build · Teach · Research
- One-line: Engineer · AI systems · research · I explain it simply and show the build.

## Exports

See `tokens.css` at project root. Hugoplate also maps the system through `data/theme.json` → `generated-theme.css`.
