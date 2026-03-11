# Task Plan: [TASK-NAME]

> Template for planning any `create task:` workflow.

---

## 1. Task Metadata

- **Task name:** <!-- e.g. AUTH-JWT-REFACTOR -->
- **Created on:** <!-- date -->
- **Owner:** <!-- who is driving the work -->
- **Workflow type:** <!-- extraction | refactoring | feature | migration | cleanup | custom -->
- **Last revised:** <!-- date and time of last significant update -->

---

## 2. Execution Instructions (for Implementation Agent)

> **READ THIS FIRST before starting any implementation work.**

This plan is designed to be executed by following the **Atomic Task Workflow** defined in `docs/ATOMIC-TASK-WORKFLOW.md`. If you are an agent assigned to implement this plan, you **must** follow these rules:

1. **Always check the session log first** – Before starting or resuming work, read `docs/tasks/[TASK-NAME]/[TASK-NAME]-SESSION.md` to identify the last completed task and current progress.

2. **Execute one atomic task at a time** – Each task in section 7 should take ~1–3 minutes. Never batch multiple tasks together.

3. **Update documentation after every task** – After completing each atomic task:
   - Mark the task as done (`[x]`) in section 7 below.
   - Add a new row to the Per-Task Log in the session file.
   - Update the Phase Overview when all tasks in a phase are complete.

4. **Verify every change** – Run at least one quick check after each task:
   - Compilation/build for affected code
   - Import resolution (no errors)
   - Linting and tests if relevant
   - Include verification results in your report and session log.

5. **Report and pause after each task** – Summarize what you did, then **stop and wait** for user approval: `continue`, `wait`, `redo`, or `stop`.

6. **Follow repository standards** – Keep changes aligned with project conventions and architecture.

7. **When resuming interrupted work** – Read the session log to find where you left off, propose the next task, wait for confirmation.

---

## 3. Context & Goals

- **Background:**
  - <!-- short description of current state -->
- **Goals / outcomes:**
  - <!-- bullet list of what success looks like -->
- **Definition of done:**
  - <!-- clear, verifiable DoD items -->

---

## 4. Constraints & Assumptions

- **Constraints (technical, product, timeline):**
  - <!-- e.g. must not break existing API -->
- **Assumptions:**
  - <!-- e.g. database schema remains stable -->

---

## 5. Process References

- **Atomic workflow:** `docs/ATOMIC-TASK-WORKFLOW.md`
- **Intake document:** `docs/tasks/[TASK-NAME]/[TASK-NAME]-INTAKE.md`

---

## 6. Phase Overview

> High-level view. Detailed tasks go in the next section.

| Phase | Name     | Summary                         | Done |
|-------|----------|---------------------------------|------|
| 1     | Planning | Clarify scope, constraints, DoD | [ ]  |
| 2     |          |                                 | [ ]  |
| 3     |          |                                 | [ ]  |
| 4     |          |                                 | [ ]  |

---

## 7. Detailed Tasks (Atomic)

> Each task should take ~1–3 minutes of focused work and be independently verifiable.

### Phase 1 – Planning

- [ ] 1.1 Clarify requirements and definition of done
- [ ] 1.2 Identify constraints and risks
- [ ] 1.3 Confirm affected areas

### Phase 2 – …

- [ ] 2.1 <!-- atomic task -->
- [ ] 2.2 <!-- atomic task -->

<!-- Add more phases and tasks as needed during planning conversation. -->

---

## 8. Risks & Open Questions

- **Risks:**
  - <!-- e.g. tight coupling with legacy module X -->
- **Open questions:**
  - <!-- list of questions to resolve before or during execution -->

---

## 9. Notes

- <!-- any additional notes, decisions, or context -->

