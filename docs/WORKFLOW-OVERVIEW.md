# TaskGate Workflow Overview

## The Two-Phase Approach

TaskGate splits complex AI-assisted work into two distinct phases:

### Phase 1: Planning (`create task:`)

```
create task: [description]
         ↓
    [Intake Q&A]
         ↓
    [Create plan with atomic tasks]
         ↓
    [Refine plan with user]
         ↓
    Plan approved → Hand off
```

**Output:** Self-contained plan document ready for any agent to execute.

### Phase 2: Execution (`execute task:`)

```
execute task: [TASK-NAME]
         ↓
    [Read plan, find next task]
         ↓
    [Execute ONE atomic task]
         ↓
    [Verify change]
         ↓
    [Update documentation]
         ↓
    [Report and wait for approval]
         ↓
    continue/wait/redo/stop
         ↓
    [Repeat until done]
```

**Output:** Implemented code with complete audit trail.

---

## Why This Works

| Problem | Solution |
|---------|----------|
| AI makes too many changes at once | Atomic tasks (1-3 min each) |
| Hard to track what changed | Session logs after every task |
| AI goes in wrong direction | Approval gates between steps |
| Can't resume after interruption | Progress saved in documents |
| Plans get lost in chat | Self-contained plan files |

---

## Commands

| Command | Phase | Description |
|---------|-------|-------------|
| `create task: [desc]` | Planning | Start planning a new task |
| `ready to plan` | Planning | Move from intake to planning |
| `approve plan` | Planning | Approve plan and end planning |
| `execute task: [name]` | Execution | Start or resume execution |
| `continue` | Execution | Proceed to next task |
| `wait` | Execution | Pause for review |
| `redo` | Execution | Retry last task |
| `stop` | Execution | End execution |
| `resume task: [name]` | Either | Resume interrupted work |

---

## Bottom Line

- **Use `create task:` when you want to plan work**
- **Use `execute task:` when you're ready to implement**
- **Plans are self-contained** – Anyone can execute them
- **Atomic execution with approval gates** – Small changes, verified and approved step-by-step

