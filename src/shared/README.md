# Shared Layer

This folder is reserved for code used by both server and frontend.

## Allowed Content

- shared TypeScript types and interfaces
- DTO contracts consumed by both sides
- pure utilities with no Node-only or browser-only dependencies

## Not Allowed

- database access code
- business logic that depends on authenticated actors
- Next.js route handlers

## Current Folders

- `src/shared/auth`
- `src/shared/demo`
- `src/shared/staff`
- `src/shared/types`
- `src/shared/users`
