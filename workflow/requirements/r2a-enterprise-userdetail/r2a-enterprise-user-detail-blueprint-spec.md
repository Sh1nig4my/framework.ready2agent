# R2A Enterprise — UserDetail Blueprint Technical Specification

## 0. Document Metadata

- **Feature name:** UserDetail Blueprint
- **Target project:** Ready2Agent Enterprise / R2A Enterprise
- **Source baseline:** Ready2Agent / R2A
- **Document type:** Technical specification for developers
- **Primary audience:** maintainers, backend developers, full-stack developers, coding agents operating under developer supervision
- **Status:** Brainstorming outcome consolidated into implementation-ready specification
- **Runtime mutability:** Not supported in V1
- **Schema source of truth:** Versioned file under `src/config`

---

## 1. Executive Summary

R2A Enterprise extends the existing Ready2Agent user model with a dedicated `UserDetail` domain entity. The purpose is to preserve a stable, security-oriented core `User` model while allowing each enterprise project to define additional user-related attributes in a controlled, typed, and developer-owned way.

The feature is intentionally **not runtime-configurable**. The custom user detail structure is defined through a repository-versioned schema file under `src/config`. This file acts as a developer-facing blueprint from which backend validation, persistence shape, frontend form metadata, registration behavior, search behavior, and documentation can be derived.

The key conceptual change is:

```txt
User is no longer the complete user domain object in R2A Enterprise.
A complete enterprise user is User + UserDetail.
```

R2A keeps the core user model simple. R2A Enterprise introduces `UserDetail` as a mandatory one-to-one companion entity.

---

## 2. Background and Product Rationale

Ready2Agent already provides authentication, session orchestration, role governance, capability-based authorization, dashboard surfaces, and clear API/service/repository separation. The base project is designed as both a usable framework and a methodology case study for agent-assisted development.

R2A Enterprise requires a stronger identity domain because real consulting/client projects often need additional user attributes that are not generally useful in a public starter framework.

Examples:

- department
- cost center
- client code
- tax/VAT identifier
- internal employee number
- external consultant flag
- customer segment
- billing profile key
- report grouping key
- document generation metadata
- sales/CRM classification
- operational flags used by custom modules

These fields should not pollute the base R2A `User` model because they are project-specific. However, they must be first-class enough to participate in registration, user CRUD operations, search, reporting, frontend display, and backend business rules.

The chosen solution is a **file-driven UserDetail schema**.

---

## 3. Design Goals

### 3.1 Primary Goals

1. Keep the core `User` model stable and security-focused.
2. Introduce a mandatory `UserDetail` entity in R2A Enterprise.
3. Define the shape of `UserDetail` through a versioned file in `src/config`.
4. Allow developers to customize user detail attributes before deploying a project.
5. Support registration-time fields when required.
6. Support generated and non-editable fields.
7. Support backend validation derived from the same blueprint.
8. Support frontend rendering metadata derived from the same blueprint.
9. Support searchable fields for future user filtering/reporting.
10. Preserve the existing R2A architecture: API/controller boundary, service layer, repository layer, shared contracts.
11. Prevent orphaned `User` or `UserDetail` records during create/update flows.
12. Keep the implementation understandable and maintainable by backend-oriented developers.

### 3.2 Non-Goals

The following are explicitly outside the scope of the V1 feature:

1. Runtime schema editing from UI.
2. Database-stored schema registry.
3. Per-tenant schema customization at runtime.
4. Admin UI for modifying schema fields.
5. Automatic arbitrary business-rule generation.
6. Fully dynamic TypeScript type generation at runtime.
7. Automatic destructive migrations when fields are removed.
8. Allowing untrusted users to define custom attributes.
9. Treating `UserDetail` as optional for enterprise users.

---

## 4. Relationship with Base R2A

### 4.1 Base R2A

In base R2A, the `User` entity is sufficient for the standard identity and governance model. It contains the fields required for authentication, roles, session context, status, and related account information.

### 4.2 R2A Enterprise

In R2A Enterprise, `User` remains the identity/security core, but business-specific user information moves into `UserDetail`.

```txt
Base R2A:
User

R2A Enterprise:
User + UserDetail
```

This separation keeps security-sensitive user logic clean while allowing the enterprise fork to carry additional domain data.

### 4.3 Integration Rule

Every workflow that creates, updates, reads, searches, or displays users must be reviewed under the following rule:

```txt
If the workflow deals with an enterprise user as a business object,
it must consider both User and UserDetail.
```

Authentication/session logic may continue to use only core `User` data unless a specific enterprise requirement needs additional detail fields in session claims. Adding arbitrary `UserDetail` fields to the session should be avoided unless strictly necessary.

---

## 5. Domain Model

## 5.1 User

`User` remains the core identity entity.

Expected responsibilities:

- authentication identity
- email/credentials/account references
- role
- status
- authorization baseline
- creation/update metadata
- optional pointer/reference to `UserDetail`, depending on implementation preference

Recommended conceptual shape:

```ts
interface User {
  _id: ObjectId;
  email: string;
  name?: string;
  role: Role;
  status: UserStatus;
  createdAt: Date;
  updatedAt: Date;
}
```

`User` should not accumulate arbitrary enterprise-specific fields.

## 5.2 UserDetail

`UserDetail` is the enterprise extension entity.

Each `UserDetail` belongs to exactly one `User`.

Recommended conceptual shape:

```ts
interface UserDetail {
  _id: ObjectId;
  userId: ObjectId;
  // generated fields from src/config/user-detail.schema.ts
  department?: string;
  costCenter?: string;
  isExternalConsultant?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

`userId` must be unique.

```txt
User._id 1 --- 1 UserDetail.userId
```

## 5.3 Relationship Constraints

The system must enforce:

1. A `User` can have at most one `UserDetail`.
2. A `UserDetail` must reference exactly one `User`.
3. An enterprise user creation flow should create both records.
4. A `UserDetail` must not exist without a valid `User`.
5. In normal enterprise operations, a `User` should not exist without a `UserDetail`.

At database level:

- `UserDetail.userId` should be required.
- `UserDetail.userId` should have a unique index.
- Cascade deletion is not automatic in MongoDB; deletion must be handled by service orchestration.

---

## 6. Schema Source of Truth

## 6.1 File Location

Use `src/config`.

Recommended file:

```txt
src/config/user-detail.schema.ts
```

No `enterprise` subfolder is required.

## 6.2 Why TypeScript Instead of JSON

A `.ts` file is preferred over `.json` because it allows:

- `as const` inference
- compile-time checking
- local helper types
- safer enum declaration
- direct exports for backend/frontend build-time reuse
- easier integration with TypeScript contracts

JSON is simpler but less expressive. For a TypeScript/Next.js project, a TypeScript schema file is the stronger default.

## 6.3 Example Schema File

```ts
// src/config/user-detail.schema.ts

export const userDetailSchemaDefinition = {
  version: 1,
  entity: "userDetail",
  fields: {
    department: {
      type: "string",
      label: "Department",
      required: false,
      useInRegistration: false,
      generated: false,
      editable: true,
      visibleInBackoffice: true,
      searchable: true,
      index: false,
      maxLength: 120,
    },
    costCenter: {
      type: "string",
      label: "Cost center",
      required: false,
      useInRegistration: false,
      generated: false,
      editable: true,
      visibleInBackoffice: true,
      searchable: true,
      index: false,
      maxLength: 80,
    },
    isExternalConsultant: {
      type: "boolean",
      label: "External consultant",
      required: false,
      useInRegistration: true,
      generated: false,
      editable: true,
      visibleInBackoffice: true,
      searchable: true,
      index: true,
      defaultValue: false,
    },
    onboardingCode: {
      type: "string",
      label: "Onboarding code",
      required: false,
      useInRegistration: false,
      generated: true,
      editable: false,
      visibleInBackoffice: true,
      searchable: true,
      index: true,
      maxLength: 64,
    },
  },
} as const;
```

---

## 7. Field Contract

Each field in `userDetailSchemaDefinition.fields` should follow a strict contract.

## 7.1 Required Properties

```ts
type UserDetailFieldType =
  | "string"
  | "number"
  | "boolean"
  | "date"
  | "enum";
```

Recommended field definition:

```ts
interface UserDetailFieldDefinition {
  type: UserDetailFieldType;
  label: string;
  required: boolean;
  useInRegistration: boolean;
  generated: boolean;
  editable: boolean;
  visibleInBackoffice: boolean;
  searchable: boolean;
  index: boolean;
  defaultValue?: unknown;
  maxLength?: number;
  minLength?: number;
  min?: number;
  max?: number;
  enumValues?: readonly string[];
  description?: string;
  placeholder?: string;
  helpText?: string;
}
```

## 7.2 Field Key Rules

Field keys must:

- be stable over time
- use camelCase
- avoid spaces
- avoid dots
- avoid `$`
- avoid reserved words
- avoid names already present on `User`
- avoid security-sensitive names unless explicitly needed

Valid:

```txt
department
costCenter
isExternalConsultant
billingProfileCode
```

Invalid:

```txt
cost.center
$internal
role
password
session
createdAt
```

## 7.3 Supported Types

### string

Used for textual values.

Supported metadata:

- `minLength`
- `maxLength`
- `defaultValue`
- `placeholder`

### number

Used for numeric values.

Supported metadata:

- `min`
- `max`
- `defaultValue`

### boolean

Used for flags.

Supported metadata:

- `defaultValue`

### date

Used for dates.

The implementation must define whether dates are stored as JavaScript `Date` objects or ISO strings. For Mongoose/MongoDB, Date is preferred.

### enum

Used for controlled string values.

Required metadata:

```ts
enumValues: readonly string[]
```

Example:

```ts
customerSegment: {
  type: "enum",
  label: "Customer segment",
  required: false,
  useInRegistration: false,
  generated: false,
  editable: true,
  visibleInBackoffice: true,
  searchable: true,
  index: false,
  enumValues: ["standard", "premium", "enterprise"],
}
```

## 7.4 Recommended V1 Type Set

V1 should start with:

```txt
string
number
boolean
date
enum
```

Avoid V1 support for arbitrary nested JSON unless there is a concrete client requirement. Nested JSON reduces validation clarity, query reliability, indexing simplicity, and UI predictability.

---

## 8. Generated vs Editable Fields

## 8.1 Editable Fields

Editable fields can be populated through registration or backoffice forms.

```ts
editable: true
generated: false
```

## 8.2 Generated Fields

Generated fields are system-owned.

```ts
generated: true
editable: false
```

Rules:

1. Generated fields must not be accepted from public registration payloads.
2. Generated fields must not be modified by normal user edit forms.
3. If editable by privileged actors is ever needed, introduce explicit metadata later, such as `editableBy`.
4. Generated values should be produced in service logic, not in controllers.

Example generated values:

- onboarding code
- internal sequence
- external system reference
- computed classification
- audit-derived flag

---

## 9. Registration Integration

## 9.1 Registration Field Selection

`useInRegistration` determines whether a `UserDetail` field appears in registration/setup flows.

```ts
useInRegistration: true
```

Only fields with all of the following should be accepted from registration payloads:

```txt
useInRegistration === true
generated === false
editable === true
```

## 9.2 Registration Payload

Recommended payload structure:

```ts
interface RegisterUserInput {
  email: string;
  password: string;
  name?: string;
  userDetail?: RegisterUserDetailInput;
}
```

Where `RegisterUserDetailInput` is derived from schema fields marked for registration.

Example:

```json
{
  "email": "mario@example.com",
  "password": "secure-password",
  "name": "Mario Rossi",
  "userDetail": {
    "isExternalConsultant": true
  }
}
```

## 9.3 Required Registration Fields

If a field is both:

```txt
required === true
useInRegistration === true
```

then registration must fail if the field is absent or invalid.

If a field is:

```txt
required === true
useInRegistration === false
```

then one of the following must be true:

1. It has a valid `defaultValue`.
2. It is `generated: true` and generated during create.
3. It is not required during initial creation but must be completed later.

To avoid ambiguity, V1 should prefer this rule:

```txt
Any required field not used in registration must have either defaultValue or generated=true.
```

## 9.4 Setup Flow

Base R2A has a first-run setup flow for creating the initial `SUPER` user. In R2A Enterprise, setup must also create the corresponding `UserDetail`.

The setup flow must determine which `UserDetail` fields apply to initial SUPER creation.

Recommended V1 rule:

```txt
The setup form includes useInRegistration=true fields.
Generated fields are produced by service logic.
Other fields receive defaultValue or remain absent if optional.
```

---

## 10. CRUD Lifecycle

## 10.1 Create User

Creating a user in R2A Enterprise is a compound operation:

```txt
create User
create UserDetail
```

This operation must be orchestrated by a service.

The API controller must not independently call both repositories.

Recommended flow:

```txt
API route/controller
  -> UserService.createUserWithDetail(input, actor)
      -> validate core user input
      -> validate userDetail input against schema
      -> start transaction/session if available
      -> create User
      -> create UserDetail linked to User._id
      -> commit transaction
      -> return aggregate DTO
```

## 10.2 Read User

Reading an enterprise user should usually return an aggregate DTO.

```ts
interface EnterpriseUserDto {
  user: UserDto;
  detail: UserDetailDto;
}
```

For list views, the response may contain a lighter projection.

```ts
interface EnterpriseUserListItemDto {
  id: string;
  email: string;
  name?: string;
  role: Role;
  status: UserStatus;
  detail?: Partial<UserDetailDto>;
}
```

## 10.3 Update User

Updating user data may involve:

- core `User` fields
- `UserDetail` fields
- both

Recommended flow:

```txt
API route/controller
  -> UserService.updateUserWithDetail(userId, input, actor)
      -> load existing User
      -> load existing UserDetail
      -> authorize actor
      -> validate core patch
      -> validate detail patch against schema
      -> start transaction/session if available
      -> update User if needed
      -> update UserDetail if needed
      -> commit transaction
      -> return aggregate DTO
```

## 10.4 Delete User

Deleting a user must handle `UserDetail`.

Recommended hard-delete order:

```txt
delete UserDetail
delete User
```

However, if the system uses soft deletion or status-based deactivation, prefer updating the `User` status and preserving `UserDetail` for audit/reporting.

Recommended enterprise default:

```txt
Deactivate user rather than hard-delete user and detail.
```

## 10.5 Partial Failure Risk

The dangerous state is:

```txt
User exists
UserDetail missing
```

This must be prevented during creation.

Recommended strategy:

1. Use MongoDB transactions when deployment supports them.
2. If transactions are unavailable, use compensating rollback.
3. Add consistency checks/tests to detect orphaned records.

---

## 11. Transaction and Rollback Strategy

## 11.1 Preferred Strategy: MongoDB Transaction

When using MongoDB replica set / Atlas, use sessions and transactions.

Pseudo-flow:

```ts
await withTransaction(async (session) => {
  const user = await userRepository.create(input.user, { session });

  const detail = await userDetailRepository.create(
    {
      userId: user._id,
      ...computedDetailData,
    },
    { session }
  );

  return { user, detail };
});
```

## 11.2 Fallback Strategy: Compensating Rollback

If transactions are not available:

```ts
let createdUser: User | null = null;

try {
  createdUser = await userRepository.create(userInput);
  const detail = await userDetailRepository.create({
    userId: createdUser._id,
    ...detailInput,
  });
  return { user: createdUser, detail };
} catch (error) {
  if (createdUser) {
    await userRepository.deleteById(createdUser._id);
  }
  throw error;
}
```

This fallback is less robust than a transaction but prevents the common orphan case.

## 11.3 Consistency Guard

Add a service-level consistency check:

```ts
UserConsistencyService.assertUserHasDetail(userId)
```

This can be used in admin diagnostics, tests, or maintenance scripts.

---

## 12. Backend Architecture

The implementation must preserve R2A layering principles:

```txt
src/app/api/*              controller boundary
src/server/service/*       business rules, orchestration, policy checks
src/server/repository/*    persistence access
src/shared/*               contracts and shared types
src/config/*               project-level static configuration/blueprints
```

## 12.1 Config Layer

Recommended file:

```txt
src/config/user-detail.schema.ts
```

Responsibilities:

- define field blueprint
- export stable schema metadata
- avoid runtime DB calls
- avoid business logic

## 12.2 Shared Contracts

Recommended files:

```txt
src/shared/user-detail/types.ts
src/shared/user-detail/contracts.ts
```

Potential exports:

```ts
export type UserDetailFieldType = "string" | "number" | "boolean" | "date" | "enum";
export type UserDetailDto = Record<string, unknown>; // or generated/static mapped type later
export interface EnterpriseUserDto { ... }
export interface CreateEnterpriseUserInput { ... }
export interface UpdateEnterpriseUserInput { ... }
```

If the project already has a specific shared contracts convention, follow that convention instead of introducing a new style.

## 12.3 Model Layer

Recommended files:

```txt
src/server/model/UserDetail.ts
src/server/model/User.ts                 existing/modified only if needed
```

`UserDetail` model is generated or constructed from `userDetailSchemaDefinition`.

Minimum static fields:

```txt
userId
createdAt
updatedAt
```

Dynamic fields are derived from the schema file.

## 12.4 Schema Factory

Recommended file:

```txt
src/server/schema/userDetailMongooseSchemaFactory.ts
```

Responsibilities:

- map blueprint field types to Mongoose schema definitions
- apply required/default/index metadata
- prevent unsupported types
- validate invalid schema definitions at boot/build time

Example mapping:

```txt
string  -> String
number  -> Number
boolean -> Boolean
date    -> Date
enum    -> String + enum validator
```

## 12.5 Validation Service

Recommended file:

```txt
src/server/service/UserDetailValidationService.ts
```

Responsibilities:

- validate create payload
- validate update payload
- reject unknown fields
- reject generated fields from external input
- enforce registration constraints
- enforce type constraints
- apply default values
- prepare generated values

## 12.6 UserDetail Service

Recommended file:

```txt
src/server/service/UserDetailService.ts
```

Responsibilities:

- create detail for a user
- update detail
- read detail
- validate field values
- coordinate generated fields
- expose metadata to frontend if needed

## 12.7 User Service Changes

Existing `UserService` must become enterprise-aware for create/update flows.

Recommended methods:

```ts
createUserWithDetail(input, actor)
updateUserWithDetail(userId, input, actor)
getUserWithDetail(userId, actor)
listUsersWithDetail(filters, actor)
deactivateUserWithDetail(userId, actor)
```

Avoid scattering `UserDetail` creation across controllers or API handlers.

## 12.8 Repository Layer

Recommended file:

```txt
src/server/repository/UserDetailRepository.ts
```

Responsibilities:

- create
- findByUserId
- updateByUserId
- deleteByUserId
- search/filter support where applicable

Repository should not enforce UI behavior or registration rules.

---

## 13. API Design

## 13.1 Create User Endpoint

Existing admin/backoffice create-user endpoint should accept detail data.

Recommended request shape:

```json
{
  "user": {
    "email": "mario@example.com",
    "name": "Mario Rossi",
    "role": "USER"
  },
  "detail": {
    "department": "Finance",
    "isExternalConsultant": false
  }
}
```

Recommended response shape:

```json
{
  "data": {
    "user": {
      "id": "...",
      "email": "mario@example.com",
      "role": "USER"
    },
    "detail": {
      "department": "Finance",
      "isExternalConsultant": false
    }
  }
}
```

Follow existing R2A response envelope conventions.

## 13.2 Update User Endpoint

Recommended request shape:

```json
{
  "user": {
    "name": "Mario Rossi"
  },
  "detail": {
    "department": "Operations"
  }
}
```

Partial update should be supported.

Unknown detail fields must be rejected.

Generated/non-editable detail fields must be rejected unless updated by internal service logic.

## 13.3 Get User Endpoint

Recommended response includes both user and detail.

```json
{
  "data": {
    "user": { ... },
    "detail": { ... }
  }
}
```

## 13.4 Schema Metadata Endpoint

A read-only endpoint may expose safe schema metadata to the frontend.

Recommended path examples:

```txt
/api/user-detail/schema
/api/users/schema/detail
```

Response should include only UI-safe metadata.

Do not expose internal-only metadata unless needed.

Example:

```json
{
  "data": {
    "version": 1,
    "fields": [
      {
        "key": "department",
        "type": "string",
        "label": "Department",
        "required": false,
        "useInRegistration": false,
        "editable": true,
        "visibleInBackoffice": true,
        "searchable": true
      }
    ]
  }
}
```

---

## 14. Frontend Architecture

## 14.1 Form Generation

Frontend forms should use schema metadata to render `UserDetail` fields.

At minimum, schema metadata should drive:

- label
- input type
- required state
- default value
- enum options
- visibility
- registration inclusion
- editability
- help text

## 14.2 Registration Form

Registration/setup forms include only fields where:

```txt
useInRegistration === true
generated === false
editable === true
```

## 14.3 Backoffice User Create/Edit

Backoffice user forms may include fields where:

```txt
visibleInBackoffice === true
generated === false
editable === true
```

Generated fields can be shown as read-only if:

```txt
visibleInBackoffice === true
generated === true
```

## 14.4 User Detail Display

User detail display should be label-driven, not raw-key-driven.

Display example:

```txt
Department: Finance
External consultant: No
Cost center: IT-042
```

## 14.5 Client-Side Validation

Client-side validation improves UX but is not authoritative.

Backend validation remains mandatory.

---

## 15. Search and Filtering

## 15.1 Searchable Fields

Fields marked as:

```ts
searchable: true
```

can be exposed in user search/filter UI.

## 15.2 Indexed Fields

Fields marked as:

```ts
index: true
```

should receive database indexes.

Do not automatically index every searchable field. Searchability is a functional flag; indexing is a performance/storage decision.

## 15.3 Query Construction

Search services can translate filters into `UserDetail` queries.

Example:

```ts
{
  department: "Finance",
  isExternalConsultant: false
}
```

Should map to repository query constraints on `UserDetail`.

If list results require both `User` and `UserDetail`, the service can:

1. Query users first, then details.
2. Query details first, then users.
3. Use aggregation if needed.

For V1, prefer clarity over complex aggregation.

---

## 16. Authorization and Policy

## 16.1 Server-Side Enforcement

All permissions must be enforced server-side.

Frontend visibility is convenience only.

## 16.2 Role Behavior

Initial recommendation:

- `SUPER`: full management
- `ADMIN`: delegated user/detail management where existing policy allows
- `OPERATOR`: only if capability model explicitly permits user management
- `USER`: can read or edit only allowed self-profile fields, if such feature exists

## 16.3 Field-Level Permissions

V1 can avoid full field-level permission complexity.

Recommended V1 fields:

```ts
editable: boolean
visibleInBackoffice: boolean
```

Future extension:

```ts
editableBy?: Role[]
visibleBy?: Role[]
```

Do not add `editableBy` in V1 unless immediately required.

---

## 17. Validation Rules

## 17.1 Schema Validation at Startup/Build

The schema definition itself must be validated.

Reject invalid definitions such as:

- missing label
- unsupported type
- enum field without `enumValues`
- generated field with `editable: true`
- required field not in registration, no default, and not generated
- field key collision with reserved fields
- invalid key format

## 17.2 Payload Validation

UserDetail payload validation must reject:

- unknown fields
- invalid types
- missing required fields
- generated fields provided externally
- non-editable fields provided externally
- enum values outside allowed set
- strings exceeding max length
- numbers outside min/max

## 17.3 Defaults

Defaults should be applied in service validation before persistence.

Example:

```txt
incoming payload -> validate -> apply defaults -> generate system fields -> persist
```

## 17.4 Unknown Field Policy

V1 should reject unknown fields strictly.

Reason:

- prevents silent data drift
- prevents typos from becoming stored data
- protects search/report assumptions
- keeps enterprise behavior deterministic

---

## 18. Migration Strategy

## 18.1 Adding a New Optional Field

Safe.

```txt
Add field to schema file
Deploy
Existing UserDetail records remain valid
```

## 18.2 Adding a Required Field

Risky if existing records do not have it.

Recommended options:

1. Provide `defaultValue`.
2. Mark as optional first, run migration, then make required.
3. Make it generated.

## 18.3 Removing a Field

Potentially dangerous.

Recommended V1 approach:

- avoid hard removal if data may still matter
- mark field hidden instead of removing
- if removal is necessary, create an explicit migration script

Potential future metadata:

```ts
status: "active" | "hidden" | "deprecated"
```

This is not mandatory for V1 but may be useful.

## 18.4 Renaming a Field

Treat rename as:

```txt
add new field
migrate data
remove/deprecate old field later
```

Do not simply rename the key without migration.

## 18.5 Migration Scripts

Recommended location:

```txt
scripts/migrations/
```

Example:

```txt
scripts/migrations/2026-04-add-user-detail-cost-center.ts
```

Each migration should be explicit and reviewed.

---

## 19. Testing Strategy

## 19.1 Unit Tests

Test schema validation:

- valid schema passes
- invalid key fails
- unsupported type fails
- enum without values fails
- generated+editable conflict fails

Test payload validation:

- valid create payload
- missing required field
- unknown field
- wrong type
- generated field supplied externally
- enum invalid value
- default value applied

## 19.2 Service Tests

Test create user with detail:

- creates both records
- rejects invalid detail
- does not create user when detail invalid
- rolls back user when detail create fails
- enforces unique detail per user

Test update user with detail:

- updates only user
- updates only detail
- updates both
- rejects non-editable/generated fields

## 19.3 Repository Tests

Test:

- create detail
- find by userId
- update by userId
- unique userId constraint
- search by indexed/searchable fields

## 19.4 Integration Tests

Test API endpoints:

- registration/setup creates User + UserDetail
- admin create user creates User + UserDetail
- read user returns aggregate DTO
- update user updates expected parts
- invalid detail payload returns validation error

## 19.5 Build/Lint Validation

Any change to `src/config/user-detail.schema.ts` must pass:

```txt
lint
test
build
```

Where applicable, the schema should be validated during test/build so invalid configuration fails early.

---

## 20. Documentation Updates

The feature must update documentation so that developers understand the enterprise behavior.

Recommended docs to add/update:

```txt
README.md
documentation/quickstart/agent_start_here.md
documentation/method/README.md
documentation/core/user-detail-blueprint.md
documentation/project-meta/decision_log.md
workflow/R2A-integration/* where relevant
```

Documentation must make clear:

1. R2A base has simple User.
2. R2A Enterprise has User + UserDetail.
3. UserDetail schema is file-driven.
4. Runtime schema editing is intentionally not supported.
5. User create/update flows are aggregate operations.
6. The schema file lives in `src/config`.
7. Changes to schema file are code changes and require validation/deploy.

---

## 21. Implementation Phases

Although this document is a technical specification rather than a task plan, the feature should be implemented incrementally.

## Phase 1 — Schema Blueprint Foundation

Add:

```txt
src/config/user-detail.schema.ts
schema definition types
schema validation utility
```

Outcome:

- schema file exists
- invalid schema can be detected
- metadata can be imported by backend

## Phase 2 — UserDetail Persistence

Add:

```txt
UserDetail model
UserDetail repository
unique userId constraint
basic create/read/update methods
```

Outcome:

- UserDetail can be persisted independently
- one-to-one relation is enforceable

## Phase 3 — Validation and Service Layer

Add:

```txt
UserDetailValidationService
UserDetailService
create/update validation
field defaulting
field generation hook
```

Outcome:

- backend validates all detail payloads
- generated fields are protected

## Phase 4 — User Aggregate Operations

Modify/add:

```txt
UserService.createUserWithDetail
UserService.updateUserWithDetail
UserService.getUserWithDetail
transaction or rollback strategy
```

Outcome:

- enterprise user lifecycle is atomic at service level
- orphaned details/users are prevented

## Phase 5 — API Integration

Update:

```txt
setup route
registration route if present
admin user create route
admin user update route
user read route
schema metadata route
```

Outcome:

- API accepts and returns User + UserDetail where required

## Phase 6 — Frontend Integration

Update:

```txt
registration/setup form
admin user create/edit form
user detail display
user list/search UI where applicable
```

Outcome:

- UI respects schema metadata
- forms include appropriate UserDetail fields

## Phase 7 — Search and Reporting Readiness

Add:

```txt
searchable field mapping
repository filters
optional indexes
list DTO enrichment
```

Outcome:

- searchable detail fields can drive user search/filtering

## Phase 8 — Documentation and Alignment

Update docs and decision log.

Outcome:

- developers and coding agents understand the feature
- R2A Enterprise remains aligned with architecture and documentation

---

## 22. Open Design Decisions

The following should be decided before implementation begins:

1. Should `User` store a `detailId`, or should `UserDetail.userId` be the only relation?

   Recommendation: use `UserDetail.userId` as the authoritative relation. Avoid storing `detailId` unless needed.

2. Should setup require all `useInRegistration` fields?

   Recommendation: yes, if they are also `required`.

3. Should generated values be implemented through per-field generator names?

   Recommendation for V1: keep generation logic in service code, not schema file.

4. Should schema metadata be exposed through API or imported directly by frontend?

   Recommendation: expose through API if client/server separation matters; direct import may be acceptable inside a monorepo but can blur boundaries.

5. Should `UserDetail` fields be top-level fields or stored inside `attributes`?

   Recommendation: top-level fields generated from schema, because runtime mutability is not required and the project benefits from clearer persistence/query behavior.

---

## 23. Recommended Final Model

Recommended V1 model:

```txt
src/config/user-detail.schema.ts
        ↓
Schema validation utility
        ↓
Mongoose UserDetail schema factory
        ↓
UserDetail model
        ↓
UserDetailRepository
        ↓
UserDetailValidationService
        ↓
UserDetailService
        ↓
UserService aggregate methods
        ↓
API routes/controllers
        ↓
Frontend forms/read views/search filters
```

Core rule:

```txt
R2A Enterprise user lifecycle = User lifecycle + UserDetail lifecycle.
```

---

## 24. Final Recommendation

Implement `UserDetail Blueprint` as a file-driven, non-runtime, developer-owned extension system.

Use:

```txt
src/config/user-detail.schema.ts
```

Do not introduce runtime schema editing.
Do not introduce a DB schema registry in V1.
Do not store arbitrary unknown fields.
Do not spread detail creation logic across controllers.

The correct implementation center is the service layer:

```txt
UserService orchestrates the aggregate.
UserDetailService owns detail-specific logic.
Repositories persist only.
Controllers translate HTTP only.
```

This approach preserves R2A’s architectural discipline while giving R2A Enterprise a practical, extensible, backend-friendly identity model suitable for consulting/client projects.
