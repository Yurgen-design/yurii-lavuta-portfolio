import fs from 'node:fs/promises';
import path from 'node:path';

const projectRoot = process.cwd();
const outDir = path.join(projectRoot, 'assets', 'fonts');

async function ensureDir(dir) {
  await fs.mkdir(dir, { recursive: true });
}

async function copyFile(src, dest) {
  await fs.copyFile(src, dest);
}

async function findFirstMatch(dir, predicate) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      const nested = await findFirstMatch(full, predicate);
      if (nested) return nested;
    } else if (predicate(entry.name)) {
      return full;
    }
  }
  return null;
}

async function copyInter() {
  const base = path.join(projectRoot, 'node_modules', '@fontsource', 'inter', 'files');
  const weights = [300, 400, 500, 600, 700, 800, 900];

  for (const w of weights) {
    const match = await findFirstMatch(base, (name) => name.includes(`latin-${w}-normal`) && name.endsWith('.woff2'))
      || await findFirstMatch(base, (name) => name.includes(`${w}-normal`) && name.endsWith('.woff2'));

    if (!match) {
      throw new Error(`Could not find Inter woff2 for weight ${w} in ${base}`);
    }

    await copyFile(match, path.join(outDir, `Inter-${w}.woff2`));
  }
}

async function copyMaterialIcons() {
  const base = path.join(projectRoot, 'node_modules', '@fontsource', 'material-icons', 'files');
  const match = await findFirstMatch(base, (name) => name.endsWith('.woff2'));
  if (!match) throw new Error(`Could not find Material Icons woff2 in ${base}`);
  await copyFile(match, path.join(outDir, 'MaterialIcons-Regular.woff2'));
}

async function copyMaterialSymbolsOutlined() {
  const base = path.join(projectRoot, 'node_modules', '@fontsource', 'material-symbols-outlined', 'files');
  const match = await findFirstMatch(base, (name) => name.endsWith('.woff2'));
  if (!match) throw new Error(`Could not find Material Symbols Outlined woff2 in ${base}`);
  await copyFile(match, path.join(outDir, 'MaterialSymbolsOutlined.woff2'));
}

await ensureDir(outDir);
await copyInter();
await copyMaterialIcons();
await copyMaterialSymbolsOutlined();

console.log(`Fonts copied to ${outDir}`);
