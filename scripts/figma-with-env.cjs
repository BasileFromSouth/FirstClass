/**
 * Load `.env` with override so FIGMA_ACCESS_TOKEN from the project wins over
 * a stale token in the shell or Windows user environment (default dotenv behavior).
 */
const path = require('path');
const { spawnSync } = require('child_process');

require('dotenv').config({
  path: path.resolve(process.cwd(), '.env'),
  override: true,
});

const cli = path.join(
  __dirname,
  '..',
  'node_modules',
  '@figma',
  'code-connect',
  'dist',
  'cli.js',
);

const args = process.argv.slice(2);
const result = spawnSync(process.execPath, [cli, ...args], {
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
