# Public App

This area contains every unauthenticated surface of Ready2Agent.

## Responsibilities

- public landing page
- login with NextAuth credentials
- self-registration for standard `USER` accounts
- invite acceptance for `ADMIN` and `OPERATOR`
- privacy and terms pages

## Main Files

- `login/page.tsx`: credential sign-in flow
- `register/page.tsx`: standard user registration
- `invite/[token]/page.tsx`: invite completion for staff accounts
- `privacy/page.tsx` and `terms/page.tsx`: baseline compliance pages

## Notes

- Only `USER` accounts can be created directly from the public app.
- `ADMIN` and `OPERATOR` accounts always arrive through one-time invite links generated in dashboard and shared manually.
