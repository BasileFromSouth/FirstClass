/**
 * Run Chromatic with CHROMATIC_PROJECT_TOKEN from `.env` (override).
 * Usage: npm run storybook:publish
 * Token: Chromatic → Project → Manage → Configure → Project token (chpt_...)
 */
const path = require('path');
const { spawnSync } = require('child_process');

require('dotenv').config({
  path: path.resolve(__dirname, '..', '.env'),
  override: true,
});

if (!process.env.CHROMATIC_PROJECT_TOKEN?.trim()) {
  console.error(
    'Missing CHROMATIC_PROJECT_TOKEN. Add it to .env (see .env.example) or run:\n' +
      '  npx chromatic --project-token=chpt_... --exit-zero-on-changes --force-rebuild',
  );
  process.exit(1);
}

const cwd = path.resolve(__dirname, '..');
const chromaticCli = path.join(
  cwd,
  'node_modules',
  'chromatic',
  'dist',
  'bin.js',
);

const args = [
  '--exit-zero-on-changes',
  '--force-rebuild',
  ...process.argv.slice(2),
];
const result = spawnSync(process.execPath, [chromaticCli, ...args], {
  cwd,
  stdio: 'inherit',
  env: process.env,
});

process.exit(result.status === null ? 1 : result.status);
