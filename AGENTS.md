# AGENTS.md

## Project

This repository contains the MVP for a Tunisia-first community platform where programmers discover fun, small software projects and find people to build them with.

The core loop is:

> **Discover a project → understand it quickly → “Let's Build It” → connect with interested people → build something together.**

The platform is intentionally lightweight, community-oriented, and playful.

It is **not** a job board, professional networking platform, startup marketplace, or general-purpose social network.

---

# 1. Your Role as an Agent

You are an engineering agent working as part of a larger team.

You do **not** own the product.

You do **not** have authority to redefine product requirements.

Your job is to implement clearly defined requirements while preserving the existing architecture, UX, security, and simplicity of the project.

Before making significant changes:

1. Read this file.
2. Read `docs/product-spec.md`.
3. Read any relevant architecture or technical documentation.
4. Inspect the existing implementation.
5. Understand how your changes interact with existing functionality.

If requirements are ambiguous, prefer the simplest interpretation that satisfies the product specification.

If a requirement conflicts with the product specification, **do not silently invent a solution**. Document the conflict and ask for clarification when possible.

---

# 2. Product Principles

These principles apply to every technical and product decision.

## 2.1 Project-first

The project is the center of the platform.

People should discover interesting things to build before worrying about profiles, followers, reputation, or personal branding.

## 2.2 Small projects are valuable

A project does not need to be commercially useful or impressive.

Weekend projects, experiments, learning projects, weird ideas, games, tools, and intentionally stupid ideas are all valid.

## 2.3 Fun over corporate

The product should feel informal, approachable, and playful.

Avoid UX patterns that make the platform feel like:

* LinkedIn
* a job board
* a corporate project-management tool
* a startup accelerator

## 2.4 Minimize friction

A user should be able to:

1. discover a project,
2. understand it quickly,
3. express interest,

with as little friction as possible.

## 2.5 Simplicity over sophistication

Prefer the simplest architecture and implementation that can satisfy the requirements.

Do not introduce complexity because it might become useful someday.

## 2.6 $0 budget

The project is initially being developed with effectively no budget.

Prefer free/open-source solutions and free tiers.

Do not introduce paid infrastructure, paid APIs, or unnecessary external services without explicit approval.

---

# 3. Source of Truth

The following documents define the project:

```text
docs/product-spec.md
docs/architecture.md
docs/roadmap.md
```

If these documents do not yet exist, do not invent their contents.

`docs/product-spec.md` is the primary source of truth for product behavior.

Code should implement the specification, not replace it.

If implementation and documentation disagree, determine whether the implementation or documentation is incorrect before making changes.

---

# 4. MVP Scope

The MVP focuses on the following core functionality:

## Public

* Browse projects
* Vertically scroll through projects
* View project details
* Create projects
* Express interest in projects

## Project creators

* Create projects
* Edit projects
* Delete/archive projects
* View people interested in their projects
* Contact interested people
* Update project status

## Users

* Basic account
* Basic profile/contact information
* Express interest in projects

The initial implementation does **not** need to provide every possible social feature.

---

# 5. Explicitly Out of Scope

Do not implement any of the following unless the product specification is explicitly updated:

* Built-in chat
* Mobile applications
* AI project recommendations
* Complex recommendation algorithms
* Follower systems
* Public likes/karma
* Reputation systems
* Payments
* Advertising
* Microservices
* Enterprise features
* Complex analytics
* Cryptocurrency
* NFT/blockchain features
* Unnecessary gamification
* Complex notification infrastructure
* Over-engineered search
* Infrastructure designed for millions of users

A feature being technically interesting is not sufficient justification for adding it.

---

# 6. Architecture Principles

## 6.1 Keep the architecture boring

Prefer:

* straightforward application structure
* clear boundaries
* minimal dependencies
* conventional patterns
* easily understandable code

Avoid:

* premature abstractions
* unnecessary design patterns
* speculative infrastructure
* distributed systems
* unnecessary services

## 6.2 One application first

The MVP should remain a simple application unless there is a concrete technical reason to split it.

Do not introduce microservices.

## 6.3 Minimize dependencies

Before adding a dependency, ask:

1. Do we actually need it?
2. Can the functionality reasonably be implemented with the existing stack?
3. Is the dependency maintained?
4. Does it increase deployment or security complexity?

Prefer existing dependencies when possible.

---

# 7. Database Rules

Database changes must be deliberate.

Before changing the schema:

1. Understand existing tables and relationships.
2. Check existing migrations.
3. Preserve backward compatibility where practical.
4. Document important schema changes.
5. Consider authorization and data ownership.

Never store sensitive information unnecessarily.

Never expose private user information through public APIs.

Database migrations must be reproducible from a clean environment.

---

# 8. Authentication and Authorization

Authentication and authorization are separate concerns.

Every protected operation must verify that the current user is authorized to perform it.

Examples:

* A user can edit their own projects.
* A user cannot edit another user's project.
* A user cannot access private information belonging to another user.
* A project creator can see appropriate interest submissions for their project.

Never rely solely on frontend checks for authorization.

Authorization must ultimately be enforced server-side/database-side as appropriate for the chosen architecture.

---

# 9. Privacy

The platform is community-oriented, but user privacy matters.

Do not expose:

* email addresses publicly by default
* private contact information
* authentication credentials
* secrets
* internal identifiers unnecessarily
* private messages or interest submissions

Contact information should only be exposed according to the intended product flow.

Never log passwords, tokens, API keys, or other secrets.

---

# 10. Security

Treat all user-provided content as untrusted.

This includes:

* project titles
* descriptions
* tags
* links
* contact information
* messages
* profile information

Protect against common issues such as:

* XSS
* injection attacks
* broken authorization
* insecure direct object references
* CSRF where relevant
* unsafe redirects
* malicious file uploads
* leaked secrets

Do not disable security protections merely to make development easier.

---

# 11. UX Requirements

The main project feed is one of the defining features of the product.

Projects should be presented in a vertically scrolling, TikTok-inspired format.

However:

**Do not blindly copy TikTok.**

The purpose of the interaction is rapid project discovery, not maximizing addictive engagement.

A user should be able to understand a project quickly.

Important information should be visually obvious:

* Project name
* What is being built
* Why it is interesting
* Technology
* Expected time commitment
* Who is needed
* “Let's Build It” action

Mobile usability is important even if there is no native mobile application.

The web experience should work well on small screens.

---

# 12. UI Philosophy

Prefer:

* simple layouts
* strong typography
* clear hierarchy
* responsive design
* playful but not childish visuals
* fast interactions
* obvious calls to action
* accessible controls

Avoid:

* excessive animations
* visual clutter
* unnecessary modals
* huge forms
* complicated navigation
* dark patterns
* engagement tricks

Animations should support understanding and interaction rather than exist merely because they look impressive.

---

# 13. Accessibility

Build accessible interfaces from the beginning.

Consider:

* semantic HTML
* keyboard navigation
* visible focus states
* sufficient contrast
* accessible labels
* screen-reader-friendly controls
* reduced-motion preferences
* appropriate heading hierarchy

Do not make a critical action available only through gestures.

For example, vertical swiping can be supported, but users must still have an accessible way to navigate between projects.

---

# 14. Internationalization

The initial community is Tunisia-first.

The platform may eventually support:

* English
* French
* Tunisian Arabic / Arabic

Do not hard-code assumptions that make future localization unnecessarily difficult.

Avoid UI implementations that assume every language has the same text length or direction.

Right-to-left support should be considered when designing the UI, even if it is not part of the first release.

---

# 15. Content

Project descriptions are user-generated content.

Do not assume that project descriptions are trustworthy, safe, or well formatted.

The system should eventually support reporting/moderation mechanisms.

For MVP implementation, avoid building an elaborate moderation system unless required.

Do not silently alter user content.

---

# 16. Testing

Every meaningful feature should have appropriate tests.

Prioritize testing:

* authentication
* authorization
* project creation
* project editing
* project deletion/archive
* expressing interest
* project ownership
* database operations
* important API/server behavior

For UI features, test important user flows where practical.

At minimum, verify that:

1. The application starts successfully.
2. Existing tests pass.
3. New functionality works.
4. No obvious regressions were introduced.

Do not remove or weaken tests simply to make them pass.

---

# 17. Validation Before Completion

Before considering a task complete:

1. Run the relevant test suite.
2. Run linting/type checks if configured.
3. Verify the application builds successfully.
4. Inspect the actual UI for frontend changes.
5. Check mobile/responsive behavior when relevant.
6. Review the diff.
7. Remove debugging code.
8. Ensure no secrets or credentials were added.
9. Ensure unrelated files were not modified.

A task is not complete merely because the code compiles.

---

# 18. Git and Changes

Keep changes focused.

Do not mix unrelated refactors with feature work.

Avoid massive rewrites unless explicitly requested.

Do not modify files unrelated to the task simply because they could be improved.

Do not rewrite working code solely because you prefer a different style.

Commit messages should clearly describe the change.

Example:

```text
feat: add project interest flow
```

rather than:

```text
changes
```

---

# 19. Multi-Agent Development

This repository may be worked on by multiple AI agents.

Assume another agent may be working on a related part of the system.

Before changing shared code:

1. Inspect the current repository state.
2. Check existing documentation.
3. Avoid unnecessary overlapping changes.
4. Keep your changes isolated where practical.

Do not assume that code you did not write is wrong.

Do not overwrite another agent's work without understanding it.

If two approaches conflict, prefer the existing documented architecture.

---

# 20. Agent Responsibilities

Agents should generally work within clearly defined responsibilities.

### Product/UX Agent

Responsible for:

* UX flows
* interaction design
* component behavior
* visual hierarchy
* usability

Should avoid changing backend architecture without justification.

### Frontend Agent

Responsible for:

* UI implementation
* components
* feed
* forms
* responsive behavior
* frontend interactions

### Backend Agent

Responsible for:

* database
* server logic
* APIs
* authentication
* authorization
* data validation

### QA Agent

Responsible for:

* tests
* regression testing
* accessibility checks
* security-oriented testing
* edge cases

### DevOps Agent

Responsible for:

* CI/CD
* deployment
* environment configuration
* infrastructure

These responsibilities may overlap when necessary, but agents should avoid unnecessary cross-domain changes.

---

# 21. Handling Ambiguity

When requirements are unclear:

### First

Check:

* `docs/product-spec.md`
* `docs/architecture.md`
* existing code
* existing tests

### Then

Choose the simplest implementation consistent with those sources.

### Do not

Invent major product features.

Examples of decisions that require explicit product consideration:

* introducing a social/reputation system
* changing how project discovery works
* changing the “Let's Build It” interaction
* adding a new major user type
* adding payments
* introducing advertising
* changing the core project model

---

# 22. Documentation

Important architectural decisions should be documented.

If you introduce a significant technical decision, update the appropriate documentation.

Documentation should explain:

* what the system does
* why important decisions were made
* how developers run it
* how developers test it
* how it is deployed

Do not create documentation for trivial implementation details.

---

# 23. Performance

The feed should feel fast.

Prioritize:

* fast initial rendering
* optimized images
* lazy loading where appropriate
* reasonable bundle size
* efficient database queries
* pagination/incremental loading

Do not prematurely optimize.

Measure or identify a real problem before introducing complex performance infrastructure.

---

# 24. Cost Awareness

Every external service should be evaluated for:

* free-tier availability
* expected limits
* risk of unexpected charges
* whether it is actually necessary

Never assume a free tier is unlimited.

Do not introduce a service that could unexpectedly generate charges without explicit approval.

The project must remain capable of operating at very low cost during its early stage.

---

# 25. Product Decision Rule

When choosing between two technically valid implementations:

Prefer the one that is:

1. Simpler
2. Cheaper
3. Easier to understand
4. Easier to maintain
5. Easier to replace later
6. More aligned with the MVP

Do not optimize for hypothetical future scale.

We are trying to prove the idea first.

---

# 26. Definition of Done

A feature is considered complete when:

* It satisfies the requested product behavior.
* It follows the existing architecture.
* It handles expected error cases.
* Authorization/privacy requirements are respected.
* Appropriate tests exist.
* Existing tests still pass.
* The application builds successfully.
* The UI works on relevant screen sizes.
* No secrets are exposed.
* No unnecessary dependencies were introduced.
* Documentation is updated when necessary.
* The diff contains no unrelated changes.

---

# 27. Most Important Rule

When in doubt:

> **Build the smallest thing that makes the core product loop work.**

The product succeeds if programmers see an interesting project and think:

> **“Yo, let's build it.”**

Every technical decision should help us get closer to that.
