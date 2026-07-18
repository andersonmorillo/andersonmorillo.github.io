// Lightweight pre-publish validator for blog posts (content/*/blog/*.md).
// Usage: node scripts/validate-blog-post.js <path-to-markdown-file>
// See .agents/skills/blog-quality-check/SKILL.md for the full checklist this enforces.

const fs = require("fs");
const path = require("path");

// AI-writing "tells" identified from 2026 research on AI-detector vocabulary
// and generic ChatGPT-style phrasing (see blog-quality-check skill for sources/rationale).
const CLICHE_PHRASES = [
  "in today's fast-paced world",
  "in today's digital age",
  "in today's rapidly evolving",
  "in the realm of",
  "navigating the complexities of",
  "when it comes to",
  "it is important to note",
  "it's worth noting",
  "it goes without saying",
  "at the end of the day",
  "in conclusion",
  "to wrap up",
  "one might argue that",
  "furthermore",
  "moreover",
  "additionally",
  "delve into",
  "leverage",
  "foster",
  "harness the power",
  "underscore",
  "embark on a journey",
  "unlock the potential",
  "unveil",
  "elevate your",
  "robust solution",
  "seamless integration",
  "comprehensive",
  "pivotal role",
  "crucial",
  "multifaceted",
  "rich tapestry",
  "treasure trove",
  "a testament to",
  "game-changer",
  "game changer",
  "cutting-edge",
  "revolutionize",
];

function parseFrontmatterAndBody(raw) {
  const lines = raw.split(/\r?\n/);

  if (lines[0] !== "---") {
    return { frontmatter: null, body: raw, bodyStartLine: 1 };
  }

  let closingIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === "---") {
      closingIndex = i;
      break;
    }
  }

  if (closingIndex === -1) {
    return { frontmatter: null, body: raw, bodyStartLine: 1 };
  }

  const frontmatter = lines.slice(1, closingIndex).join("\n");
  const bodyLines = lines.slice(closingIndex + 1);
  return {
    frontmatter,
    body: bodyLines.join("\n"),
    bodyStartLine: closingIndex + 2,
  };
}

function getFrontmatterField(frontmatter, key) {
  const regex = new RegExp(`^${key}\\s*:\\s*(.*)$`, "m");
  const match = frontmatter.match(regex);
  if (!match) return null;
  return match[1].trim().replace(/^["']|["']$/g, "");
}

function checkStrayThematicBreaks(body, bodyStartLine) {
  const bodyLines = body.split(/\r?\n/);
  const hits = [];
  bodyLines.forEach((line, idx) => {
    if (/^\s*-{3,}\s*$/.test(line)) {
      hits.push(bodyStartLine + idx);
    }
  });
  return hits;
}

function checkHasImage(frontmatter, body) {
  const imageField = frontmatter ? getFrontmatterField(frontmatter, "image") : null;
  if (imageField) return true;
  return /!\[[^\]]*\]\([^)]+\)/.test(body);
}

function countH2Headings(body) {
  const matches = body.match(/^##(?!#)\s+.+$/gm);
  return matches ? matches.length : 0;
}

function checkClichePhrases(body, bodyStartLine) {
  const bodyLines = body.split(/\r?\n/);
  const found = [];
  CLICHE_PHRASES.forEach((phrase) => {
    const lowerPhrase = phrase.toLowerCase();
    bodyLines.forEach((line, idx) => {
      if (line.toLowerCase().includes(lowerPhrase)) {
        found.push({ phrase, line: bodyStartLine + idx });
      }
    });
  });
  return found;
}

function validate(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const { frontmatter, body, bodyStartLine } = parseFrontmatterAndBody(raw);

  const failures = [];
  const warnings = [];

  const strayBreaks = checkStrayThematicBreaks(body, bodyStartLine);
  if (strayBreaks.length > 0) {
    failures.push(
      `Found ${strayBreaks.length} stray "---" thematic break(s) in the article body at line(s): ${strayBreaks.join(", ")}. Only the two frontmatter delimiters may use "---".`,
    );
  }

  if (!checkHasImage(frontmatter, body)) {
    failures.push(
      'No image found: frontmatter "image:" is empty/missing and no inline "![...](...)" Markdown image exists in the body.',
    );
  }

  const h2Count = countH2Headings(body);
  if (h2Count < 2) {
    failures.push(
      `Only ${h2Count} H2 ("## ") heading(s) found in the body; at least 2 are required for structure.`,
    );
  }

  const clicheHits = checkClichePhrases(body, bodyStartLine);
  if (clicheHits.length > 0) {
    const grouped = clicheHits
      .map((hit) => `  - "${hit.phrase}" (line ${hit.line})`)
      .join("\n");
    warnings.push(
      `Found ${clicheHits.length} possible AI-cliché phrase hit(s):\n${grouped}`,
    );
  }

  return { failures, warnings, h2Count, strayBreaksCount: strayBreaks.length };
}

function main() {
  const targetPath = process.argv[2];
  if (!targetPath) {
    console.error("Usage: node scripts/validate-blog-post.js <path-to-markdown-file>");
    process.exit(1);
  }

  const filePath = path.resolve(process.cwd(), targetPath);
  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`);
    process.exit(1);
  }

  const { failures, warnings } = validate(filePath);

  console.log(`\nValidating ${path.relative(process.cwd(), filePath)}`);

  if (failures.length === 0) {
    console.log("PASS: all hard requirements met.");
  } else {
    console.log(`FAIL: ${failures.length} hard requirement(s) not met:`);
    failures.forEach((failure) => console.log(`  - ${failure}`));
  }

  if (warnings.length > 0) {
    console.log(`\nWARN: ${warnings.length} warning(s) (require human judgment, do not fail the check):`);
    warnings.forEach((warning) => console.log(`  - ${warning}`));
  }

  console.log("");
  process.exit(failures.length > 0 ? 1 : 0);
}

if (require.main === module) {
  main();
}

module.exports = { validate };
