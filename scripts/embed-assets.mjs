import { readFileSync, readdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const assets = {};
function visit(directory, prefix = '') {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'server' || entry.name === '.openai') continue;
    const path = join(directory, entry.name);
    const url = `${prefix}/${entry.name}`;
    if (entry.isDirectory()) visit(path, url);
    else if (entry.isFile()) {
      const ext = entry.name.split('.').at(-1);
      const contentType = ext === 'html' ? 'text/html; charset=utf-8' : ext === 'js' ? 'text/javascript; charset=utf-8' : ext === 'css' ? 'text/css; charset=utf-8' : 'application/octet-stream';
      assets[url] = { contentType, body: readFileSync(path, 'utf8') };
    }
  }
}
visit('dist');
writeFileSync('src/embedded-assets.ts', `export const embeddedAssets: Record<string, { contentType: string; body: string }> = ${JSON.stringify(assets)};\n`);
