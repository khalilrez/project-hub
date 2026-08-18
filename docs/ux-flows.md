# UX Flows

## Purpose and scope

This document defines the V1 user experience for discovering projects, expressing interest, and connecting project creators with interested people. It translates `docs/product-spec.md` into screen-level behavior while preserving the architecture and roadmap.

The project remains the center of the experience. Language should be informal, welcoming, and direct. The product does not introduce chat, applications, acceptance workflows, team management, public engagement metrics, recommendations, matching, or reputation.

## Shared interaction principles

- Project descriptions and messages are rendered as plain text. External links are clearly identified and open safely.
- Public screens never expose private contact information or interest submissions.
- Protected actions use the verified signed-in session. A missing or expired session leads to sign-in, not silent failure.
- Validation appears beside the relevant field and in a concise summary when useful. Entered values remain available after a recoverable error.
- Success and error feedback is announced to assistive technology with an appropriate live region. Focus moves only when doing so helps the user recover or continue.
- Every control has a visible keyboard focus state and an accessible name. Controls use native buttons, links, fields, and headings wherever possible.
- Color, icons, and motion are never the only ways to communicate state. Reduced-motion preferences are respected.
- Layouts allow longer English, French, and Arabic labels without clipping. Content order remains meaningful in right-to-left layouts.

## 1. Anonymous project browsing

### Entry point

The visitor opens the homepage or follows a link to a published project. The homepage starts with the newest visible project and loads a small newest-first page of projects.

### Information visible

One project is prominent at a time. The feed card shows the title, short description, technology, expected scope, who the creator is looking for, status, and collaboration mode. Tags, skill level, general location, media, repository link, and existing progress appear when provided. A details view can expose the same proposal with more room, but not private creator contact details or interest information.

The primary controls are **Let's Build It** and **Next Project**. Sign in and create-project entry points are visible without competing with project discovery.

### Primary action

The visitor moves to the next project through normal vertical scrolling or **Next Project**. Selecting **Let's Build It** starts the sign-in return flow described in section 5.

### Success state

The next project becomes prominent and its heading identifies the newly active content. Opening project details preserves a clear way back to the feed. The visitor can continue browsing without creating an account.

### Error state

If projects cannot be loaded, show a short explanation and a **Try again** control. Keep site navigation available. If later pagination fails, retain the projects already loaded and place retry feedback at the end of the current set.

### Empty state

If no visible projects are available, explain that there is nothing to browse yet and offer **Create a project**. Seed content should normally prevent this state at launch.

At the end of available results, state **You've seen all current projects** and offer a way to return to the first project. Do not imply that more personalized results are being prepared.

### Mobile behavior

Cards use the available viewport without hiding browser or site navigation. Content can scroll naturally within the page; there is no forced swipe or scroll hijacking. **Let's Build It** and **Next Project** remain easy to reach and have comfortable touch targets. Optional metadata wraps or stacks rather than truncating essential information.

### Accessibility and keyboard behavior

The feed uses a main landmark and a clear heading for each project. Tab reaches project links and actions in visual order. **Next Project** is a real button and provides a non-gesture navigation method. After it is activated, focus moves to the newly active project's heading or container with an accessible label. Normal browser scrolling remains available. Media has appropriate alternative text or is marked decorative, video never autoplays with sound, and motion is reduced or removed when requested.

## 2. Authenticated browsing

### Entry point

A signed-in user opens the homepage, returns to the feed after GitHub authentication, or follows a project link.

### Information visible

The user sees the same public project information as an anonymous visitor, plus account navigation, an unread-notification indicator, and an entry point to **My Projects**. On projects created by someone else, the interest action reflects whether the user has already expressed interest. On the user's own project, creator management actions replace the interest action.

### Primary action

The user browses with normal scrolling or **Next Project** and may select **Let's Build It** on another person's project. They may also open project details or creator controls for a project they own.

### Success state

Browsing remains uninterrupted. Previously submitted interest is shown as an unambiguous non-action state such as **Interest sent**, preventing uncertainty and repeat submission.

### Error state

Feed-load errors use the same recoverable behavior as anonymous browsing. If the session expires during a protected action, explain that sign-in is required and preserve the current project as the return destination.

### Empty state

The feed and end-of-feed states match anonymous browsing. An authenticated empty feed emphasizes **Create a project** as the primary next step.

### Mobile behavior

Account and notification controls remain reachable without crowding the project card. Secondary navigation may collapse into a labeled menu, while **Let's Build It** and **Next Project** remain directly available.

### Accessibility and keyboard behavior

All anonymous browsing behavior still applies. The current account menu and notification state have accessible names and expanded/collapsed states. Ownership and submitted-interest states are conveyed in text, not only by disabled styling or icons.

## 3. Create project

### Entry point

A visitor selects **Create a project** from site navigation, the feed empty state, or **My Projects**. Anonymous visitors sign in and return to the creation form. Authenticated users open the form directly.

### Information visible

The form explains that small, experimental, educational, weird, and weekend ideas are welcome. Required fields are clearly marked:

- title;
- description;
- technology;
- expected scope;
- looking for.

Optional fields are tags, skill level, general location, GitHub repository URL, media URL, and existing progress. Collaboration mode offers **Online**, **Hybrid / open to meeting**, and **Local**. General location becomes required for hybrid or local projects; a precise address is never requested. The initial project status and available status values follow section 8.

### Primary action

The user completes the proposal and selects **Publish project**. Client feedback may help early, but the server validates all fields and derives ownership from the signed-in session.

### Success state

The published project is visible in its details or creator-management view. Confirm that it was published and provide clear actions to view it in the feed or manage it.

### Error state

Missing, overlong, malformed, or invalid values receive specific inline messages. Hybrid or local mode without a general location is identified at that field. Invalid external URLs are not accepted. On a server or network failure, keep the entered content and offer another submission attempt. If authentication has expired, request sign-in and preserve the draft locally where practical.

### Empty state

The blank form provides short examples or helper text, not prefilled claims that could accidentally be published. If **My Projects** has no projects, its empty state explains the purpose of a proposal and links to this form.

### Mobile behavior

The form is a single readable column. Labels stay visible, fields use appropriate mobile input types, controls do not require horizontal scrolling, and the submit action appears after the form rather than covering fields. Long option labels wrap.

### Accessibility and keyboard behavior

Every input has a persistent label, required state, and associated help or error text. Related choices use `fieldset` and `legend`. Conditional location requirements are announced when collaboration mode changes. On invalid submission, focus moves to an error summary or the first invalid field, and the user can navigate to each error. Submission is possible with the keyboard and communicates its pending state without repeatedly accepting input.

## 4. Edit or delete a project

### Entry point

The signed-in creator opens **My Projects**, selects one of their projects, and chooses **Edit** or **Delete**. These controls are not presented to non-owners, and ownership is still enforced on the server and in the database.

### Information visible

The edit form shows the project's current values and the same field requirements as creation. The management view also shows its current status and separates **Delete project** visually from routine actions. The delete confirmation identifies the project by title and explains that deletion removes it rather than changing its status. **Abandoned** is available as a visible status alternative when that more accurately reflects the creator's intent.

### Primary action

For editing, the creator selects **Save changes**. For deletion, the creator selects **Delete project**, then explicitly confirms in a focused confirmation step. The default/cancel action is safe.

### Success state

After editing, the updated project view appears with a concise confirmation. After deletion, the creator returns to **My Projects** with confirmation that the named project was deleted.

### Error state

Validation errors behave like project creation and preserve edits. Authorization failures explain that the user cannot manage that project and do not reveal private management data. A failed deletion leaves the project intact and offers retry or cancel. If the project was already removed, return to **My Projects** with a neutral unavailable message.

### Empty state

If the creator has no projects, **My Projects** explains this and offers **Create a project**. If a requested project no longer exists, show a not-found state with a route back to the feed or **My Projects**.

### Mobile behavior

Edit fields stack in one column. Destructive controls remain separated from save controls. A delete confirmation fits the viewport, keeps both cancel and confirm visible without obscuring content, and does not depend on a hover interaction.

### Accessibility and keyboard behavior

The edit form follows the creation-form requirements. The delete confirmation has a descriptive heading, initial focus on the least destructive useful control, a keyboard-operable close/cancel action, and focus returns to the delete trigger when canceled. If presented as a modal, focus is contained only while it is open and the background is unavailable to assistive technology.

## 5. Let's Build It

### Entry point

The user selects **Let's Build It** from a project feed card or project details page.

For an anonymous visitor, the product explains that sign-in is needed, starts GitHub OAuth, and returns the user to the same project after successful authentication. It does not submit interest automatically.

For a signed-in non-creator who has not already expressed interest, the participation form opens. A project creator cannot enter this flow for their own project.

### Information visible

The project title remains visible for context. The user chooses exactly one participation type: **Coding**, **Design**, **Ideas**, **Testing**, **Learning**, or **Not sure yet**. A short message is optional and its length guidance is visible. The screen explains that the project creator will receive the submission and may use the user's permitted contact information to contact them outside the platform. No chat or acceptance process is promised.

### Primary action

The user chooses a participation type, optionally writes a message, and selects **Send interest**.

### Success state

Confirm that interest was sent to the creator. The project action changes to **Interest sent**, and the user can return to the same project or continue to the next one. The creator receives one private `project_interest` notification.

### Error state

If no participation type is selected or the message is invalid, show a field-level message and retain the user's input. If the user already expressed interest, replace the form with the existing **Interest sent** state rather than treating it as a new submission. If the project belongs to the user, explain that creators cannot express interest in their own project and link to project management. If the project is unavailable, return to the feed. For a network/server failure, retain input and offer retry without creating duplicates.

### Empty state

The optional message may be empty; helper text makes clear that the participation choice is enough. There is no empty-results state because the flow always belongs to a specific existing project.

### Mobile behavior

The form uses a single column or a spacious wrapping group of participation choices. The project context, selected choice, message, and submit action remain readable without horizontal scrolling. The onscreen keyboard does not cover the submit control, and dismissing the form returns the user to the same project.

### Accessibility and keyboard behavior

Participation type is a single-select radio group with a legend. Emoji, if used decoratively, do not replace the text labels. The message has a visible label and announced length error. Focus moves to the form heading when it opens and returns to the initiating control when canceled. Submission status and confirmation are announced, and the form cannot be submitted multiple times while pending.

## 6. Creator reviews interested people

### Entry point

The creator opens a `project_interest` notification or selects **Interested people** from a project they own in **My Projects**. Only that project's creator can open this private view.

### Information visible

The view identifies the project and its status, then lists each interested person's basic profile, participation type, optional message, and permitted preferred contact information. Authentication email and other private data are not inferred or exposed. Interest data is private to the interested user and project creator; unrelated users cannot access it.

The interface explains that contact happens outside the platform. It does not rank people or offer accept/reject, applicant status, team roles, or chat.

### Primary action

The creator uses the interested person's explicitly provided contact method to contact them outside the platform. A contact value that is a valid link can be opened; otherwise it can be selected or copied through ordinary browser behavior.

### Success state

The creator can identify who is interested, understand how they want to help, and access only the contact information permitted by the product flow. Opening a notification marks it as read according to section 7.

### Error state

If private data cannot be loaded, do not show partial or cached contact details from another context. Explain the failure and offer retry or return to project management. An unauthorized user receives an access-denied or not-found state without any interest or contact details. Unsafe or malformed contact links are displayed as non-clickable text or withheld with a clear unavailable label.

### Empty state

If nobody has expressed interest, say **No one has expressed interest yet** and provide a route back to the project's public view. Do not suggest candidates, rankings, or promotion mechanics. If an interested person has not supplied a preferred contact method, state **No contact method provided** while still showing their permitted basic profile and submission.

### Mobile behavior

Interested people appear as stacked cards with profile, participation type, message, and contact information in a consistent order. Long contact values wrap rather than forcing horizontal scroll. Contact actions have comfortable touch targets and external destinations are clearly indicated.

### Accessibility and keyboard behavior

The list has a descriptive heading and semantic list structure. Each person's name is a heading within their item. Contact links have meaningful accessible names including the method or destination. Keyboard order follows the visual card order, focus is visible, and private information is not placed in inaccessible hover-only content.

## 7. Notifications

### Entry point

A signed-in user opens the notification indicator in site navigation and then a notification page or dropdown. Refreshing or navigating may fetch new notifications; realtime, push, and email delivery are not expected in V1.

### Information visible

An unread indicator communicates whether unread notifications exist without exposing their content publicly. V1 notifications are only `project_interest`, for example: **Sami wants to help build “Tiny Tunis Weather CLI.”** Each item shows its read/unread state and enough context to identify the project and interested person. Notifications are visible only to their recipient.

### Primary action

The creator opens a notification to reach the relevant project's private interested-people view. The notification is marked read when opened. Where provided, **Mark as read** affects only the signed-in user's notification.

### Success state

The selected item is visibly and semantically marked read, the unread indicator/count updates, and the creator reaches the relevant private context. A refresh preserves the read state.

### Error state

If notifications cannot be loaded, show a retry action without displaying stale data belonging to a different account. If marking as read fails, keep or restore the unread state and provide concise feedback; navigation to an authorized project view may still proceed. A notification for an unavailable project shows a neutral unavailable state without leaking deleted content.

### Empty state

Show **No notifications yet** with a short explanation that notifications will appear when someone expresses interest in one of the user's projects. Do not fill the view with unrelated activity suggestions.

### Mobile behavior

The unread indicator remains reachable in compact navigation. A dropdown may become a full-width panel or dedicated page. Notification text wraps, touch targets do not overlap, and closing the panel returns to the previous context.

### Accessibility and keyboard behavior

The indicator has an accessible label that includes unread state, not color alone. A dropdown trigger exposes its expanded state. Notifications use a semantic list; unread state is included in accessible text. The panel supports Escape to close when applicable, manages focus predictably, and does not trap focus unless implemented as a modal. Mark-read changes are announced.

## 8. Project status changes

### Entry point

The signed-in creator opens a project they own from **My Projects** or its creator-management view and selects the status control. Only the creator can change status.

### Information visible

The current status and all V1 choices are shown with text labels:

- **Idea**;
- **Looking for people**;
- **Building**;
- **Completed**;
- **Abandoned**.

A brief explanation clarifies that status is public. **Abandoned** projects remain visible; it is not a delete action. Status changes do not create team membership, acceptance, or social rewards.

### Primary action

The creator selects a status and saves the change. If status is edited within the broader project form, **Save changes** applies it with the other edits.

### Success state

The management view and public project presentation show the new status consistently, with a concise confirmation. **Completed** and **Abandoned** remain browseable according to the normal visible-project query.

### Error state

An invalid status is rejected. Authorization failures do not apply the change and direct the user away from private management. On a server/network failure, retain the previous confirmed status, preserve the attempted selection where useful, and offer retry without showing an unconfirmed public state.

### Empty state

There is no status-less project state: every project must show a valid status. If the project no longer exists, show the standard unavailable state and return path to **My Projects**.

### Mobile behavior

Status choices use a native select or a vertically readable single-select group. Labels are not icon-only and do not overflow. Save feedback appears near the control without obscuring the project content.

### Accessibility and keyboard behavior

The status control has a persistent label and communicates the current selection. Native keyboard behavior is preserved. If a custom single-select is used, it implements the equivalent keyboard and screen-reader semantics. Confirmation and errors are announced, focus remains stable after save, and status is never conveyed by color or emoji alone.

## Product-spec review checklist

- The feed is public, newest-first, vertically browsable, and presents one understandable project prominently at a time.
- **Let's Build It** supports the six specified participation types, an optional short message, sign-in return, duplicate prevention, and creator notification.
- Creators can create, edit, delete, review private interest submissions, contact people outside the platform, and use all five specified statuses.
- Abandoned projects remain visible.
- Notifications are in-app, private, database-backed, and limited in V1 to project interest with unread/read behavior.
- Public profile data is minimal; private contact information appears only in the permitted creator-interest flow.
- Mobile, keyboard, focus, semantic structure, error recovery, and reduced-motion behavior are covered for every flow.
- No chat, likes, followers, karma, reputation, recommendation or matching logic, gamification, acceptance workflow, or team-role management is introduced.
