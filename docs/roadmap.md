# Roadmap

## Goal

Ship the smallest MVP that proves this behavior:

**A programmer discovers an interesting project, expresses interest, the creator sees them, they contact each other, and they start building.**

Do not optimize the roadmap for number of features.

---

# Milestone 0 — Repository foundation

## Outcome

A clean, reproducible application that every agent can run and validate.

## Tasks

- [ ] Add `docs/product-spec.md`
- [ ] Add `docs/architecture.md`
- [ ] Add `docs/roadmap.md`
- [ ] Add `docs/database-schema.md`
- [ ] Scaffold Next.js App Router with TypeScript
- [ ] Configure Tailwind CSS
- [ ] Add linting and typecheck scripts
- [ ] Initialize Supabase local development
- [ ] Add `.env.example`
- [ ] Add basic CI for install/lint/typecheck/build
- [ ] Confirm fresh clone can boot

## Exit criteria

```text
npm install
npx supabase start
npm run dev
npm run lint
npm run typecheck
npm run build
```

all work from a clean setup.

---

# Milestone 1 — Database, auth, and seed content

## Outcome

The application has a secure data model, sign-in, and enough sample projects to make the product immediately browsable.

## Tasks

### Database

- [ ] Create enums
- [ ] Create `profiles`
- [ ] Create `user_contacts`
- [ ] Create `projects`
- [ ] Create `project_interests`
- [ ] Create `notifications`
- [ ] Add constraints/indexes
- [ ] Enable RLS
- [ ] Add RLS policies
- [ ] Add updated-at trigger
- [ ] Add interest → creator notification trigger
- [ ] Generate TypeScript database types

### Auth

- [ ] Configure GitHub OAuth
- [ ] Add sign-in/sign-out
- [ ] Create profile row after first authenticated use
- [ ] Protect authenticated routes/actions

### Seed

- [ ] Add 15–30 project ideas
- [ ] Include games, CLI tools, web experiments, educational projects, weird projects, and Tunisian/local ideas
- [ ] Avoid making every seed project polished or startup-like

### Tests

- [ ] Database schema tests
- [ ] RLS tests
- [ ] Ownership tests
- [ ] Privacy tests

## Exit criteria

- anonymous user can read projects
- authenticated user exists with a profile
- private data is not publicly readable
- database can be recreated from migrations + seed

---

# Milestone 2 — Discover

## Outcome

A visitor immediately sees interesting projects and can move through them quickly.

## Tasks

- [ ] Homepage project feed
- [ ] Prominent project card
- [ ] Show title
- [ ] Show description
- [ ] Show technology
- [ ] Show expected scope
- [ ] Show looking-for text
- [ ] Show status
- [ ] Show tags when present
- [ ] Show collaboration/location context
- [ ] `Next Project` button
- [ ] normal vertical scrolling
- [ ] keyboard accessible navigation
- [ ] mobile layout
- [ ] project details page
- [ ] loading state
- [ ] end-of-feed state
- [ ] error state

## Explicitly avoid

- recommendation algorithm
- swipe-only navigation
- infinite-animation effects
- likes
- follower information
- engagement counters

## Exit criteria

A first-time visitor can understand a project in a few seconds and browse multiple projects on desktop and mobile.

---

# Milestone 3 — Post a project

## Outcome

An authenticated user can turn an idea into a visible project.

## Tasks

- [ ] Create project form
- [ ] Required field validation
- [ ] Optional field validation
- [ ] Collaboration mode
- [ ] General location
- [ ] Status
- [ ] Create action
- [ ] My Projects page
- [ ] Edit project
- [ ] Delete project with confirmation
- [ ] Ownership enforcement
- [ ] Useful server error messages

## Exit criteria

A signed-in user can create, edit, and delete only their own project.

---

# Milestone 4 — Let's Build It

## Outcome

The core interaction works end-to-end.

## Tasks

- [ ] Main `Let's Build It` CTA
- [ ] Sign-in redirect for anonymous visitors
- [ ] Participation choice:
  - [ ] Coding
  - [ ] Design
  - [ ] Ideas
  - [ ] Testing
  - [ ] Learning
  - [ ] Not sure yet
- [ ] Optional short message
- [ ] Submit interest
- [ ] Prevent creator from joining own project
- [ ] Prevent duplicate interest
- [ ] Success state
- [ ] Allow user to see that they already expressed interest
- [ ] Create creator notification

## Exit criteria

User A can express interest in User B's project exactly once, and User B receives a private notification.

This is the first milestone where the central product loop is truly alive.

---

# Milestone 5 — Creator connects with interested people

## Outcome

A creator can see who wants to help and has enough information to contact them.

## Tasks

- [ ] Project management/details view for creator
- [ ] List interested users
- [ ] Display participation type
- [ ] Display optional interest message
- [ ] Display basic profile
- [ ] Display permitted preferred contact information
- [ ] Mark/read notification behavior
- [ ] Project status changes:
  - [ ] Idea
  - [ ] Looking for people
  - [ ] Building
  - [ ] Completed
  - [ ] Abandoned

## Exit criteria

Project creator can discover an interested user and contact them outside the platform without any private information leaking to unrelated users.

---

# Milestone 6 — MVP quality pass

## Outcome

The core product is safe and pleasant enough for the first 10–50 users.

## Tasks

### QA

- [ ] Core Playwright flows
- [ ] RLS regression tests
- [ ] unauthorized mutation tests
- [ ] duplicate-interest test
- [ ] empty/error/loading states

### Accessibility

- [ ] semantic structure
- [ ] visible focus states
- [ ] keyboard navigation
- [ ] accessible labels
- [ ] contrast review
- [ ] reduced-motion behavior
- [ ] mobile viewport review

### Security/privacy

- [ ] no raw HTML rendering
- [ ] validate external URLs
- [ ] verify all exposed tables have RLS
- [ ] verify no secrets in repository
- [ ] verify contact details are private
- [ ] verify interests are private

### Performance

- [ ] avoid unnecessary client components
- [ ] avoid large dependencies
- [ ] reasonable feed pagination
- [ ] optimize any images used in UI

## Exit criteria

Lint, typecheck, build, database tests, and core E2E tests pass.

---

# Milestone 7 — Closed alpha launch

## Outcome

The product is used by real Tunisian programmers.

## Launch checklist

- [ ] Hosted app works
- [ ] Hosted database migrations applied
- [ ] GitHub OAuth callback configured
- [ ] 15–30 seed projects visible
- [ ] Test account flow in production
- [ ] Test project creation in production
- [ ] Test interest submission in production
- [ ] Test creator visibility in production
- [ ] Invite 10–50 people
- [ ] Provide one simple feedback channel

## What to observe

Do people naturally:

1. browse projects?
2. click `Let's Build It`?
3. send a useful message?
4. contact each other?
5. actually start building?

---

# Milestone 8 — Measure before adding features

Do not immediately add new features after launch.

First review:

- number of projects
- number receiving at least one interest
- number of interest submissions
- number of unique interested users
- number moved to `building`
- number moved to `completed`
- qualitative reasons people did not connect

Only then decide what deserves the next milestone.

---

# Not on this roadmap until validated

Do not schedule these for V1:

- chat
- native mobile app
- AI recommendations
- advanced matching
- reputation
- followers
- likes/karma
- payments
- ads
- gamification
- advanced analytics
- microservices
- complex search
- enterprise features

---

# Recommended build order

```text
Foundation
   ↓
Database + Auth + Seed
   ↓
Project Feed
   ↓
Create/Edit Project
   ↓
Let's Build It
   ↓
Creator Interest View
   ↓
Status Updates
   ↓
QA/Security/Accessibility
   ↓
Closed Alpha
```

The product is not complete when the feed looks good.

It is complete enough to test when:

**Person A finds Person B's project → expresses interest → Person B sees Person A → they can contact each other.**
