# R2A Full AI Context

## Metadata

- Project: Ready2Agent (R2A)
- Last Updated: 2026-04-28
- Audience: coding agents, maintainers, reviewers, technical stakeholders
- Purpose: full context package for understanding and evolving the project

## 1) Strategic Identity

Ready2Agent keeps one identity with three aligned dimensions:

1. **R2A Core**: plug-and-play runtime framework for real delivery.
2. **R2A Method**: agent-native system for traceable software evolution.
3. **R2A Extensions**: optional future plugin ecosystem, separated from Core.

No real extension is part of Core in the current phase.

## 2) Folder Taxonomy

```text
src/                  = R2A Core runtime
documentation/core/   = R2A Core documentation/spec
documentation/method/ = R2A Method documentation/spec
workflow/             = R2A Method execution instances
prompts/              = R2A Method prompt interface
extensions/           = R2A Extensions ecosystem (prepared, optional)
public/               = static assets
```

## 3) Core Runtime Model

### 3.1 Stack

- Next.js App Router
- TypeScript
- MongoDB/Mongoose
- NextAuth

### 3.2 Layering

- `src/app/api/*` -> controller boundary
- `src/server/service/*` -> business logic and policy checks
- `src/server/repository/*` -> persistence access
- `src/shared/*` -> shared contracts and types

### 3.3 Core constraints

- Business logic lives in services.
- Authorization is server-side, never only UI-side.
- Setup bootstrap creates first and only initial `SUPER`.
- Runtime and docs must stay aligned in every change cycle.

## 4) Method Operating System

`documentation/method/` defines how work is done:

- onboarding rules
- execution rules
- workflow model
- prompt model
- alignment and maintenance model

`workflow/` contains concrete execution artifacts (flows, trackers, chapters, tasks).
Method is theory and constraints; workflow is execution history and current operations.

## 5) Prompt Interface

`prompts/` is the operational interface for agents.

- `prompts/standard-implementation-start.md` for scoped implementation tasks
- `prompts/maintenance-global-realignment.md` for broader structural/documental realignment

Prompt read order must stay aligned with quickstart and documentation hubs.

## 6) Extensions Role

`extensions/` is architectural preparation only.

- Extensions are optional.
- Core must not depend on any specific extension.
- Extensions must respect Controller/Service/Repository and auth/access constraints.
- Extensions must declare config, schema, permissions, API/UI surface, and documentation.

Possible future examples (concept only) are schema-driven modules such as configurable user data domains.
No plugin implementation is required in this phase.

## 7) Official Read Order

1. `README.md`
2. `documentation/quickstart/agent_start_here.md`
3. `documentation/README.md`
4. `documentation/core/README.md`
5. `documentation/method/README.md`
6. `workflow/README.md`
7. `prompts/README.md`
8. selected prompt file

For broad structural/documental refactors, also read this full context file.

## 8) Source Of Truth Hierarchy

1. Runtime behavior in `src/`
2. Core constraints in `documentation/core/`
3. Method constraints in `documentation/method/`
4. Execution instances in `workflow/`
5. Governance decisions in `documentation/project-meta/decision_log.md`

## 9) Learning And Governance Note

`workflow/requirements/r2a-core/` is a **living didactic specification**.
It is maintained line-by-line aligned with current R2A state to preserve the real agentic implementation method as a study artifact.

## 10) Alignment Success Criteria

R2A is aligned when:

- runtime behavior, docs, workflow, and prompts describe the same system reality
- no obsolete structural paths are used
- onboarding paths are clear for both agents and humans
- validation evidence (`lint`, `test`, `build`) remains reproducible
