import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { parse as yamlLoad } from 'https://deno.land/std@0.208.0/yaml/mod.ts';

const manifestFile = "manifest.yml"

function parseFrontmatter(content: string): { frontmatter: any; body: string } {
  const lines = content.split('\n');

  if (lines[0] !== '---') {
    return { frontmatter: {}, body: content };
  }

  let endIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i] === '---') {
      endIndex = i;
      break;
    }
  }

  if (endIndex === -1) {
    return { frontmatter: {}, body: content };
  }

  const frontmatterContent = lines.slice(1, endIndex).join('\n');
  const body = lines.slice(endIndex + 1).join('\n');

  try {
    const frontmatter = yamlLoad(frontmatterContent);
    return { frontmatter, body };
  } catch {
    return { frontmatter: {}, body: content };
  }
}

interface PageData {
  filepath: string;
  slug: string;
  title: string;
  category: string;
  aliases: string[];
  url: string;
  internalLinks: string[];
  externalLinks: string[];
}

interface StaticFile {
  filepath: string;
  filename: string;
  url: string;
}

interface SiteStructure {
  staticContent: PageData[];
  blogPosts: PageData[];
  reviews: PageData[];
  projects: PageData[];
  questions: PageData[];
  debug: PageData[];
  staticFiles: StaticFile[];
  aliases: {
    alias: string;
    target: string;
    file: string;
  }[];
  generatedAt: string;
}

function getAllMarkdownFiles(dir: string, baseDir: string = dir): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(dir);

    for (const entry of entries) {
      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        if (entry.startsWith('.') || entry === 'node_modules' || entry === '_site') {
          continue;
        }
        files.push(...getAllMarkdownFiles(fullPath, baseDir));
      } else if (stat.isFile() && extname(entry) === '.md') {
        files.push(fullPath.replace(baseDir + '/', ''));
      }
    }
  } catch (error) {
    console.error(`Error reading directory ${dir}:`, error);
  }

  return files;
}

function getAllVtoFiles(baseDir: string): string[] {
  const files: string[] = [];

  try {
    const entries = readdirSync(baseDir);
    for (const entry of entries) {
      if (extname(entry) === '.vto') {
        const stat = statSync(join(baseDir, entry));
        if (stat.isFile()) {
          files.push(entry);
        }
      }
    }
  } catch (error) {
    console.error(`Error reading .vto files from ${baseDir}:`, error);
  }

  return files;
}

function getAllStaticFiles(staticDir: string): string[] {
  const files: string[] = [];

  try {
    if (!statSync(staticDir).isDirectory()) {
      return files;
    }

    const getAllFiles = (dir: string): string[] => {
      const result: string[] = [];
      const entries = readdirSync(dir);

      for (const entry of entries) {
        if (entry === '.DS_Store') continue;

        const fullPath = join(dir, entry);
        const stat = statSync(fullPath);

        if (stat.isDirectory()) {
          result.push(...getAllFiles(fullPath));
        } else if (stat.isFile()) {
          result.push(fullPath);
        }
      }

      return result;
    };

    const staticFiles = getAllFiles(staticDir);

    for (const filePath of staticFiles) {
      const relativePath = filePath.replace(staticDir + '/', '');
      files.push(relativePath);
    }
  } catch (error) {
    console.error(`Error reading static directory ${staticDir}:`, error);
  }

  return files.sort();
}

function loadE2eStructure(yamlPath: string): SiteStructure {
  const yamlContent = readFileSync(yamlPath, 'utf-8');
  return yamlLoad(yamlContent) as SiteStructure;
}

function validateAliases(expected: SiteStructure, baseDir: string): boolean {
  console.log('Validating aliases against frontmatter...');

  let hasErrors = false;
  const allPages = [...expected.staticContent, ...expected.blogPosts, ...expected.reviews,
                    ...expected.projects, ...expected.questions, ...expected.debug];

  for (const page of allPages) {
    if (!page.filepath.endsWith('.md')) continue;

    try {
      const fullPath = join(baseDir, page.filepath);
      const content = readFileSync(fullPath, 'utf-8');
      const { frontmatter } = parseFrontmatter(content);

      const actualAliases = (frontmatter.aliases || []).sort();
      const expectedAliases = (page.aliases || []).sort();

      if (JSON.stringify(actualAliases) !== JSON.stringify(expectedAliases)) {
        console.error(`Alias mismatch in ${page.filepath}:`);
        console.error(`  Expected: ${JSON.stringify(expectedAliases)}`);
        console.error(`  Actual:   ${JSON.stringify(actualAliases)}`);
        hasErrors = true;
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        console.error(`File not found (possibly renamed): ${page.filepath}`);
        console.error(`  This may indicate the file was renamed but not updated in ${manifestFile}`);
      } else {
        console.error(`Error reading ${page.filepath}:`, error);
      }
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('Alias validation passed');
  }

  return !hasErrors;
}

function validatePostSlugs(expected: SiteStructure, baseDir: string): boolean {
  console.log('Validating post slugs against frontmatter...');

  let hasErrors = false;
  const allPages = [...expected.staticContent, ...expected.blogPosts, ...expected.reviews,
                    ...expected.projects, ...expected.questions, ...expected.debug];

  for (const page of allPages) {
    if (!page.filepath.endsWith('.md')) continue;

    try {
      const fullPath = join(baseDir, page.filepath);
      const content = readFileSync(fullPath, 'utf-8');
      const { frontmatter } = parseFrontmatter(content);

      const actualSlug = frontmatter.slug;
      const expectedSlug = page.slug;

      if (actualSlug !== expectedSlug) {
        console.error(`Slug mismatch in ${page.filepath}:`);
        console.error(`  Expected: ${expectedSlug}`);
        console.error(`  Actual:   ${actualSlug}`);
        hasErrors = true;
      }
    } catch (error) {
      if (error instanceof Error && 'code' in error && error.code === 'ENOENT') {
        console.error(`File not found (possibly renamed): ${page.filepath}`);
        console.error(`  This may indicate the file was renamed but not updated in ${manifestFile}`);
      } else {
        console.error(`Error reading ${page.filepath}:`, error);
      }
      hasErrors = true;
    }
  }

  if (!hasErrors) {
    console.log('Post slug validation passed');
  }

  return !hasErrors;
}

function validateFileList(): boolean {
  const baseDir = process.cwd();
  const yamlPath = join(baseDir, manifestFile);

  console.log(`Validating file list against ${manifestFile}...`);

  const expected = loadE2eStructure(yamlPath);

  const actualMarkdownFiles = new Set(getAllMarkdownFiles(baseDir));
  const actualVtoFiles = new Set(getAllVtoFiles(baseDir));
  const actualStaticFiles = new Set(getAllStaticFiles(join(baseDir, 'static')));

  const expectedMarkdownFiles = new Set<string>();
  const expectedVtoFiles = new Set<string>();
  const expectedStaticFiles = new Set<string>();

  [...expected.staticContent, ...expected.blogPosts, ...expected.reviews,
   ...expected.projects, ...expected.questions, ...expected.debug].forEach(page => {
    if (page.filepath.endsWith('.md')) {
      expectedMarkdownFiles.add(page.filepath);
    } else if (page.filepath.endsWith('.vto')) {
      expectedVtoFiles.add(page.filepath);
    }
  });

  expected.staticFiles.forEach(file => {
    expectedStaticFiles.add(file.filepath);
  });

  let hasErrors = false;

  const missingMarkdown = [...expectedMarkdownFiles].filter(f => !actualMarkdownFiles.has(f));
  const extraMarkdown = [...actualMarkdownFiles].filter(f => !expectedMarkdownFiles.has(f) && f !== 'README.md');

  if (missingMarkdown.length > 0) {
    console.error('Missing markdown files in filesystem:');
    missingMarkdown.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  if (extraMarkdown.length > 0) {
    console.error(`Extra markdown files not in ${manifestFile}:`);
    extraMarkdown.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  const missingVto = [...expectedVtoFiles].filter(f => !actualVtoFiles.has(f));
  const extraVto = [...actualVtoFiles].filter(f => !expectedVtoFiles.has(f));

  if (missingVto.length > 0) {
    console.error('Missing .vto files in filesystem:');
    missingVto.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  if (extraVto.length > 0) {
    console.error(`Extra .vto files not in ${manifestFile}:`);
    extraVto.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  const missingStatic = [...expectedStaticFiles].filter(f => !actualStaticFiles.has(f));
  const extraStatic = [...actualStaticFiles].filter(f => !expectedStaticFiles.has(f));

  if (missingStatic.length > 0) {
    console.error('Missing static files in filesystem:');
    missingStatic.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  if (extraStatic.length > 0) {
    console.error(`Extra static files not in ${manifestFile}:`);
    extraStatic.forEach(f => console.error(`  ${f}`));
    hasErrors = true;
  }

  if (!hasErrors) {
    console.log('File list validation passed');
    console.log(`${actualMarkdownFiles.size} markdown files match`);
    console.log(`${actualVtoFiles.size} .vto files match`);
    console.log(`${actualStaticFiles.size} static files match`);
  } else {
    console.log('File list validation failed');
  }

  return !hasErrors;
}

if (import.meta.main) {
  const baseDir = process.cwd();
  const yamlPath = join(baseDir, manifestFile);
  const expected = loadE2eStructure(yamlPath);

  const fileSuccess = validateFileList();
  const aliasSuccess = validateAliases(expected, baseDir);
  const slugSuccess = validatePostSlugs(expected, baseDir);

  const success = fileSuccess && aliasSuccess && slugSuccess;
  Deno.exit(success ? 0 : 1);
}

export { validateFileList };