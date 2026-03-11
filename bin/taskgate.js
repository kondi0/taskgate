#!/usr/bin/env node

const { init } = require('../lib/init');

const args = process.argv.slice(2);
const command = args[0];

const HELP_TEXT = `
TaskGate - Structured AI-assisted task workflow system

Usage:
  taskgate <command> [options]

Commands:
  init          Initialize TaskGate in current project
  init --force  Overwrite existing files
  help          Show this help message
  version       Show version number

Examples:
  npx taskgate init
  npx taskgate init --force

Documentation:
  https://github.com/user/taskgate
`;

async function main() {
  switch (command) {
    case 'init':
      const force = args.includes('--force') || args.includes('-f');
      await init({ force });
      break;

    case 'version':
    case '-v':
    case '--version':
      const pkg = require('../package.json');
      console.log(`taskgate v${pkg.version}`);
      break;

    case 'help':
    case '-h':
    case '--help':
    case undefined:
      console.log(HELP_TEXT);
      break;

    default:
      console.error(`Unknown command: ${command}`);
      console.log(HELP_TEXT);
      process.exit(1);
  }
}

main().catch((err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

