# Atomic Task Workflow

> **Purpose:** Defines what makes a task "atomic" and the approval-gated workflow for executing them.
>
> **Audience:** AI agents executing tasks using TaskGate

---

## Core Principle

**Execute ONE atomic task → Verify → Report → Get approval → Repeat**

Every task must be:
- **Small** (1-3 minutes)
- **Focused** (one logical change)
- **Verifiable** (can be quickly checked)
- **Reversible** (easy to undo)

---

## 1. What is an Atomic Task?

An atomic task is the **smallest independently verifiable unit of work**. If you can't verify it worked without doing more work, it's too small. If it takes more than 3 minutes, it's too big.

### ✅ Good Atomic Tasks

| Task | Why It's Atomic |
|------|----------------|
| Create `ThemeContext.tsx` with light/dark mode state | Single file, single responsibility, immediately testable |
| Update `Button` component to use theme context | Focused change, imports verify, visual check possible |
| Add `theme` parameter to 5 function calls in `dashboard.ts` | Mechanical change, compilation verifies correctness |
| Move `UserProfile.tsx` from `/components` to `/features/user` and fix imports | File move + import updates = one logical unit |
| Extract `validateEmail` function into `utils/validation.ts` | New file + update callers = focused refactor |
| Add unit tests for `calculateTotal` function | One function, complete test coverage |
| Update API endpoint `/users` to return `lastLogin` field | Backend change, immediately testable with curl/Postman |
| Rename `getUserData` to `fetchUserProfile` across 8 files | Mechanical rename, compilation verifies |

### ❌ Bad Atomic Tasks (Too Large)

| Task | Why It's Too Big | How to Split |
|------|-----------------|-------------|
| "Refactor the auth module" | Vague scope, many changes | Split into: Create new structure → Move files → Update imports → Update tests |
| "Add user authentication" | Multiple features, many files | Split by feature: JWT setup → Login API → Login UI → Protected routes |
| "Migrate to TypeScript" | Entire codebase change | Split by module or file group: Start with types → Convert utils → Convert components |
| "Implement dark mode" | UI + state + persistence | Split: Theme context → Theme toggle → Apply to components → Persist preference |

### ❌ Bad Atomic Tasks (Too Small)

| Task | Why It's Too Small | How to Combine |
|------|-------------------|---------------|
| "Add import statement" | Can't verify in isolation | Combine with the feature that needs it |
| "Change variable name `x` to `y`" | Unless part of broader rename | Combine with function/component refactor |
| "Save file" | Not meaningful work | Part of the actual change |

### 🎯 Atomic Task Checklist

Before executing, ask yourself:
- [ ] Can I complete this in 1-3 minutes?
- [ ] Does it change ONE logical thing?
- [ ] Can I verify it worked immediately after?
- [ ] If I need to undo it, is that straightforward?
- [ ] Will the codebase be in a valid state after this?

If you answer "no" to any of these, the task is not atomic. Split it further or combine it.

---

## 2. The Approval Loop Workflow

```
┌─────────────────────────────────────────────────────────┐
│  1. EXECUTE one atomic task                             │
│     • Make focused changes (1-3 min)                    │
│     • Stay within scope of the single task              │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  2. VERIFY the change                                   │
│     • Run compilation/build check                       │
│     • Check imports resolve                             │
│     • Run relevant tests (if quick)                     │
│     • Basic sanity check                                │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  3. UPDATE documentation                                │
│     • Mark task done in plan: [ ] → [x]                 │
│     • Add row to session log                            │
│     • Note any issues discovered                        │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  4. REPORT to user                                      │
│     • What was done                                     │
│     • Files changed                                     │
│     • Verification result                               │
│     • What's next                                       │
└──────────────────────┬──────────────────────────────────┘
                       ↓
┌─────────────────────────────────────────────────────────┐
│  5. PAUSE and wait for approval                         │
│     • STOP working                                      │
│     • Wait for user command                             │
└──────────────────────┬──────────────────────────────────┘
                       ↓
              ┌────────┴────────┐
              ↓                 ↓
         `continue`        `wait` / `redo` / `stop`
              ↓                 ↓
      [Loop to step 1]    [Handle accordingly]
```

### Critical Rules

1. **NEVER batch multiple atomic tasks** - Execute ONE task at a time
2. **ALWAYS stop after each task** - Don't continue without approval
3. **ALWAYS verify** - Don't skip verification even if confident
4. **ALWAYS update docs** - Session log is the source of truth
5. **ALWAYS report clearly** - User needs to understand what changed

---

## 3. Approval Commands

After each atomic task, the user responds with ONE of these:

### `continue`
- **Meaning:** Task is approved, move to next atomic task
- **Agent action:** Loop back to step 1 with the next task from the plan
- **Example:** "continue" → Agent executes next task

### `wait`
- **Meaning:** Pause execution, I need to review
- **Agent action:** Acknowledge and stop. Don't do anything until user says `continue`
- **Example:** "wait" → Agent: "Paused. Say `continue` when ready to proceed."

### `redo`
- **Meaning:** The last task didn't work, try again differently
- **Agent action:** 
  1. Ask what should change
  2. Revert the last task if needed
  3. Re-attempt with adjustments
  4. Update session log with new attempt
- **Example:** "redo - use a different approach for the theme toggle" → Agent reverts and tries new way

### `stop`
- **Meaning:** End execution now
- **Agent action:**
  1. Write wrap-up summary in session file
  2. List what was accomplished
  3. List what remains
  4. Note any issues or TODOs
- **Example:** "stop" → Agent writes summary and ends

---

## 4. Verification Standards

After EVERY atomic task, run at least ONE of these checks:

### Always Required
- **Compilation/Build Check** - Does the code compile/build?
- **Import Resolution** - Are all imports valid and resolving?

### When Relevant
- **Linting** - Does code pass lint rules? (if quick)
- **Type Checking** - Does TypeScript pass? (if applicable)
- **Unit Tests** - Do relevant tests pass? (if quick, < 30 seconds)
- **Basic Runtime** - Does the app start? (if feasible)

### Report Format
```
Verification: ✅ Passed
- Compilation: ✅ No errors
- Imports: ✅ All resolved
- Tests: ✅ 3/3 passing (utils.test.ts)
```

Or if failed:
```
Verification: ❌ Failed
- Compilation: ❌ Error in Button.tsx line 45
  "Property 'theme' does not exist"
```

---

## 5. When Things Go Wrong

### If Verification Fails
1. **STOP immediately**
2. Show the error to the user
3. Ask: "Should I fix this, redo the task, or skip and flag it?"
4. Wait for user decision

### If You Hit a Blocker
1. **STOP immediately**
2. Describe the blocker with context
3. Suggest options:
   - Adjust approach
   - Skip this task and flag for later
   - Stop execution and update plan
4. Wait for user decision

### If Task Scope Grows
1. **STOP immediately**
2. Report: "This task is larger than expected. Should I:"
   - Split into smaller atomic tasks
   - Complete this as-is
   - Defer to planning phase
3. Wait for user decision

**NEVER guess or push forward when blocked.** The approval gate is your safety net.

---

## 6. Examples: Before & After

### Example 1: Adding Dark Mode

**❌ Non-Atomic Approach:**
```
Task: "Add dark mode"
[Agent makes 15 file changes in one go]
```

**✅ Atomic Approach:**
```
Task 1: Create ThemeContext with light/dark state
→ Verify → Report → Get approval

Task 2: Create ThemeToggle component
→ Verify → Report → Get approval

Task 3: Wrap App with ThemeProvider
→ Verify → Report → Get approval

Task 4: Update Button to use theme colors
→ Verify → Report → Get approval

[Continue for each component...]
```

### Example 2: Extracting a Feature

**❌ Non-Atomic Approach:**
```
Task: "Extract checkout to library"
[Agent moves 20 files and updates 50 imports]
```

**✅ Atomic Approach:**
```
Task 1: Create checkout library structure
→ Verify → Report → Get approval

Task 2: Move PaymentForm.tsx and update its imports
→ Verify → Report → Get approval

Task 3: Move CheckoutSummary.tsx and update its imports
→ Verify → Report → Get approval

Task 4: Update app to import from new library location
→ Verify → Report → Get approval

[Continue file by file...]
```

---

## 7. Summary: The Atomic Mindset

- **Think small** - If it takes more than 3 minutes, split it
- **Think focused** - One logical change per task
- **Think verifiable** - Can you prove it worked?
- **Think reversible** - Can you easily undo it?

**Remember:** Atomic tasks aren't about being slow. They're about being **controlled**, **verifiable**, and **safe**. Users approve because each step is easy to understand and review.

The approval gate after each atomic task is what keeps AI work from going off the rails. 🎯

