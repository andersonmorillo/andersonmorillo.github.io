---
name: blog-quality-check
description: Use before publishing (setting draft: false on) any blog post under content/*/blog/, especially posts tagged "daily-automated-blog" written by an external/automated pipeline. Covers avoiding generic AI-sounding prose, required structure, images, and the local validator script.
---

# Blog Quality Check

Pre-publish checklist for any agent (automated pipeline or Cursor agent) authoring a post in `content/english/blog/` or `content/spanish/blog/`. Run through every item below, then run the validator script. Fix hard failures before setting `draft: false`.

## 1. No stray `---`

`---` is reserved for the two frontmatter delimiters only. Never use `---` as a horizontal rule / section break inside the article body — no exceptions, even for "scene breaks" or visual separators. Use a `##`/`###` heading instead.

## 2. Structure

- `subtitle:` frontmatter is supported (rendered under the `<h1>` — see `layouts/blog/single.html`). Fill it with a short, specific one-liner, not a restatement of the title.
- Opening paragraph must hook the reader with something concrete (a specific fact, number, claim, or scenario) — never a generic scene-setter like "In today's world..." (see cliché list below).
- At least 3 `##`/`###` sections that each stand on their own (a reader skimming just the headings should understand the post's shape).
- A real conclusion: a closing section that lands on a takeaway, not a paragraph that just trails off or restates the intro. Avoid opening it with the word "Conclusion" verbatim if that reads like a template — a concrete closing heading (e.g. "What This Means for X") works better, though `## Conclusion:` is acceptable if followed by substance, not filler.

## 3. Images

- Hero `image:` frontmatter is required by `archetypes/blog.md` — don't drop it.
- For longer posts (roughly 400+ words / 3+ sections), add at least one inline image in the body: `![alt text](path "optional caption")`. `layouts/_markup/render-image.html` automatically wraps this into a captioned `<figure class="blog-figure">`, so a `Title` (the `"optional caption"` part) is worth including when it adds context.

## 4. Avoid AI-writing "tells"

Generic LLM output has a recognizable fingerprint. Scan the draft for these and rewrite any hits in your own voice:

**Clichéd openers/transitions** — cut or replace:
- "In today's fast-paced world / digital age / rapidly evolving landscape"
- "In conclusion" / "To wrap up" / "At the end of the day"
- "It is important to note that" / "It's worth noting that" / "It goes without saying"
- "Furthermore" / "Moreover" / "Additionally" (used as paragraph openers, stacked one after another)
- "When it comes to X" / "In the realm of X" / "Navigating the complexities of X"
- "One might argue that..." (hedge without committing to a claim)

**Overused vocabulary** — replace with a plainer, more specific word:
- delve → dig into / look at
- leverage → use
- foster → build / grow
- harness → use / tap
- underscore → show / prove
- embark (on a journey) → start
- unlock / unveil / elevate → open up / show / improve (be specific about what changed)
- robust / seamless / comprehensive / pivotal / crucial / multifaceted → say the actual property instead of the vague adjective
- landscape / realm / tapestry / ecosystem (used metaphorically) → name the actual thing
- boast ("the tool boasts...") → has / offers
- game-changer / treasure trove / testament to → say what specifically changed, or cut it

**Structural tells:**
- Symmetric hedging ("Some say X, others say Y, and the truth lies somewhere in between") with no actual opinion. Commit to a claim; a falsifiable, specific statement reads as more human than balanced-sounding mush.
- Uniform sentence length throughout a paragraph (low "burstiness"). Mix short, punchy sentences with longer ones.
- Every paragraph being exactly 3 sentences of exactly similar length — see rhythm note below.
- Listicle-itis: turning every section into a bare bullet list instead of prose that also has bullets where they genuinely help.

## 5. Rhythm

Paragraphs should vary in length — some 1-2 sentences, some 4-5 — not a uniform block of 3-sentence paragraphs from top to bottom. Vary sentence length within paragraphs too: a short declarative sentence next to a longer, more detailed one reads as human; a metronome of same-length sentences reads as machine-generated.

## 6. Run the validator

From the repo root:

```bash
node scripts/validate-blog-post.js content/english/blog/your-post.md
```

This checks (and fails the build for) the stray-`---`, image, and H2-count rules above automatically, and warns (non-fatal) on any cliché phrases it finds. Fix all hard failures. Review warnings with judgment — they flag candidates for a human/agent rewrite, not automatic rejections.
