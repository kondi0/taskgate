# TaskGate Integration Snippet

Add this to your `.github/copilot-instructions.md` or equivalent AI assistant configuration:

---

## Task Workflow Skills

This project uses [TaskGate](https://github.com/user/taskgate) for structured AI-assisted task execution.

- **Planning:** Use `create task: [description]` to plan complex work
- **Execution:** Use `execute task: [TASK-NAME]` to implement approved plans

<skills>
  <skill>
    <name>new-task</name>
    <description>Use for planning complex tasks. Runs intake Q&A, creates plans with atomic tasks, and hands off for execution. Trigger with "create task:" command.</description>
    <file>.github/skills/new-task/SKILL.md</file>
  </skill>
  <skill>
    <name>execute-task</name>
    <description>Use to execute approved task plans. Executes one atomic task at a time with verification and approval gates. Trigger with "execute task:" command.</description>
    <file>.github/skills/execute-task/SKILL.md</file>
  </skill>
</skills>

### Task Workflow Commands

| Command | Description |
|---------|-------------|
| `create task: [description]` | Start planning a new task |
| `execute task: [TASK-NAME]` | Execute an approved plan |
| `continue` | Proceed to next atomic task |
| `wait` | Pause execution for review |
| `redo` | Retry last task with changes |
| `stop` | End execution session |

