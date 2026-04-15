# Dashboard App

This area contains all authenticated dashboard pages.

## Responsibilities

- authenticated shell with persistent sidebar
- dashboard home as technical landing page for every profile
- management pages for operators, administrators, and users
- account settings surfaces

## Main Files

- `layout.tsx`: authenticated shell and redirect gate
- `page.tsx`: shared technical landing page (all roles)
- `administrators/page.tsx`: admin governance area
- `operators/page.tsx`: operator management area
- `users/page.tsx`: customer registry

## Role Behavior

- `SUPER`, `ADMIN`, `OPERATOR`, and `USER` open the same `/dashboard` technical landing immediately after login.
- `OPERATOR` can open Operators in self-only mode when `operators.view` is not enabled.
- `ADMIN` can open Administrators in self-only mode when `administrators.viewOthers` is not granted.
