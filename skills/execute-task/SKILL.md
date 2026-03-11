---
name: execute-task
description: Execute an approved task plan by following the Atomic Task Workflow. Reads the plan document and executes atomic tasks one by one with approval gates between each step.
---

> **Process Reference:** This skill follows the execution phase of `docs/ATOMIC-TASK-WORKFLOW.md`. It is designed to work with plans created by the `new-task` skill.

To execute an approved task plan (for example, "execute task: AUTH-JWT-REFACTOR"), follow this process:

## 1. Validate and locate task documents

- When the user types `execute task: [TASK-NAME]` (or similar), locate the task documents:
  - Plan file: `docs/tasks/[TASK-NAME]/[TASK-NAME]-PLAN.md`
  - Session file: `docs/tasks/[TASK-NAME]/[TASK-NAME]-SESSION.md`
  - Intake file: `docs/tasks/[TASK-NAME]/[TASK-NAME]-INTAKE.md` (optional context)
- If the plan file doesn't exist: "Cannot find plan document. Use `create task: [TASK-NAME]` to create a plan first."
- If the session file doesn't exist: "Session file is missing. The plan may be incomplete."

## 2. Read and understand the plan

- Read the **entire plan document**, paying special attention to:
  - **Execution Instructions** – Your mandatory rules for this execution.
  - **Context & Goals** – What you're building and why.
  - **Constraints & Assumptions** – Limitations and boundaries.
  - **Process References** – Any domain-specific workflows.
  - **Phase Overview** – High-level progress tracking.
  - **Detailed Tasks (Atomic)** – The step-by-step work to execute.
- **Critical:** Follow ALL rules in the Execution Instructions section. These rules are non-negotiable.

## 3. Check the session log for progress

- Read the session file's **Per-Task Log** table.
- Identify the last completed task (most recent timestamp).
- Determine the next incomplete task from the plan:
  - Look for the first unchecked checkbox `[ ]` after the last completed task.
  - If all tasks in a phase are complete, move to the next phase.
- Present a brief summary to the user:
  - "Last completed: [task ID and description]"
  - "Next task: [task ID and description]"
  - "This will involve: [brief explanation of changes]"
- Wait for user confirmation before proceeding.

## 4. Execute ONE atomic task

- Execute **only the single next atomic task**. Never batch multiple tasks together.
- Follow the execution rules from the plan:
  - Make focused, minimal changes (typically 1-3 minutes of work).
  - Keep changes aligned with repository standards.
- If you encounter unexpected issues or blockers:
  - Pause immediately.
  - Report the issue to the user.
  - Ask whether to: adjust the approach, skip the task, or stop execution.

## 5. Verify the change

- After completing the atomic task, run at least one verification appropriate to the change:
  - **Compilation/build check**
  - **Import resolution**: No import errors, all dependencies resolve.
  - **Linting**: If relevant
  - **Unit tests**: If relevant and not too slow
  - **Basic runtime check**: If feasible
- Record the verification result (pass/fail, what was checked).

## 6. Update documentation immediately

- **This step is mandatory after every atomic task.** Update both files:
  - In the **plan file**:
    - Mark the completed task checkbox: `[ ]` → `[x]`
    - If all tasks in a phase are complete, update the Phase Overview
  - In the **session file**:
    - Add a new row to the **Per-Task Log** table with:
      - **Timestamp**: Current date and time
      - **Phase**: Which phase this task belongs to
      - **Task ID**: From the plan
      - **Description**: What was done
      - **Files Changed**: List of files modified/created/deleted
      - **Verification**: What checks passed
- If you discover new issues or TODOs, add them to the session file's notes section.

## 7. Report and pause for approval

- Present a concise report to the user:
  - **What was done**: Summary of changes
  - **Files changed**: List of files
  - **Verification result**: What passed or failed
  - **Behavior change**: How the system changed
  - **Next task**: Preview of what's next (if any remain)
  - **New TODOs/issues**: Any problems discovered
- Then **stop and wait** for the user's approval:
  - **`continue`** – Proceed to the next atomic task
  - **`wait`** – Pause so user can review
  - **`redo`** – Revert and try again with adjustments
  - **`stop`** – End execution and write wrap-up summary

## 8. Handle approval response

- **If `continue`**: Go back to step 3 and repeat the loop.
- **If `wait`**: Acknowledge and wait. Resume from step 3 when user says `continue`.
- **If `redo`**:
  - Revert the last change
  - Ask what should be adjusted
  - Re-attempt the same task
  - Update docs with the new attempt
- **If `stop`**: Proceed to step 9.

## 9. Finish execution and write wrap-up summary

- When execution stops, write a **Wrap-Up Summary** in the session file:
  - What was accomplished
  - What remains incomplete
  - Any unresolved issues
  - Recommendations for next steps
- Present the summary to the user and point them to the updated documents.
- If there are remaining tasks, suggest: "To resume later, use `execute task: [TASK-NAME]`"

## 10. Resuming interrupted execution

- When the user says `execute task: [TASK-NAME]` for a task already in progress:
  - Read the session log to identify the last completed task
  - Present: "Resuming [TASK-NAME]. Last completed: [task]. Next task: [task]."
  - Wait for confirmation before proceeding.
- If user says `resume execution` without a name:
  - Find the most recently updated session file
  - Confirm with user before proceeding.

## 11. Error handling and blockers

- If you encounter a blocker:
  - **Stop immediately**. Do not guess.
  - Report the blocker with context
  - Suggest options: adjust, skip, pause, or update plan
  - Wait for user decision
- If verification fails:
  - Report the failure immediately
  - Show the error message
  - Ask whether to: fix, redo, or skip and flag

