/**
 * Run `npm publish` with FIGMA_NPM_TOKEN from `.env` (override), so project
 * `.npmrc` can use ${_authToken} without committing the Figma npm API key.
 */
const path = require('path');
const { spawnSync } = require('child_process');

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
  override: true,
});

if (!process.env.FIGMA_NPM_TOKEN || !String(process.env.FIGMA_NPM_TOKEN).trim()) {
  console.error(
    'Missing FIGMA_NPM_TOKEN. Add it to .env (see .env.example) or export it, then retry.',
  );
  process.exit(1);
}

const cwd = path.resolve(__dirname, '..');
const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const result = spawnSync(npm, ['publish'], {
  cwd,
  stdio: 'inherit',
  env: process.env,
  shell: process.platform === 'win32',
});

process.exit(result.status === null ? 1 : result.status);
