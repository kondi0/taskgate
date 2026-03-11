# TaskGate Quick Start Guide

## Installation

### Option 1: Global Installation (Recommended)
```bash
npm install -g taskgate
```

### Option 2: Project Dependency
```bash
npm install --save-dev taskgate
```

### Option 3: Use with npx (No Installation)
```bash
npx taskgate init
```

## Setup in Your Project

1. **Initialize TaskGate:**
   ```bash
   cd your-project
   taskgate init
   ```

2. **Configure your AI assistant:**

   Add this to `.github/copilot-instructions.md` (for GitHub Copilot):
   ```markdown
   ## Task Workflow Skills

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

   For other AI assistants, see `snippets/copilot-instructions-snippet.md`.

## Basic Usage

### 1. Plan a Task (with AI)

In your AI assistant chat:
```
create task: Refactor the authentication module to use JWT tokens
```

The AI will:
- Ask clarifying questions
- Analyze your codebase
- Create a detailed plan with atomic tasks
- Get your approval
- Hand off with execution instructions

### 2. Execute the Plan (with AI)

When ready to implement:
```
execute task: AUTH-JWT-REFACTOR
```

The AI will:
- Execute ONE atomic task (1-3 minutes of work)
- Verify the change
- Report what was done
- **Wait for your approval**

### 3. Control Execution

After each task, respond with:
- `continue` - Move to next task
- `wait` - Pause for review
- `redo` - Retry with adjustments
- `stop` - End execution

## Example Workflow

```
You: create task: Add dark mode support to the dashboard

AI: [Runs intake Q&A, creates plan]

You: approve plan

AI: ✅ Planning complete. To execute: execute task: DARK-MODE-DASHBOARD

You: execute task: DARK-MODE-DASHBOARD

AI: [Executes first atomic task]
    Task 1.1: Create theme context with light/dark modes
    Files changed: src/contexts/ThemeContext.tsx
    Verification: ✅ TypeScript compilation passed
    
    What was done: Created a new theme context...
    Next task: 1.2 Add theme toggle button component
    
    continue/wait/redo/stop?

You: continue

AI: [Executes next task...]
```

## Directory Structure After Init

```
your-project/
├── .github/
│   └── skills/                    # AI skill definitions
│       ├── new-task/SKILL.md
│       └── execute-task/SKILL.md
├── docs/
│   ├── templates/                 # Task document templates
│   │   ├── TASK-INTAKE-TEMPLATE.md
│   │   ├── TASK-PLAN-TEMPLATE.md
│   │   └── TASK-SESSION-TEMPLATE.md
│   ├── tasks/                     # Your task documents go here
│   │   └── [TASK-NAME]/
│   │       ├── [TASK-NAME]-INTAKE.md
│   │       ├── [TASK-NAME]-PLAN.md
│   │       └── [TASK-NAME]-SESSION.md
│   └── ATOMIC-TASK-WORKFLOW.md # Workflow reference
```

## Tips

1. **Keep tasks atomic** - 1-3 minutes per task works best
2. **Review after each task** - The approval gate is your control point
3. **Plans are self-contained** - Anyone can execute them later
4. **Session logs are your audit trail** - Complete history of what changed
5. **Use `wait` liberally** - Take time to review important changes

## Commands Reference

| Command | Description |
|---------|-------------|
| `create task: [description]` | Start planning a new task |
| `ready to plan` | Move from intake to planning phase |
| `approve plan` | Approve plan and prepare for execution |
| `execute task: [TASK-NAME]` | Start or resume execution |
| `continue` | Proceed to next atomic task |
| `wait` | Pause for manual review |
| `redo` | Retry last task with adjustments |
| `stop` | End execution session |
| `resume task: [TASK-NAME]` | Resume interrupted planning or execution |

## Getting Help

- **Core workflow**: `docs/ATOMIC-TASK-WORKFLOW.md`
- **Quick overview**: `docs/WORKFLOW-OVERVIEW.md`
- **Full docs**: [README.md](README.md)
- **Issues**: [GitHub Issues](https://github.com/user/taskgate/issues)

## Troubleshooting

**Q: The AI isn't recognizing my task commands**
A: Make sure you've added the skills to your AI assistant configuration (see Setup step 2)

**Q: How do I resume a task after closing my editor?**
A: Use `resume task: [TASK-NAME]` or `execute task: [TASK-NAME]`

**Q: Can I skip a task?**
A: Yes, during execution you can ask the AI to skip to the next task

**Q: How do I update TaskGate files after upgrading?**
A: Run `taskgate init --force` to overwrite with the latest templates

---

**Ready to start?** Run `taskgate init` in your project! 🚀

