# Database Schema

## Purpose

This schema is intentionally small and centered on projects and collaboration.

Application tables:

1. `profiles`
2. `user_contacts`
3. `projects`
4. `project_interests`
5. `notifications`

Authentication identities live in Supabase's `auth.users` table.

---

## 1. `profiles`

Public, minimal identity information.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK; references `auth.users.id` |
| `display_name` | text | required |
| `avatar_url` | text | optional |
| `bio` | text | optional, short |
| `location` | text | optional, general location |
| `created_at` | timestamptz | generated |
| `updated_at` | timestamptz | generated |

### Privacy

These fields can be public because they intentionally contain no private contact information.

Do not automatically copy the authentication email address into this table.

---

## 2. `user_contacts`

Private preferred contact information.

| Column | Type | Notes |
|---|---|---|
| `user_id` | uuid | PK; references profile/user |
| `contact_type` | enum | Discord, Telegram, email, GitHub, other |
| `contact_value` | text | required |
| `updated_at` | timestamptz | generated |

### Visibility

Readable by:

- owner
- creator of a project for which this user submitted an interest

Not publicly readable.

This separation prevents accidental contact-information leakage through public profile queries.

---

## 3. `projects`

Core product object.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `creator_id` | uuid | references profile |
| `title` | text | required |
| `description` | text | required |
| `technology` | text | required |
| `expected_scope` | enum | few hours/weekend/1–2 weeks/month/ongoing |
| `looking_for` | text | required |
| `tags` | text[] | optional |
| `skill_level` | enum | optional |
| `collaboration_mode` | enum | online/hybrid/local |
| `location` | text | optional for online; required for hybrid/local |
| `github_url` | text | optional |
| `media_url` | text | optional external URL |
| `existing_progress` | text | optional |
| `status` | enum | idea/looking/building/completed/abandoned |
| `created_at` | timestamptz | generated |
| `updated_at` | timestamptz | generated |

### Notes

`technology` remains free text.

Do not build a technology taxonomy in V1.

`tags` are simple text values.

Do not create tag popularity/reputation systems.

---

## 4. `project_interests`

Represents **Let's Build It**.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `project_id` | uuid | project |
| `user_id` | uuid | interested user |
| `participation_type` | enum | coding/design/ideas/testing/learning/not sure |
| `message` | text | optional |
| `created_at` | timestamptz | generated |

### Constraints

- unique `(project_id, user_id)`
- creator cannot express interest in own project
- message has a small maximum length

### Visibility

Readable by:

- interested user
- project creator

Never public.

---

## 5. `notifications`

Small in-app notification table.

| Column | Type | Notes |
|---|---|---|
| `id` | uuid | PK |
| `user_id` | uuid | recipient |
| `type` | enum | initially only project_interest |
| `project_id` | uuid | related project |
| `actor_user_id` | uuid | interested person |
| `read_at` | timestamptz | nullable |
| `created_at` | timestamptz | generated |

A notification is generated when an interest is created.

Only the recipient can read or mark it read.

---

# Relationships

```text
auth.users
    │
    └── profiles
          │
          ├── user_contacts
          │
          ├── projects
          │      │
          │      └── project_interests
          │               │
          │               └── interested profile
          │
          └── notifications
```

---

# Important indexes

At minimum:

```text
projects(created_at desc)
projects(creator_id)
projects(status)
project_interests(project_id)
project_interests(user_id)
notifications(user_id, created_at desc)
```

The unique interest constraint also creates an index for `(project_id, user_id)`.

---

# RLS policy matrix

| Table | Anonymous | Authenticated public read | Owner | Project creator |
|---|---|---|---|---|
| profiles | read | read | update own | read |
| user_contacts | no | no | read/write own | read only when user expressed interest in creator's project |
| projects | read | read | create/update/delete own | same as owner |
| project_interests | no | no general read | create/read own | read interests for own projects |
| notifications | no | no | read/update own | only if recipient |

---

# Data deliberately not modeled in V1

Do not add tables for:

- follows
- likes
- reputation
- comments
- chat/messages
- teams
- roles inside teams
- payments
- analytics events
- recommendations
- applications
- resumes

If a new table is proposed, first verify that it is necessary for the core product loop.
