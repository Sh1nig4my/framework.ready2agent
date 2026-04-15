# Prompt Modes Guide

## Metadata

- Last Updated: 2026-04-15
- Scope: usage of prompt modes defined in `PROMPT.md`

## Source of Truth

- Prompt definitions: `PROMPT.md` (full Mode A/B/C prompts)
- Full context with embedded prompts: `README.md`
- Operational workflow: `workflow/R2A-integration/README.md`
- Context hierarchy: `agent-workspace/README.md`
- Full narrative context: `R2A_full-ai-context.md`

## Modes

### Mode A - Full Maintenance Review

Use when:

- many updates happened across code and docs
- architecture drift is possible
- deep cleanup + conformity report is needed

Expected output:

- maintenance report in `agent-workspace/reviews/system-maintenance/`
- filename format: `review-<yyyy-mm-dd>-<hhmm>.md`

### Mode B - Targeted Change (outside full historical sequence)

Use when:

- one scoped change is required now
- full historical phase traversal is not required
- strict architecture compliance is still mandatory

Expected output:

- concise implementation summary
- explicit conformity note with project rules

### Mode C - Workflow Start / Progress

Use when:

- starting or resuming official phase/task execution
- dependency order must be enforced
- tracker/status evidence is required

Expected output:

- current phase/task
- execution summary
- status/tracker updates
- next sequential task or blockers

## Selection Table

- Deep audit + cleanup + report => Mode A
- Scoped implementation now => Mode B
- Sequential workflow progression => Mode C