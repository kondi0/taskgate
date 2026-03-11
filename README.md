# TaskGate 🚀

A structured AI-assisted task workflow system with approval gates.

**Plan complex tasks with AI, then execute them step-by-step with verification and human approval between each change.**

## Why TaskGate?

Working with AI coding assistants on complex tasks can be chaotic. TaskGate brings structure:

- **Two-phase workflow** - Separate planning from execution
- **Atomic tasks** - Small, focused changes (~1-3 minutes each)
- **Verification gates** - Build/lint/test after every change
- **Human approval** - You control when to proceed, pause, redo, or stop
- **Full audit trail** - Complete documentation of what was done and why

## Installation

```bash
# Install globally
npm install -g taskgate

# Or as a dev dependency
npm install --save-dev taskgate
```

## Quick Setup

Run the init command in your project root:

```bash
npx taskgate init
```

This creates:
- `.github/skills/` - AI skill definitions
- `docs/templates/` - Task document templates
- `docs/tasks/` - Where your task documents live
- `docs/ATOMIC-TASK-WORKFLOW.md` - Core workflow reference

## Usage

### 1. Planning Phase

Start by telling your AI assistant to create a task:

```
create task: Refactor the authentication module to use JWT tokens
```

The AI will:
1. Run an intake Q&A to understand requirements
2. Analyze your codebase for context
3. Create a detailed plan with atomic tasks
4. Refine the plan based on your feedback
5. Hand off with: "To execute, use: `execute task: AUTH-JWT-REFACTOR`"

### 2. Execution Phase

When ready to implement:

```
execute task: AUTH-JWT-REFACTOR
```

The AI will:
1. Read the plan and find the next task
2. Execute ONE atomic task
3. Verify the change (build, lint, tests)
4. Report what was done
5. **Wait for your approval**

You respond with:
- **`continue`** - Proceed to next task
- **`wait`** - Pause while you review
- **`redo`** - Try again with adjustments
- **`stop`** - End execution

## The Workflow

```
create task: [description]
         ↓
    [Planning]
         ↓
    Plan approved
         ↓
execute task: [TASK-NAME]
         ↓
    [Execute atomic task → Verify → Update docs → Get approval]
         ↓
    continue/wait/redo/stop
         ↓
    [Repeat until done]
```

## Folder Structure After Init

```
your-project/
├── .github/
│   └── skills/
│       ├── new-task/
│       │   └── SKILL.md
│       └── execute-task/
│           └── SKILL.md
├── docs/
│   ├── templates/
│   │   ├── TASK-INTAKE-TEMPLATE.md
│   │   ├── TASK-PLAN-TEMPLATE.md
│   │   └── TASK-SESSION-TEMPLATE.md
│   ├── tasks/
│   │   └── .gitkeep
│   └── ATOMIC-TASK-WORKFLOW.md
```

## IDE Integration

### GitHub Copilot (VS Code / JetBrains)

Add to your `.github/copilot-instructions.md`:

```markdown
## Task Workflow Skills

This project uses TaskGate for structured AI-assisted task execution.

<skills>
  <skill>
    <name>new-task</name>
    <description>Use for planning complex tasks. Trigger with "create task:" command.</description>
    <file>.github/skills/new-task/SKILL.md</file>
  </skill>
  <skill>
    <name>execute-task</name>
    <description>Use to execute approved task plans. Trigger with "execute task:" command.</description>
    <file>.github/skills/execute-task/SKILL.md</file>
  </skill>
</skills>
```

### Cursor

Skills are automatically detected from `.github/skills/`.

### Claude (via CLAUDE.md or system prompt)

Reference the skill files in your project instructions.

## Commands

| Command | Description |
|---------|-------------|
| `create task: [description]` | Start planning a new task |
| `execute task: [TASK-NAME]` | Execute an approved plan |
| `resume task: [TASK-NAME]` | Resume interrupted planning |
| `continue` | Proceed to next atomic task |
| `wait` | Pause for manual review |
| `redo` | Retry last task with changes |
| `stop` | End execution session |

## Documentation

- [Atomic Task Workflow](docs/ATOMIC-TASK-WORKFLOW.md) - Core workflow reference
- [Workflow Overview](docs/WORKFLOW-OVERVIEW.md) - Quick summary

## Why "TaskGate"?

**Task** = Structured work broken into atomic pieces
**Gate** = Human approval checkpoints between each step

You stay in control. The AI does the heavy lifting. Every change is verified and approved.

## Contributing

Contributions welcome! Please read our contributing guidelines first.

## License

MIT © Konrad Czerwinski

