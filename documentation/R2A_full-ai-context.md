# R2A Full AI Context

## Metadata

- Project: Ready2Agent (R2A)
- Last Updated: 2026-04-15
- Audience: coding agents, maintainers, reviewers, technical stakeholders
- Purpose: provide a near-omniscient context package for understanding and evolving the project

## 1) Executive Context

Ready2Agent is an AI-native software framework with two equally important identities:

1. **Plug-and-play framework** for real delivery
2. **Demonstrative framework** for coding-agent methodology

The project is intentionally structured so that a developer can either:

- fork and use it as application baseline, or
- fork and use it as methodology blueprint for agent-assisted development.

The core promise is not only functional software, but reproducible software evolution.

## 2) Product Positioning

### 2.1 Plug-and-play dimension

R2A includes:

- secure authentication and session model
- first-run bootstrap flow for SUPER creation
- role governance with explicit capability model
- backoffice/user surfaces under a private dashboard shell
- standard API/controller/service/repository separation

This allows teams to start from a stable identity-and-governance baseline rather than building IAM and governance from scratch.

### 2.2 Case-study dimension

R2A is also a public case study that demonstrates:

- how to organize project context for agents
- how to execute tasks in deterministic sequence
- how to track decisions and status in docs
- how to keep architecture and documentation synchronized

The workflow assets are part of the product value, not side artifacts.

## 3) Core Architecture

### 3.1 Stack

- Next.js App Router
- TypeScript
- MongoDB/Mongoose
- NextAuth-based session/auth orchestration

### 3.2 Layering Model

- `src/app/api/*` => controller boundary (request/response, envelope, requestId, actor loading)
- `src/server/service/*` => business rules, policy checks, orchestration
- `src/server/repository/*` => persistent storage access
- `src/shared/*` => contracts and shared types used across runtime boundaries

### 3.3 Architectural intent

- API should not contain business logic.
- Services should not leak transport concerns.
- Repository should not enforce UI assumptions.
- Shared contracts should remain stable and explicit.

## 4) Identity and Access Model

### 4.1 Roles

- `SUPER`: global authority
- `ADMIN`: delegated governance authority
- `OPERATOR`: feature-scoped delegated operator
- `USER`: standard product user

### 4.2 Policy direction

- Visibility in UI is convenience.
- Effective authorization is always server-side.
- URL direct access must enforce same rules as navigation.

### 4.3 Operator capability model

Operator permissions are granular by resource/action and are evaluated in backend logic.
This avoids security drift caused by frontend-only gating.

## 5) Dashboard Contract

### 5.1 Post-login behavior

- Every profile lands on `/dashboard`.
- `/dashboard` is the official technical landing page.
- It explains purpose, architecture, workflow method, and how to continue.

### 5.2 Why this matters

The dashboard homepage is deliberately educational and operational:

- educational for developers and reviewers
- operational for role-based module access

It removes ambiguity about what the project is and how it should evolve.

## 6) Runtime and Bootstrap

### 6.1 Runtime baseline

- Database is mandatory at boot.
- `MONGODB_URI` is required.
- Empty DB triggers setup flow.

### 6.2 First-run constraints

- `/setup` creates exactly one initial `SUPER` account.
- No public flow may create additional `SUPER` users.

### 6.3 Local/dev constraints

- tests run with in-memory Mongo where configured
- credentials and secrets must remain out of tracked files

## 7) Documentation Architecture (Refactor-Aligned)

## 7.1 Entrypoint and context payload

- `README.md` is the official entrypoint.
- `documentation/R2A_full-ai-context.md` is the full-context artifact for extended analysis and external LLM handoff.

## 7.2 Agent execution knowledge base

`documentation/` is the operative context folder used by coding agents.
It contains architectural rules, functional constraints, setup baseline, decision traces, and case-study framing.

Expected usage:

- For routine implementation, agents use the quickstart + operational documentation path.
- For extended analysis or external AI context transfer, use this file.
- New changes must remain consistent with repository documentation.

## 7.3 Workflow case-study corpus

`workflow/R2A-integration/` contains operational execution materials:

- master execution index
- phase/task files
- status files
- daily tracker
- prompt usage guide

This folder is meant to be reusable as a template for other repositories adopting agent-native delivery.

## 8) Prompt and Execution Model

Official prompts are defined in `README.md` (Mode A, B, C embedded).

### 8.1 Mode A

Full maintenance review: audit, alignment, cleanup, consistency report.

### 8.2 Mode B

Scoped targeted change outside full historical sequence, still with strict architecture compliance.

### 8.3 Mode C

Sequential progression through workflow phases/tasks with strict dependency order.

### 8.4 Non-negotiable principles

- one task at a time when in workflow sequence
- no silent architecture shortcuts
- no docs drift
- validation evidence whenever possible

## 9) UI/UX and Copy Intent

R2A UI is not decorative-first; it is clarity-first.

Guiding principles:

- technical readability
- explicit information hierarchy
- role-awareness without visual chaos
- consistent language between UI and docs

Copy strategy:

- avoid vague marketing-only statements
- describe what exists, how it works, and how to operate it
- keep terminology stable across dashboard, README, and workflow docs

## 10) Repository Governance

### 10.1 Source-of-truth hierarchy

1. Runtime behavior in code
2. Architecture and constraints in `documentation/operational/spec/*`
3. Operational execution trail in `workflow/R2A-integration/*`
4. Decision trace in `documentation/project-meta/decision_log.md`

### 10.2 Change hygiene

- if architecture paths change, docs references must change together
- if functional behavior changes, affected docs and tests are updated together
- obsolete modules are removed entirely, not hidden

## 11) Recommended Open Stack (Free Tier Friendly)

- App framework: Next.js + TypeScript
- IDE for implementation: WebStorm
- Agent coding environment: OpenCode
- Hosting: Vercel
- Database: MongoDB Atlas
- Collaboration/versioning: GitHub + fork-first approach

The recommendation is intentionally accessible to individual developers and small teams with minimal budget.

## 12) How to Explain R2A to Another AI

If this project must be explained to a generic chat AI, provide this file first.
It contains the essential context to understand:

- what the product is
- what architectural rules exist
- how role and permission logic is structured
- how documentation is organized
- how work should be executed and validated

Then provide, in order:

1. `README.md`
2. `prompts/README.md`
3. `documentation/README.md`
4. `workflow/R2A-integration/README.md`

## 13) Practical Onboarding Checklist

For a new agent or contributor (operational path):

1. Read `README.md`.
2. Read `documentation/quickstart/agent_start_here.md`.
3. Read `documentation/operational/README.md` and operational indexes.
4. Read `prompts/README.md` and choose execution mode.
5. Inspect workflow materials in `workflow/R2A-integration/`.
6. Implement only in scoped boundaries.
7. Validate (`lint`, `test`, `build` where applicable).
8. Update docs impacted by the change.

Extended-context path (optional):

9. Read this full file when a complete narrative context is required.

## 14) Non-Objectives / Guardrails

- R2A is not a random starter kit with disconnected features.
- R2A is not frontend-only role masking.
- R2A is not docs-as-afterthought.
- R2A is not a benchmark project for speculative patterns without governance.

## 15) Definition of Alignment Success

The project is aligned when all these are true:

- `/dashboard` communicates the same core narrative as `README.md`
- `README.md` points first to quickstart for operational work and to this file for extended context
- `documentation/` is complete and coherent for agent execution
- `workflow/R2A-integration/` is coherent as case-study methodology
- no stale references remain to obsolete paths or removed modules
- code, docs, and tests describe the same system reality
