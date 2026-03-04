import * as clack from '@clack/prompts';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, '..');

// ─── AI Providers ────────────────────────────────────────────────────────────

const AI_PROVIDERS = {
  Claude: ['Haiku 3.5', 'Sonnet 4', 'Sonnet 4.6/Extended', 'Opus 4'],
  Gemini: ['Flash 2.0', 'Flash 2.5', 'Pro 2.0', 'Pro 2.5'],
  OpenAI: ['GPT-4o mini', 'GPT-4o', 'o3', 'o4-mini', 'o4']
};

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Wrap a value in YAML single quotes, escaping any internal single quotes. */
function yamlQuote(value) {
  return `'${String(value).replace(/'/g, "''")}'`;
}

/** Return true if the string is a valid URL-friendly slug. */
function isSlugified(text) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(text);
}

/** Produce a human-readable explanation of why a string is not slugified. */
function slugErrorMessage(text) {
  const issues = [];

  if (/[A-Z]/.test(text)) {
    issues.push('contains uppercase letters — use lowercase only');
  }
  if (/\s/.test(text)) {
    issues.push('contains spaces — use hyphens instead (e.g. "my-post")');
  }
  const badChars = [...new Set(text.match(/[^a-z0-9-]/g) ?? [])];
  if (badChars.length) {
    issues.push(`contains invalid characters: ${badChars.map((c) => JSON.stringify(c)).join(', ')}`);
  }
  if (/^-/.test(text)) issues.push('starts with a hyphen');
  if (/-$/.test(text)) issues.push('ends with a hyphen');
  if (/--/.test(text)) issues.push('contains consecutive hyphens');
  if (!text.length) issues.push('cannot be empty');

  return issues.length ? `Not URL-friendly:\n  • ${issues.join('\n  • ')}` : 'Invalid slug.';
}

/** Return today as YYMMDD — e.g. "260304" for March 4, 2026. */
function getDatePrefix() {
  const now = new Date();
  const yy = String(now.getFullYear()).slice(2);
  const mm = String(now.getMonth() + 1).padStart(2, '0');
  const dd = String(now.getDate()).padStart(2, '0');
  return `${yy}${mm}${dd}`;
}

/** Format a Date as "March 4, 2026". */
function formatPublishDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// ─── Post type flows ──────────────────────────────────────────────────────────

async function createProsePost({ postName, aiProvider, aiAgent, message }) {
  const datePrefix = getDatePrefix();
  const slug = `${datePrefix}-${postName}`;
  const imageName = `${slug}.jpg`;
  const fileName = `${slug}.md`;

  // 1. Copy hero image
  const heroSrc = path.join(rootDir, 'src', 'assets', 'images', 'hero.jpg');
  const imageDest = path.join(rootDir, 'src', 'assets', 'images', 'prose', imageName);
  fs.copyFileSync(heroSrc, imageDest);

  // 2. Build frontmatter values
  const publishDate = formatPublishDate(new Date());
  const title = message?.trim() || 'title';
  const imagePath = `../../assets/images/prose/${slug}.jpg`;

  // 3. Render markdown
  const needsQuotedTag = (v) => /[:#'"\[\]{},|>&*!%@`]/.test(v) || /^\s|\s$/.test(v);
  const tagLine = (v) => `  - ${needsQuotedTag(v) ? yamlQuote(v) : v}`;

  const content = [
    '---',
    `title: ${yamlQuote(title)}`,
    `publishDate: ${yamlQuote(publishDate)}`,
    'tags:',
    tagLine(aiProvider),
    tagLine(aiAgent),
    `ai: ${aiProvider}`,
    `agent: ${yamlQuote(aiAgent)}`,
    'seo:',
    `  title: ${yamlQuote(title)}`,
    '  image:',
    `    src: ${yamlQuote(imagePath)}`,
    `    alt: ''`,
    '---',
    '',
    `![](${imagePath})`,
    ''
  ].join('\n');

  // 4. Write file
  const filePath = path.join(rootDir, 'src', 'content', 'prose', fileName);
  fs.writeFileSync(filePath, content, 'utf8');

  return { slug, filePath, imageDest };
}

// ─── Flow dispatcher ─────────────────────────────────────────────────────────

const TYPE_FLOWS = {
  prose: createProsePost
};

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  clack.intro('✦  Create a new post');

  // Post type
  const type = await clack.select({
    message: 'Post type',
    options: [{ value: 'prose', label: 'Prose' }]
  });
  if (clack.isCancel(type)) {
    clack.cancel('Cancelled.');
    process.exit(0);
  }

  // Post name (must be slugified)
  const postName = await clack.text({
    message: 'Post name  (url-friendly slug, e.g. "my-new-post")',
    placeholder: 'my-new-post',
    validate(value) {
      if (!value?.trim()) return 'Post name is required.';
      if (!isSlugified(value.trim())) return slugErrorMessage(value.trim());
    }
  });
  if (clack.isCancel(postName)) {
    clack.cancel('Cancelled.');
    process.exit(0);
  }

  // AI Provider
  const aiProvider = await clack.select({
    message: 'AI provider',
    options: Object.keys(AI_PROVIDERS).map((name) => ({ value: name, label: name }))
  });
  if (clack.isCancel(aiProvider)) {
    clack.cancel('Cancelled.');
    process.exit(0);
  }

  // AI Agent (depends on provider)
  const aiAgent = await clack.select({
    message: 'AI agent',
    options: AI_PROVIDERS[aiProvider].map((name) => ({ value: name, label: name }))
  });
  if (clack.isCancel(aiAgent)) {
    clack.cancel('Cancelled.');
    process.exit(0);
  }

  // Message / title (optional)
  const message = await clack.text({
    message: 'Post title / message  (optional — leave blank for default)',
    placeholder: 'Leave empty to use default…'
  });
  if (clack.isCancel(message)) {
    clack.cancel('Cancelled.');
    process.exit(0);
  }

  // Run the appropriate flow
  const flow = TYPE_FLOWS[type];
  const spinner = clack.spinner();
  spinner.start('Creating post…');

  try {
    const result = await flow({
      postName: postName.trim(),
      aiProvider,
      aiAgent,
      message
    });

    spinner.stop('Done.');
    clack.note([`Markdown : ${path.relative(rootDir, result.filePath)}`, `Image    : ${path.relative(rootDir, result.imageDest)}`].join('\n'), 'Files created');
  } catch (err) {
    spinner.stop('Failed.');
    clack.cancel(`Error: ${err.message}`);
    process.exit(1);
  }

  clack.outro('Happy writing! ✦');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
