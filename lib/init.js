const fs = require('fs');
const path = require('path');

const DIRS_TO_CREATE = [
  '.github/skills/new-task',
  '.github/skills/execute-task',
  'docs/templates',
  'docs/tasks',
];

const FILES_TO_COPY = [
  { src: 'skills/new-task/SKILL.md', dest: '.github/skills/new-task/SKILL.md' },
  { src: 'skills/execute-task/SKILL.md', dest: '.github/skills/execute-task/SKILL.md' },
  { src: 'templates/TASK-INTAKE-TEMPLATE.md', dest: 'docs/templates/TASK-INTAKE-TEMPLATE.md' },
  { src: 'templates/TASK-PLAN-TEMPLATE.md', dest: 'docs/templates/TASK-PLAN-TEMPLATE.md' },
  { src: 'templates/TASK-SESSION-TEMPLATE.md', dest: 'docs/templates/TASK-SESSION-TEMPLATE.md' },
  { src: 'docs/ATOMIC-TASK-WORKFLOW.md', dest: 'docs/ATOMIC-TASK-WORKFLOW.md' },
  { src: 'docs/WORKFLOW-OVERVIEW.md', dest: 'docs/WORKFLOW-OVERVIEW.md' },
];

async function init(options = {}) {
  const { force = false } = options;
  const cwd = process.cwd();
  const packageRoot = path.join(__dirname, '..');

  console.log('🚀 Initializing TaskGate...\n');

  // Create directories
  for (const dir of DIRS_TO_CREATE) {
    const fullPath = path.join(cwd, dir);
    if (!fs.existsSync(fullPath)) {
      fs.mkdirSync(fullPath, { recursive: true });
      console.log(`📁 Created: ${dir}/`);
    }
  }

  // Create .gitkeep in docs/tasks
  const gitkeepPath = path.join(cwd, 'docs/tasks/.gitkeep');
  if (!fs.existsSync(gitkeepPath)) {
    fs.writeFileSync(gitkeepPath, '');
    console.log('📄 Created: docs/tasks/.gitkeep');
  }

  // Copy files
  let filesCreated = 0;
  let filesSkipped = 0;

  for (const file of FILES_TO_COPY) {
    const srcPath = path.join(packageRoot, file.src);
    const destPath = path.join(cwd, file.dest);

    if (fs.existsSync(destPath) && !force) {
      console.log(`⏭️  Skipped (exists): ${file.dest}`);
      filesSkipped++;
      continue;
    }

    const content = fs.readFileSync(srcPath, 'utf-8');
    fs.writeFileSync(destPath, content);
    console.log(`✅ Created: ${file.dest}`);
    filesCreated++;
  }

  console.log(`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✨ TaskGate initialized successfully!

Files created: ${filesCreated}
Files skipped: ${filesSkipped}${filesSkipped > 0 ? ' (use --force to overwrite)' : ''}

Next steps:
1. Add the skills to your AI assistant config (see README)
2. Start planning with: create task: [your task description]
3. Execute with: execute task: [TASK-NAME]

Documentation: docs/ATOMIC-TASK-WORKFLOW.md
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);
}

module.exports = { init };

