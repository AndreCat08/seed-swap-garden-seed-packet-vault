## OpenCode Integration

OpenCode uses a skill-driven execution model powered by the skill tool and this repository's `/skills` directory.

### Core Rules

- Always check `AGENTS.md`, `brief/` and `tasks/` before initiating work.
- If a task matches a skill, you MUST invoke it.
- Skills are located in `skills/<skill-name>/SKILL.md`.
- Never implement directly if a skill applies.
- Always follow the skill instructions exactly (do not partially apply them).

### Intent → Skill Mapping

- Feature / new functionality → `spec-driven-development`, then `incremental-implementation`, `test-driven-development`
- Planning / breakdown → `planning-and-task-breakdown`
- Bug / failure / unexpected behavior → `debugging-and-error-recovery`
- Code review → `code-review-and-quality`
- Refactoring / simplification → `code-simplification`
- API or interface design → `api-and-interface-design`
- UI work → `frontend-ui-engineering`

### Lifecycle Mapping (Implicit Commands)

- DEFINE → `spec-driven-development`
- PLAN → `planning-and-task-breakdown`
- BUILD → `incremental-implementation` + `test-driven-development`
- VERIFY → `debugging-and-error-recovery`
- REVIEW → `code-review-and-quality`
- SHIP → `shipping-and-launch`

### Execution Model

For every request:

1. Always read `AGENTS.md`, `agent-docs/project-context.md`, and `agent-docs/memory.md` first.
2. Determine if any skill applies (even 1% chance).
3. Invoke the appropriate skill using the skill tool.
4. Follow the skill workflow strictly.
5. Only proceed to implementation after required steps (spec, plan, etc.) are complete.

### Anti-Rationalization

The following thoughts are incorrect and must be ignored:

- "This is too small for a skill"
- "I can just quickly implement this"
- "I’ll gather context first without checking AGENTS.md"

Correct behavior:

- Always check `AGENTS.md` and use skills first.

---