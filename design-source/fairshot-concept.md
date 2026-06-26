# Fairshot — Product Concept Document

> **A Soft Tooling product.** Job search without the shame spiral.
> Last updated: 2026-05-21

---

## 1. Elevator Pitch

Fairshot runs your job search for you. You pay when it works — not for hope.

No resume scoring. No shame spirals. No 47-step templates. We find worth-your-time roles, tailor your application for each one, and track what happens. You only pay at milestones that mean progress.

---

## 2. Problem Statement

Job search is broken in three ways:

1. **Resume shaming** — Every builder scores you down. "Weak action verbs." "Missing keywords." Your document is never good enough.
2. **Spray-and-pray bots** — Auto-apply tools fire generic apps into the void. Low response rates. Wasted time. Damaged reputation.
3. **Pay for hope** — $20/month for a template. $40/month for auto-apply. The bill keeps coming. The job doesn't.

The emotional cost is worse than the financial one. Job seekers end up feeling inadequate, not empowered.

---

## 3. Product Vision

Fairshot is the first job-search tool built on **soft tooling** principles:

- **No shame mechanics** — We never score you down. We reframe, not criticize.
- **Show what you did, not what you didn't** — The tracker celebrates forward motion. Silence is data, not failure.
- **Quiet by default** — No badges, no dings, no "you've fallen behind." The tool waits for you.
- **Pay for progress** — Milestone pricing means you only pay when something real happens.

---

## 4. Core Features

### 4.1 Resume Builder & Optimizer (Milestone 01 — $29)
- Paste LinkedIn URL or raw experience
- AI reframes your background into strong, human-readable bullets
- No scoring. No "weak action verbs." Just better framing.
- Output: optimized resume + LinkedIn + skills tags
- **One-time purchase. Yours to keep.**

### 4.2 Role Discovery (Milestone 02 — $49 / 50 apps)
- Scans 10+ job boards
- Filters for quality: transparency score, response rate, fit
- Each role scored on three axes:
  - **Transparency** (salary listed? clear JD?)
  - **Response Rate** (% of applicants who hear back)
  - **Fit** (how well it matches your background + goals)
- Real customization per job — not mail merge
- **Pay-as-you-go. No expiry.**

### 4.3 Application Tracker (free with any milestone)
- Kanban-style board: Applied → Screening → Interview → Offer
- Quiet, no-shame dashboard
- Move cards forward or back with one click
- Shows what you *did*, not what you missed

### 4.4 Interview Unlock (Milestone 03 — $99)
- Triggers when you report an interview
- Unlocks: interview prep, salary negotiation coach, offer review
- **Voluntary. Unlocks a phase, not a subscription.**

---

## 5. User Journey

### Journey A: First-time job seeker
1. Lands on marketing page → "We run your job search. You pay when it works."
2. Joins waitlist or buys Milestone 01
3. Pastes LinkedIn / experience
4. Gets reframed resume in minutes
5. Buys Milestone 02 when ready to apply
6. Reviews curated roles, clicks "Apply"
7. Tracks progress in quiet dashboard
8. Reports an interview → Milestone 03 unlocks

### Journey B: Passive candidate
1. Already employed, casually looking
2. Buys Milestone 02 (no resume work needed)
3. Saves interesting roles, applies selectively
4. Tracker stays quiet until they check in
5. No monthly bill. No guilt. No noise.

---

## 6. UX Flow — App Prototype (`fairshot-app.html`)

### Screen 1: Resume
- Sidebar nav: Resume (active), Discover, Tracker
- Milestone bar at top: Build ✓ → Apply (current) → Interview (locked)
- Left card: textarea for background paste
- Right card: live preview of reframed resume
- CTA: "Optimize"

### Screen 2: Discover
- Filter toggle: All / High Quality
- Grid of job cards (2-up on desktop, 1-up on mobile)
- Each card: title, company, location, salary, tags, 3 scores, Apply/Save buttons
- Scores color-coded: good (teal) / warning (gold)

### Screen 3: Tracker
- 4-column Kanban: Applied, Screening, Interview, Offer
- Cards draggable / clickable
- Back/Next buttons on each card
- Counter badge on Tracker nav item

---

## 7. Pricing Model

| Milestone | Price | Trigger | What's Included |
|-----------|-------|---------|-----------------|
| 01 Build | $29 | Immediate | Resume + LinkedIn optimization |
| 02 Apply | $49 / 50 apps | User-initiated | Role discovery + tailored applications |
| 03 Interview | $99 | Interview reported | Interview prep + negotiation + offer review |

**Principles:**
- No subscriptions. No recurring bills.
- Milestones don't expire.
- You can pause for months and resume where you left off.

---

## 8. Target Audience

- **Primary:** Mid-career professionals (3–10 years exp) in tech, product, design
- **Secondary:** Career switchers who need help reframing their background
- **Tertiary:** Passive candidates who want to look without committing

**Psychographic:** People who've been burned by resume scanners and auto-apply tools. Value quality over volume. Willing to pay for outcomes, not features.

---

## 9. Competitive Positioning

| Tool | What they do | What Fairshot does differently |
|------|-------------|-------------------------------|
| Resume Worded / Jobscan | Score your resume down | Reframe without scoring |
| LazyApply / Simplify | Spray 200 generic apps | 50 tailored, high-quality apps |
| LinkedIn Premium | Monthly subscription for visibility | Pay once per outcome |
| Teal / Huntr | All-in-one job tracker | Milestone pricing + soft philosophy |

---

## 10. Success Metrics

- **Activation:** % of users who complete Milestone 01
- **Engagement:** Apps submitted per user (target: 12–20 quality apps)
- **Conversion:** % of Milestone 02 users who reach Milestone 03
- **Retention:** Return rate after 30/60/90 days (should be high because no subscription = no churn pressure)
- **NPS:** Would you recommend Fairshot to a friend job searching?

---

## 11. Open Questions

- [ ] Should Milestone 02 be per-application ($1/app) or per-batch?
- [ ] Do we need a free tier (e.g. 3 applications before paying)?
- [ ] Should interview prep be AI-generated or curated content + templates?
- [ ] What's the plan for employer partnerships / reverse job board?
- [ ] Do we build browser extension for one-click apply?
