# Product Specification

## 1. What is it?

A community platform where programmers discover fun, small project ideas and find other programmers who want to build them together.

The platform starts in Tunisia and is designed around a simple interaction:

> **See something cool → “Let's build it” → meet the people interested → build it.**

It is not primarily a job board, professional network, or startup-founding platform.

The focus is on **small, interesting, educational, experimental, weird, or fun projects**.

---

## 2. Who is it for?

The initial audience is programmers and aspiring programmers in Tunisia, including:

* University students
* Junior developers
* Self-taught programmers
* Experienced developers
* People learning a new language or technology
* Hobbyist programmers
* People who want to build something but don't have a team
* People who want to contribute to projects but don't have their own idea

The platform should be welcoming to beginners.

A project does not need to be impressive or commercially useful to be worth posting.

> “I want to build a stupid game this weekend” is a perfectly valid project.

The platform can eventually expand beyond Tunisia, but Tunisia is the initial community and identity.

---

## 3. What does a project look like?

Every project has a simple proposal.

### Required

**Title**

A short, memorable name.

**Description**

A short explanation of what the creator wants to build and why.

**Technology**

The preferred language, framework, or technology.

Examples:

* Rust
* Python
* JavaScript
* React
* C
* Unity

**Expected scope**

Examples:

* A few hours
* Weekend
* 1–2 weeks
* A month
* Ongoing

**Looking for**

What kind of people the creator wants.

Examples:

* “Looking for one other Rust developer.”
* “I can handle the backend; looking for someone interested in frontend.”
* “Beginners welcome.”
* “Looking for someone interested in game design.”

### Optional

* Tags
* Skill level
* Location
* GitHub repository
* Screenshot/video
* Existing progress
* Discord/contact information

---

## 4. The main experience: the project feed

The homepage is a vertically scrolling, TikTok-inspired project feed.

One project is presented prominently at a time.

The user should be able to understand the project within a few seconds.

A project card should communicate:

* What is being built?
* Why is it interesting?
* What technology is involved?
* How much time will it take?
* Who is needed?

The main actions are:

**🔥 Let's Build It**

**↓ Next Project**

Optionally:

**💾 Save**

The goal is not to maximize addictive scrolling.

The goal is to make discovering projects **fast, fun, and effortless**.

---

## 5. “Let's Build It”

The main interaction on every project is:

> **🔥 LET'S BUILD IT**

When someone clicks it, they can optionally explain how they want to participate.

Possible choices:

* 💻 Coding
* 🎨 Design
* 🧠 Ideas
* 🧪 Testing
* 📚 Learning
* 🤷 Not sure yet

They can also leave a short message.

Example:

> “I've been learning Rust and this looks really fun. I'd love to help with the networking part.”

The project creator receives the interest.

The creator can then contact the person and decide whether they want to work together.

The platform does **not** need to provide built-in chat in V1.

---

## 6. Project creator experience

A creator can:

1. Create a project proposal.
2. Publish it.
3. Receive interest from other programmers.
4. Review interested people.
5. Contact them.
6. Form a team outside or inside the platform.
7. Update the project status.

Possible project statuses:

* 💡 Idea
* 🛠️ Looking for people
* 🚀 Building
* ✅ Completed
* 🪦 Abandoned

Abandoned projects should remain visible rather than simply disappearing.

This creates the possibility of eventually **reviving abandoned projects**.

---

## 7. Community identity

The platform should feel informal, friendly, and playful.

It should feel closer to:

> “Yo, this looks cool. Let's make it.”

than:

> “Submit your application to join this development initiative.”

The platform should avoid becoming another LinkedIn.

No focus on:

* Resumes
* Corporate networking
* Followers
* Likes
* Job applications
* Personal branding
* Engagement farming

The **project is the center of the platform**, not the individual.

---

## 8. Tunisia-first

The first community is Tunisian programmers.

Users can optionally indicate a general location such as:

* Tunis
* Ariana
* Ben Arous
* Manouba
* Sousse
* Sfax
* Monastir
* etc.

Projects can indicate whether they are:

* 🌐 Online
* 🤝 Open to meeting in person
* 📍 Local / location-specific

The platform can support English, French, and Tunisian Arabic naturally.

The goal is to create a recognizable Tunisian developer community before considering international expansion.

---

## 9. V1 — What we actually build

The first version should contain only the essential loop.

### Public

* Project feed
* Project cards
* Project details
* Project creation
* Project browsing

### User

* Basic account
* Basic profile/contact information
* Create/edit/delete projects
* Express interest in projects
* Receive notifications about interest

### Creator

* See people interested in their project
* Contact interested people
* Change project status

That's enough.

---

## 10. Explicitly NOT in V1

Do not build:

* Built-in chat
* Mobile application
* AI recommendations
* Complex matching algorithms
* Reputation system
* Follower system
* Public likes/karma
* Advanced analytics
* Payments
* Ads
* Gamification
* Microservices
* Complicated recommendation feeds
* Enterprise features

These can only be considered after we see how people actually use the platform.

---

## 11. $0 constraint

The initial version must be designed to operate at effectively zero cost.

Priorities:

* Free hosting
* Free database tier
* Free authentication
* Free source control
* Minimal infrastructure
* No paid APIs unless absolutely necessary
* No unnecessary external services

The first objective is not to build a scalable startup infrastructure.

The first objective is to prove that the concept works.

---

## 12. Initial content

Before inviting users, the platform should have enough projects to make the feed interesting.

The initial seed could contain approximately 15–30 projects.

Examples:

* Small games
* CLI tools
* Web experiments
* Programming-language experiments
* Educational projects
* Open-source tools
* Local/Tunisian ideas
* Weird or humorous projects
* Weekend challenges

The initial projects can be created by the founders/community specifically to seed the platform.

A new visitor should never be greeted by an empty feed.

---

## 13. Initial launch

The first launch should be small and community-driven.

Target:

**10–50 initial Tunisian programmers.**

Potential communities:

* University CS students
* Developer Discord servers
* Tunisian tech communities
* Programming clubs
* Friends and friends-of-friends
* Local developer meetups
* Online programming communities

The goal is to observe whether people naturally:

> Discover → express interest → contact → form a team → build.

---

## 14. The primary success metric

The first metric is not registrations.

It is not page views.

It is not followers.

The most important metric is:

> **How many projects actually resulted in people collaborating?**

For example:

> 30 projects posted
> 100 people joined
> 20 projects received interest
> 8 teams formed
> 4 projects actually started
> 2 projects completed

If people are actually building together, the core idea is working.

---

## 15. Product philosophy

The platform should follow a few principles:

### Small over ambitious

A weekend project is just as valuable as a huge open-source project.

### Fun over impressive

Projects don't need to have a business model.

### People over features

The platform exists to connect people who want to build.

### Simple over sophisticated

If a simple feature works, don't replace it with a complicated system.

### Build first, optimize later

The first goal is proving that strangers can meet and make something together.

---

## 16. Core product loop

The entire product can ultimately be summarized as:

> **Someone has an idea.**
>
> ↓
>
> **They post it.**
>
> ↓
>
> **Someone discovers it while browsing.**
>
> ↓
>
> **“Yo, let's build it.”**
>
> ↓
>
> **They connect.**
>
> ↓
>
> **They build something.**
>
> ↓
>
> **They post what they made.**
>
> ↓
>
> **Someone else sees it and gets inspired.**

That loop is the product.
