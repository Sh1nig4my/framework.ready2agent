# Navigation Components

Components dedicated to navigation inside the private app shell.

## Responsibilities

- render role-aware sidebar links from shared navigation config
- keep UI visibility aligned with real server-side permissions
- expose profile actions (overview shortcut, profile settings, logout)

## Main Files

- `app-sidebar.tsx`: private sidebar and profile actions menu
- `src/shared/navigation/config.ts`: canonical role-aware navigation rules

## Current Sidebar Rules

- all profiles (`SUPER`, `ADMIN`, `OPERATOR`, `USER`) can open `Overview` (`/dashboard`)
- `SUPER` and `ADMIN` can open administrators, operators, and users modules
- `OPERATOR` visibility depends on delegated permissions and self-only constraints
- `USER` remains focused on overview + profile settings
