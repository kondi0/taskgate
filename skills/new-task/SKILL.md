---
name: new-task
description: Guide for running an intake, planning, and approval workflow when the user types a "create task:" command. Use this when asked to break down and plan a complex coding or refactoring task. This skill ends after plan approval and hands off to an execution agent.
---

> **Process Reference:** This skill follows the atomic task workflow defined in `docs/ATOMIC-TASK-WORKFLOW.md`. All steps below align with that document's approval loop and atomic task principles.

To run an atomic, approval-based workflow for a user-defined task (for example, "create task: Extract approval flow from apps/clientsite to libs/clientsite/checkout"), follow this process:

## 1. Start with a short description (always)

- When the user types `create task:`, first ask them for a short, one- or two-sentence description of the task in their own words.
- Even if they already provided a long description, confirm or refine it into a concise summary.

## 2. Create or update an intake document (INTAKE)

- After the short description is confirmed, create or update an intake document for this task under its own folder in the dedicated tasks directory:
  - `docs/tasks/[TASK-NAME]/[TASK-NAME]-INTAKE.md`, initialized from `docs/templates/TASK-INTAKE-TEMPLATE.md`.
- Record in the intake doc:
  - The short description.
  - Initial metadata (date, owner).

## 3. Analyse the description against repo context (still intake mode)

- Using available context documents (architecture docs, coding standards, etc.), write an initial understanding into the intake doc:
  - Likely workflow type (extraction, refactoring, feature, migration, cleanup, custom).
  - Suspected domains / libraries / apps.
  - Initial in-scope / out-of-scope boundaries.
  - Any immediately obvious risks or constraints.
- Show this initial understanding to the user in chat so they can react.

## 4. Run an intake Q&A loop (no planning or code yet)

- Ask targeted questions to clarify:
  - Goals and outcomes.
  - Constraints (technical, product, timeline).
  - Definition of done.
  - Priorities (must-have vs nice-to-have).
- For each important question/answer pair:
  - Append it to the Q&A section of the intake doc.
  - If it leads to a firm decision, add it to the "Decisions" section.
  - If it cannot be answered yet, add it to "Open questions / To investigate later".
- Stay in this intake mode until you can produce a clear summary of the task.

## 5. Present an intake summary and wait for explicit "ready to plan"

- Once enough questions are answered, write an **Intake Summary** section in the intake doc (and show it in chat) capturing:
  - Confirmed scope.
  - Deferred scope.
  - Key risks.
  - The most important open questions.
- Ask the user to confirm with a clear signal such as `ready to plan` before creating any plan or session documents.
- Do **not** create plan or session docs, and do **not** change code, until the user has confirmed that the intake summary looks correct.

## 6. Create or update documentation files (PLAN + SESSION, from templates)

- Once the user signals `ready to plan`, create or update skeleton docs that mirror the agreed phases using the templates, in the same task folder:
  - A **plan file**: `docs/tasks/[TASK-NAME]/[TASK-NAME]-PLAN.md`, initialized from `docs/templates/TASK-PLAN-TEMPLATE.md`.
  - A **session file**: `docs/tasks/[TASK-NAME]/[TASK-NAME]-SESSION.md`, initialized from `docs/templates/TASK-SESSION-TEMPLATE.md`.
- In the plan file, always link to:
  - `docs/tasks/[TASK-NAME]/[TASK-NAME]-INTAKE.md` as the source for context and decisions.
  - `docs/ATOMIC-TASK-WORKFLOW.md` as the base process for all tasks.
- **Important:** Write the plan document for a **different agent** who has not seen this planning conversation. The "Execution Instructions" section must be complete and self-contained with all workflow directives. Any execution agent should be able to pick up the plan doc and start work immediately.

## 6.5. Plan approval QA loop

- After creating the plan and session docs, present the plan to the user in chat, showing key sections:
  - Phases and atomic tasks
  - Definition of done
  - Risks and open questions
- Ask if they want to refine the plan:
  - Add, remove, or split phases or tasks
  - Clarify definition of done
  - Adjust scope or priorities
- Update the plan file with their feedback.
- If changes are significant, add a "Last revised" timestamp to the plan metadata.
- Continue this QA loop until the user provides an approval signal. Accept any affirmative response such as:
  - `approve plan`, `plan approved`, `ready to execute`, `looks good`, `let's go`, `start implementation`, etc.

## 6.6. Hand off and end skill

- Once the plan is approved, inform the user:
  - "✅ Planning complete. The plan document at `docs/tasks/[TASK-NAME]/[TASK-NAME]-PLAN.md` is ready for execution."
  - "To begin implementation, use: `execute task: [TASK-NAME]`"
- **The `new-task` skill ends here.** Do not proceed to execution.

## 7. Resuming an interrupted task

- When the user comes back and says `resume task: [TASK-NAME]` (or similar):
  - Look for `docs/tasks/[TASK-NAME]/[TASK-NAME]-INTAKE.md`, `-PLAN.md`, and `-SESSION.md`.
  - If only the intake doc exists, resume in **intake mode**: continue the Q&A loop (step 4).
  - If plan doc exists but no session log entries, resume in **plan approval mode**: continue the plan approval QA loop (step 6.5).
  - If session log shows execution tasks completed, inform the user to use `execute task: [TASK-NAME]` instead.
- If the user says `resume the last task` without a name, assume the most recently updated task folder and confirm before proceeding.

