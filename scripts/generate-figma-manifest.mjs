import { mkdir, readdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const repoRoot = path.resolve(__dirname, '..');
const figmaRoot = path.join(repoRoot, 'public', 'figma');
const outputDir = path.join(repoRoot, 'src', 'data', 'generated');
const outputFile = path.join(outputDir, 'figmaManifest.js');
const allowedExts = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif']);

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

async function collectFiles(dirPath, relPrefix = '') {
  const entries = await readdir(dirPath, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absPath = path.join(dirPath, entry.name);
    const relPath = path.posix.join(relPrefix, entry.name);

    if (entry.isDirectory()) {
      files.push(...await collectFiles(absPath, relPath));
      continue;
    }

    if (allowedExts.has(path.extname(entry.name).toLowerCase())) {
      files.push(relPath);
    }
  }

  return files.sort(naturalSort);
}

async function buildManifest() {
  const manifest = {};

  try {
    const entries = await readdir(figmaRoot, { withFileTypes: true });

    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const dirName = entry.name; // becomes the project key (e.g. lucent, roadrunner_connect)
      const dirPath = path.join(figmaRoot, dirName);

      // One level of nested subdirectories becomes image groups. If a project
      // folder contains any subfolders (e.g. mobile/ + desktop/), the entry is
      // an object keyed by group name; otherwise it stays a flat array. (If a
      // folder mixes subfolders and loose files, the subfolders win as groups
      // and loose top-level files are ignored.)
      const subEntries = await readdir(dirPath, { withFileTypes: true });
      const subDirs = subEntries
        .filter((e) => e.isDirectory())
        .sort((a, b) => naturalSort(a.name, b.name));

      if (subDirs.length > 0) {
        const groups = {};
        for (const sub of subDirs) {
          const files = await collectFiles(path.join(dirPath, sub.name), path.posix.join(dirName, sub.name));
          groups[sub.name] = files.map((file) => `figma/${file}`);
        }
        manifest[dirName] = groups;
      } else {
        const files = await collectFiles(dirPath, dirName);
        manifest[dirName] = files.map((file) => `figma/${file}`);
      }
    }
  } catch {
    // Keep the generated module valid even if the folder doesn't exist yet.
  }

  const source = `export const figmaImageManifest = ${JSON.stringify(manifest, null, 2)};\n`;
  await mkdir(outputDir, { recursive: true });
  await writeFile(outputFile, source, 'utf8');
}

await buildManifest();
