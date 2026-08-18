# Agent Build Plan

## Purpose

This file describes how to start multiple engineering agents without letting them invent product behavior or overwrite each other's work.

Every agent must begin by reading:

1. `AGENTS.md`
2. `docs/product-spec.md`
3. `docs/architecture.md`
4. `docs/roadmap.md`
5. relevant existing code/tests

No agent should be told only "build the app".

Give agents narrow tasks with explicit acceptance criteria.

---

# 1. Working model

Use:

**one issue/task → one agent → one branch → one focused diff**

Recommended branch names:

```text
agent/foundation
agent/database-auth
agent/feed
agent/project-crud
agent/interest-flow
agent/creator-view
agent/qa
agent/deploy
```

Agents should not merge their own work into `main` unless that is already your repository workflow.

Review each diff before merging.

---

# 2. Do not start every agent at once

The first work has dependencies.

Start in this sequence:

```text
A. Foundation
      ↓
B. Database/Auth
      ↓
C. Feed + Project CRUD
      ↓
D. Interest flow
      ↓
E. Creator view
      ↓
F. QA
      ↓
G. Deployment
```

Some work can become parallel after the shared foundation exists.

---

# 3. Agent 1 — Foundation

## Role

Frontend/DevOps foundation agent.

## Ownership

Primarily:

```text
package.json
src/app/*
src/lib/*
.env.example
basic config
GitHub Actions
```

Do not implement product features beyond a basic shell.

## Prompt

```text
Read AGENTS.md, docs/product-spec.md, docs/architecture.md, and docs/roadmap.md before changing anything.

Task: implement Milestone 0 repository foundation only.

Requirements:
- Scaffold/normalize the repository as a Next.js App Router TypeScript application.
- Configure Tailwind using the current documented Next.js/Tailwind approach.
- Use npm as the package manager unless the repository already uses another package manager.
- Add scripts for dev, build, lint, typecheck.
- Add Supabase client/server utility scaffolding using the current recommended Supabase SSR approach.
- Add .env.example with variable names only.
- Initialize Supabase project structure if it is not already present.
- Add a minimal CI workflow that runs install, lint, typecheck, and build.
- Keep UI to a minimal application shell. Do not build the feed yet.
- Do not add component libraries, state-management libraries, analytics, or unrelated dependencies.

Validation:
- npm install succeeds
- npm run lint succeeds
- npm run typecheck succeeds
- npm run build succeeds
- report exactly what you changed and any setup step that requires a human secret/account

Keep the diff focused. Do not modify product requirements.
```

## Merge before continuing?

**Yes.**

This establishes shared files other agents will depend on.

---

# 4. Agent 2 — Database + Auth

## Role

Backend agent.

## Ownership

Primarily:

```text
supabase/**
src/lib/supabase/**
src/types/database.ts
auth callback/sign-in code
database-focused tests
```

## Prompt

```text
Read AGENTS.md, docs/product-spec.md, docs/architecture.md, docs/database-schema.md, and docs/roadmap.md.

Task: implement Milestone 1 database/auth foundation.

Requirements:
- Create the initial migration matching docs/database-schema.md.
- Treat the supplied initial-schema SQL as a draft: review it for correctness and improve it when required without changing product behavior.
- Enable RLS on every application table.
- Implement policies for:
  * public project reads
  * own profile edits
  * private contact information
  * project ownership
  * private interests
  * creator visibility into interests
  * notification privacy
- Add constraints preventing duplicate project interest and self-interest.
- Add the project-interest notification creation mechanism.
- Add local seed data with representative project records.
- Generate current Supabase TypeScript database types.
- Implement GitHub OAuth using Supabase's current recommended Next.js server-side auth flow.
- Never expose service-role credentials in browser code.
- Add database tests, especially RLS/privacy/ownership tests.

Do not:
- add chat
- add recommendation logic
- add email notification infrastructure
- add new tables unrelated to the documented schema
- weaken RLS to make development easier

Validation:
- npx supabase db reset
- npx supabase test db
- npm run lint
- npm run typecheck
- npm run build

Report any Supabase/GitHub dashboard configuration the human must perform.
```

## Merge before continuing?

**Yes**, especially the migration and generated types.

---

# 5. Agent 3 — Product/UX specification

This agent can run in parallel with Agent 2 because it should edit documentation only.

## Ownership

```text
docs/ux-flows.md
```

## Prompt

```text
Read AGENTS.md and docs/product-spec.md.

Task: write docs/ux-flows.md for the MVP.

Document only these flows:
1. anonymous project browsing
2. authenticated browsing
3. create/edit project
4. Let's Build It
5. creator reviews interested people
6. notification handling
7. project status change

For each flow define:
- entry point
- visible information
- primary action
- success state
- error/empty states
- mobile considerations
- keyboard/accessibility considerations

Preserve the product's informal/playful tone.
Do not invent social features, likes, followers, chat, ranking, or gamification.
Do not change backend architecture.
```

This gives frontend agents a behavioral reference without letting them invent product features.

---

# 6. Agent 4 — Project feed

## Role

Frontend agent.

## Dependency

Foundation + database types/schema merged.

## Ownership

Prefer:

```text
src/app/(public)/**
src/components/project/**
```

Avoid changing migrations.

## Prompt

```text
Read AGENTS.md, docs/product-spec.md, docs/architecture.md, docs/roadmap.md, docs/ux-flows.md, and the existing database types.

Task: implement Milestone 2 — Discover.

Build:
- public homepage project feed
- one prominent project at a time
- project card with title, description, technology, expected scope, looking-for, status, tags, and collaboration/location context
- explicit Next Project action
- normal vertical scrolling
- project details page
- loading/error/end states
- responsive mobile experience
- keyboard-accessible controls and visible focus states
- reduced-motion support

Use real Supabase project data/seed data.

Do not:
- implement personalized recommendations
- implement likes/follows
- build swipe-only navigation
- add heavy animation libraries
- add a new design system dependency unless already present

The UI should feel informal and playful, but not childish or corporate.

Validate desktop and mobile behavior and run lint/typecheck/build.
```

---

# 7. Agent 5 — Project CRUD

## Role

Full-stack feature agent.

## Dependency

Database/auth merged.

## Ownership

Prefer:

```text
src/app/projects/new/**
src/app/my-projects/**
src/app/projects/[id]/edit/**
src/actions/projects.*
src/components/project/project-form*
```

## Prompt

```text
Read AGENTS.md, product spec, architecture, roadmap, UX flows, and current schema.

Task: implement Milestone 3 — project creation/editing/deletion.

Requirements:
- authenticated project creation
- all required product fields
- documented optional fields
- collaboration mode and general location
- server-side validation
- My Projects view
- edit own project
- delete own project with clear confirmation
- useful success/error states
- never trust creator_id from a client form
- enforce ownership with authenticated user + RLS

Do not add drafts, approval workflows, team management, or analytics.

Add appropriate tests.
Run lint/typecheck/build and relevant tests.
```

Agent 4 and Agent 5 may run in parallel **only if their file ownership is kept separate**.

---

# 8. Agent 6 — Let's Build It

## Role

Full-stack feature agent.

## Dependency

Feed, auth, schema.

## Prompt

```text
Read all project docs first.

Task: implement Milestone 4 — the complete Let's Build It flow.

Requirements:
- main CTA on project card/details
- anonymous user is sent through sign-in and can return to the project
- authenticated user chooses exactly one participation type:
  Coding, Design, Ideas, Testing, Learning, Not sure yet
- optional message
- submit interest securely
- authenticated user_id comes from session, never form input
- creator cannot express interest in own project
- duplicate interest is handled gracefully
- successful submission gives a clear state
- existing interest is shown rather than inviting repeated submission
- creator receives an in-app notification through the existing database mechanism

No built-in chat.
No acceptance/ranking workflow.

Add tests for:
- normal interest
- duplicate
- self-interest
- unrelated-user privacy
- anonymous path

Run lint/typecheck/build and database/E2E tests as applicable.
```

---

# 9. Agent 7 — Creator interest view

## Role

Full-stack feature agent.

## Prompt

```text
Read all project docs first.

Task: implement Milestone 5 — creator sees interested people and can contact them.

Requirements:
- private creator view for each owned project
- list interests
- show participation type
- show optional interest message
- show appropriate public profile fields
- show preferred private contact only where authorization allows it
- unrelated users must not access interest/contact data even by directly requesting a URL
- notification list/unread behavior
- mark notifications read
- creator can change project status to Idea, Looking for people, Building, Completed, Abandoned

Do not add chat, team membership, acceptance ranking, reputation, or applicant statuses.

Add authorization/privacy tests.
Run all validation commands.
```

---

# 10. Agent 8 — QA/security pass

## Role

QA agent.

## Prompt

```text
Read AGENTS.md and every project document. Inspect the complete implementation before changing code.

Task: perform Milestone 6 quality/security/accessibility pass.

Priorities:
1. authentication
2. authorization
3. RLS/private data
4. project ownership
5. project creation/editing/deletion
6. Let's Build It
7. creator interest access
8. notifications
9. mobile/accessibility
10. regressions

Add/fix tests rather than weakening tests.

Check:
- direct URL access as unauthorized users
- forged IDs in requests
- duplicate interest
- self-interest
- private contact leaks
- private interest leaks
- XSS/raw HTML
- unsafe external URLs
- keyboard navigation
- visible focus
- reduced motion
- small-screen layouts
- loading/error/empty states

Run:
- database reset
- database tests
- lint
- typecheck
- build
- core E2E tests

Return a short report grouped into:
- fixed issues
- remaining blockers
- non-blocking follow-ups

Do not add new product features.
```

---

# 11. Agent 9 — Deployment

## Role

DevOps agent.

## Prompt

```text
Read AGENTS.md, architecture, and roadmap.

Task: prepare the closed-alpha deployment only.

Requirements:
- deploy current Next.js application to Vercel
- configure environment variables without committing secrets
- configure hosted Supabase project
- apply reviewed migrations
- configure GitHub OAuth production callback/redirects
- ensure CI runs on pull requests
- document exact deployment/recovery steps
- verify production login, feed, create project, interest flow, creator view

Do not:
- introduce Kubernetes
- introduce containers in production unless required by the chosen host
- introduce microservices
- introduce paid monitoring
- introduce complex staging infrastructure

Keep infrastructure replaceable and inexpensive.
```

---

# 12. Human checkpoints

Stop and review manually after these points:

## Checkpoint 1 — Foundation

Confirm:

- stack is correct
- repository remains simple
- no unnecessary dependencies

## Checkpoint 2 — Schema/Auth

Confirm:

- fields match product spec
- RLS is understandable
- contact data is private
- migration resets cleanly

## Checkpoint 3 — Feed

Use the product yourself.

Ask:

- can I understand a project quickly?
- does it feel fun rather than corporate?
- is Let's Build It obvious?
- does mobile feel good?

## Checkpoint 4 — Core loop

Use two real test accounts:

```text
Account A creates project
Account B finds project
Account B clicks Let's Build It
Account B submits message
Account A receives notification
Account A sees B's contact
```

If that fails, do not work on secondary features.

---

# 13. Multi-agent conflict rules

Before each agent starts:

```bash
git status
git pull --rebase
```

Give the agent the latest commit SHA/branch state if your agent system supports it.

Avoid simultaneous changes to:

```text
package.json
package-lock.json
supabase/migrations/*
src/types/database.ts
global layout/navigation
```

If two agents need the same shared file, serialize those tasks.

After an agent finishes:

```bash
git diff --check
git status
npm run lint
npm run typecheck
npm run build
```

Then review the diff before merge.

---

# 14. What you should start today

Start only these first:

### Agent A
Foundation.

### Agent B
Product/UX flow documentation.

After Agent A merges:

### Agent C
Database/Auth.

After Agent C merges:

### Agent D
Project feed.

### Agent E
Project CRUD.

Only then start the `Let's Build It` agent.

This keeps agents productive without giving five agents permission to redesign the same repository at once.

---

# 15. The rule for every agent prompt

End each feature prompt with this:

```text
Before coding:
- read AGENTS.md and all relevant docs
- inspect existing code and tests
- state the files/areas you expect to change

During implementation:
- keep the diff focused
- preserve existing architecture
- do not add out-of-scope product features

Before completion:
- run relevant tests
- run lint/typecheck
- run build
- inspect the diff
- report what changed, validation performed, and any remaining limitation
```

This repeated structure is useful because agents are much safer when their task, boundaries, and definition of done are explicit.
