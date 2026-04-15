# Bug Log and Resolutions

## Metadata

- Last Updated: 2026-04-14

## Current Bug (fixed)

### Error Type

Runtime `MongooseServerSelectionError`

### Error Message

`getaddrinfo ENOTFOUND host1`

### Root Cause

- `.env.local` used a placeholder Mongo URI with fake hosts (`host1`, `host2`, `host3`).
- Env validation accepted any non-empty string, so the bad URI reached runtime.
- The failure appeared during first homepage bootstrap check (`isFirstRunSetupRequired`).

### Fix Applied

1. Hardened env validation in `src/server/config/env.ts`:
   - `MONGODB_URI` must start with `mongodb://` or `mongodb+srv://`.
   - Known placeholders are rejected (`host1`, `username`, `password`, `your-replicaset`).
2. Improved DB connection error mapping in `src/server/db/mongoose.ts`:
   - DNS/network failures now return a guided error message.
   - Connection cache is reset on failure to allow clean retry.
3. Updated setup docs and env templates to use a valid local default URI.

### Example Proof (lightweight)

- Test file: `tests/mongo-env-guardrails.test.ts`
- Included sample checks (3 total):
  1. accepts a valid local URI (`mongodb://localhost:27017/ready2agent`)
  2. rejects placeholder URI with `host1`
  3. maps DB DNS error into a user-guided message

## Resolved Issues

1. USER login crashed before dashboard load with `Audit activity is not available for this profile`.
   - Root cause: dashboard loaded `/api/audit/recent` for every role.
   - Fix: `src/app/dashboard/page.tsx` now fetches audit only for non-`USER` roles.

2. Next.js warning: missing `data-scroll-behavior="smooth"`.
   - Fix: `src/app/layout.tsx` now sets `data-scroll-behavior="smooth"` on `<html>`.

3. Next.js image ratio warnings on dashboard media cards.
   - Fix: migrated image cards to `fill` strategy with explicit wrapper dimensions where needed.

4. Public registration appeared to not persist users in MongoDB.
   - Root cause: runtime fallback allowed non-database execution in `demo`.
   - Fix: database is now mandatory in every runtime (`live`, `demo`, `test`) and persistence paths are DB-only.
