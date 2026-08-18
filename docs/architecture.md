# Architecture

## 1. Purpose

This document defines the technical architecture for the MVP described in `docs/product-spec.md`.

The goal is to build the smallest reliable application that supports the core loop:

**Discover project → express interest → creator sees interested person → people contact each other → build together.**

The architecture intentionally optimizes for:

- simplicity
- low maintenance
- effectively $0 initial operating cost
- fast iteration
- strong authorization and privacy
- easy replacement later if the product proves itself

It does **not** optimize for hypothetical large-scale traffic.

---

## 2. Architecture decision summary

### Application

- **Next.js App Router**
- **TypeScript**
- **Tailwind CSS**
- One full-stack web application
- Server Components for read-heavy pages where practical
- Server Actions or Route Handlers for mutations where appropriate
- No separate backend service
- No microservices

### Database and authentication

- **Supabase**
  - Postgres database
  - Supabase Auth
  - Row Level Security (RLS)
- Database schema and migrations committed to the repository
- Generated TypeScript database types committed or generated during development

### Hosting

- **Vercel Hobby** for the Next.js application only while the initial MVP/closed alpha is genuinely non-commercial
- **Supabase Free** for database/auth
- **GitHub** for source control and CI

### Notifications

- V1 notifications are **in-app only**
- No email notification provider is required
- A notification row is created when someone expresses interest in a project

### Media

For V1, project media is an **optional external URL**.

Do not implement file uploads initially.

If real usage proves uploads are important, Supabase Storage can be added later.

### Internationalization

- Initial interface can ship in English
- All user-generated text is Unicode
- Components must not assume fixed text lengths
- Avoid layout decisions that make future French/Arabic/RTL support difficult
- Do not add a full i18n framework until multiple UI languages are actually being implemented

---

## 3. Why this stack

The product is a small community platform, not an infrastructure project.

Next.js gives one codebase for:

- UI
- server-rendered pages
- protected application logic
- server-side mutations
- deployment

Supabase gives one managed service for:

- Postgres
- authentication
- authorization through RLS
- migrations/local development

This keeps the number of moving parts small.

---

## 4. Repository structure

Recommended structure:

```text
.
├── AGENTS.md
├── docs/
│   ├── product-spec.md
│   ├── architecture.md
│   ├── roadmap.md
│   └── database-schema.md
├── src/
│   ├── app/
│   │   ├── (public)/
│   │   ├── (auth)/
│   │   ├── projects/
│   │   ├── my-projects/
│   │   ├── notifications/
│   │   └── auth/
│   ├── components/
│   │   ├── project/
│   │   ├── interest/
│   │   ├── navigation/
│   │   └── ui/
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts
│   │   │   └── server.ts
│   │   ├── validation/
│   │   └── utils/
│   ├── actions/
│   └── types/
│       └── database.ts
├── supabase/
│   ├── config.toml
│   ├── migrations/
│   ├── tests/
│   │   └── database/
│   └── seed.sql
├── tests/
│   └── e2e/
├── .env.example
└── package.json
```

Do not create folders merely to satisfy this diagram. Add them when they are needed.

---

## 5. Authentication

### Initial authentication method

Use **GitHub OAuth** for the closed alpha.

Reasons:

- target audience is programmers
- no application password handling
- no dependency on transactional email for the main sign-in path
- simple account creation

If early testers are blocked because they do not have GitHub accounts, add a second provider or email/password based on observed need.

### Session handling

Use Supabase's recommended server-side cookie/session setup for Next.js.

Never:

- expose service-role credentials to the browser
- trust a user ID supplied by a form
- rely only on frontend ownership checks

The authenticated user ID must come from the verified session.

---

## 6. Authorization model

Authorization is enforced primarily with **Postgres Row Level Security**, with server-side checks providing an additional layer.

### Public data

Anyone may read:

- published project data
- non-sensitive public profile data needed to identify a project creator/interested person

### Profile ownership

A user may:

- create/update their own profile
- create/update their own private contact settings

A user may not edit another user's profile.

### Projects

Anyone may read projects.

An authenticated user may:

- create a project where `creator_id = auth.uid()`
- edit only their own projects
- delete only their own projects
- change status only on their own projects

### Project interests

An authenticated user may express interest when:

- they are not the project creator
- the project exists
- they have not already expressed interest in that project

An interest submission is visible to:

- the interested user
- the creator of that project

It is not public.

### Private contact information

A user's private contact information is visible to:

- that user
- a project creator when that user has expressed interest in one of the creator's projects

It is never exposed in public project/profile queries.

### Notifications

A notification is visible only to its recipient.

A user may mark only their own notifications as read.

---

## 7. Core domain model

The MVP uses five main application tables:

1. `profiles`
2. `user_contacts`
3. `projects`
4. `project_interests`
5. `notifications`

See `docs/database-schema.md` and the initial migration for details.

---

## 8. Project feed

The feed is the defining public experience.

### Query behavior

Initial implementation:

- return visible projects ordered by newest first
- fetch a small page, e.g. 10–20 projects
- use cursor/incremental loading when necessary
- do not implement personalized recommendation logic

### UI behavior

The feed should:

- show one project prominently at a time
- support normal scroll
- provide an explicit **Next Project** control
- provide an obvious **Let's Build It** action
- work with keyboard navigation
- respect reduced-motion preferences
- avoid scroll hijacking that harms accessibility

The project should be understandable within seconds.

---

## 9. Project creation and editing

Project forms must validate on the server.

Required:

- title
- description
- technology
- expected scope
- looking for

Optional:

- tags
- skill level
- location
- GitHub repository URL
- media URL
- existing progress

Collaboration mode:

- online
- hybrid / open to meeting
- local

Local/hybrid projects require a general location.

Do not require precise addresses.

---

## 10. "Let's Build It" flow

### Anonymous user

1. Clicks **Let's Build It**
2. Is asked to sign in
3. After authentication, returns to the project

### Authenticated user

1. Clicks **Let's Build It**
2. Chooses one participation type:
   - Coding
   - Design
   - Ideas
   - Testing
   - Learning
   - Not sure yet
3. Optionally writes a short message
4. Submits

The server/database must:

- ensure the user is not the creator
- prevent duplicate interest
- create the interest
- create a notification for the project creator

No chat is created.

---

## 11. Creator workflow

A creator can open a private project management view and see:

- project
- status
- people interested
- participation type
- optional interest message
- interested person's basic profile
- permitted private contact information

The creator contacts the person outside the platform.

Do not implement:

- acceptance workflows
- team-role management
- chat
- applicant ranking
- reputation

unless product requirements are explicitly changed.

---

## 12. Notifications

V1 notification types:

```text
project_interest
```

Example:

> Sami wants to help build "Tiny Tunis Weather CLI".

Notifications are stored in the database.

Required behavior:

- unread indicator
- notifications page/dropdown
- mark as read

No push notifications.
No email notifications.
No realtime subscription is required initially; refresh/navigation is sufficient.

---

## 13. Validation

Use simple explicit validation.

Validate at minimum:

- text lengths
- enum values
- URL shape
- required fields
- ownership
- duplicate interest
- creator cannot express interest in own project

Do not trust client-side validation alone.

A lightweight schema validation library may be used if already in the project or if it materially reduces duplicated validation. Avoid dependency sprawl.

---

## 14. Security

Required:

- Supabase RLS enabled on every exposed application table
- no service-role key in client code
- server-side ownership checks for protected mutations
- escaped/rendered text rather than raw HTML
- external links validated and opened safely
- no arbitrary HTML in project descriptions
- no secrets committed
- `.env.example` contains names only, never real credentials

Project descriptions are plain text in V1.

No Markdown rendering is required initially.

---

## 15. Privacy

Public profile fields should remain intentionally minimal.

Suggested public fields:

- display name
- avatar URL
- short bio
- general location

Private contact data is stored separately.

Do not expose authentication email addresses automatically.

If a user wants an email address used as their contact method, they must explicitly put it in their private preferred contact setting.

---

## 16. Testing strategy

### Database

Use Supabase local development and database tests for:

- table constraints
- RLS
- project ownership
- private interests
- contact visibility
- notification visibility
- duplicate interest prevention

### End-to-end

Use Playwright for a small number of critical flows:

1. public user browses project feed
2. signed-in user creates project
3. owner edits own project
4. non-owner cannot edit project
5. user expresses interest
6. creator sees interested person
7. creator can access allowed contact information
8. unrelated user cannot access interest/contact information

Prefer meaningful flow tests over a huge test suite.

---

## 17. Local development

Use the Supabase CLI and migrations committed to the repository.

Expected setup:

```bash
npm install
npx supabase start
npm run dev
```

Database changes:

```bash
npx supabase migration new <name>
npx supabase db reset
npx supabase test db
```

Generate TypeScript database types:

```bash
npx supabase gen types typescript --local > src/types/database.ts
```

---

## 18. Environment variables

Example:

```text
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

If a server-only secret is introduced later, it must not use the `NEXT_PUBLIC_` prefix.

Do not introduce a Supabase service-role key unless a concrete server-only operation actually requires it.

---

## 19. Deployment

### Web

Deploy Next.js to Vercel Hobby only while the project qualifies for its non-commercial Hobby terms.

If the project becomes commercial or otherwise no longer qualifies, move to an appropriate paid plan or another compatible host. Hosting is intentionally replaceable and must not become an architectural dependency.

### Database

Use one Supabase Free project for the initial hosted alpha.

Be aware that free Supabase projects can be paused after inactivity. For the closed alpha this is an accepted tradeoff; if real users require stronger availability, revisit the hosting tier based on actual usage.

Local development remains migration-driven.

Before pushing database changes:

```bash
npx supabase db push --dry-run
```

Then apply the reviewed migration.

### CI

Initial CI should run:

```text
npm ci
npm run lint
npm run typecheck
npm run build
```

Add database tests and E2E tests once their environments are configured.

Do not build elaborate deployment infrastructure.

---

## 20. Observability and metrics

Do not introduce a large analytics product in V1.

The product's important outcome can be derived from database records and simple manual/SQL reporting:

- projects posted
- projects receiving interest
- unique people expressing interest
- projects moved to `building`
- projects moved to `completed`

Later, if needed, add one explicit event/field for "team formed" rather than trying to infer it from page views.

---

## 21. Known V1 tradeoffs

Accepted tradeoffs:

- newest-first feed rather than recommendations
- GitHub OAuth first rather than many auth methods
- external media URL rather than uploads
- in-app notifications rather than email/push
- contact outside the platform rather than chat
- one hosted Supabase project initially
- basic manual moderation

These are deliberate MVP decisions, not missing architecture.

---

## 22. Change rule

Before introducing a new service, major dependency, queue, background worker, cache layer, search engine, or separate backend:

1. identify a real problem in the existing MVP,
2. confirm the product actually needs the behavior,
3. choose the smallest replacement/addition,
4. update this document.
