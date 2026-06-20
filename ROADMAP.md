# Personal Website — "The Product Is Me" — ROADMAP

> A gamified personal site where **the visitor picks their persona** and the story of Hasrul
> adapts to them. The site *is* the Product-Engineer proof: it demonstrates the exact skill
> being sold — understanding different users and shipping an experience for each.

**North star**: *Product judgment*, not engineering wow. The differentiator is the persona-router
(no portfolio in the wild does this), not the graphics. Spend effort on the router, not the renderer.

**Cadence**: ship fast, improve every weekend. **Every weekend ends with a live deploy.** Ugly-but-live
beats pretty-but-local. Continuous improvement over big-bang launch.

---

## The one architectural rule that prevents wasted work

Separate three layers so the skin can change without touching the brain:

```
┌─ CONTENT layer ─────────────────────────────────────────┐
│  Structured data about Hasrul's career.                  │
│  Stations (career phases) → projects → skills.           │
│  Each node carries persona-specific framings.            │  ← the durable asset
│  Persona-AGNOSTIC at storage; persona-FILTERED at render.│
└──────────────────────────────────────────────────────────┘
            │ filtered & reframed by ▼
┌─ ROUTING layer ─────────────────────────────────────────┐
│  Persona selection + lens logic.                         │
│  Recruiter→role-lens / Founder / Stalker.                │  ← the differentiator
│  Deep-linkable (?persona=recruiter&lens=backend).        │
└──────────────────────────────────────────────────────────┘
            │ rendered by ▼
┌─ RENDER layer (the "skin") ─────────────────────────────┐
│  v1: clean typographic web UI.                           │
│  v2: animated career map / skill-tree.                   │  ← disposable / swappable
│  v3: pixel-walker game (Phaser).                         │
└──────────────────────────────────────────────────────────┘
```

**Why this matters**: the routing logic is identical whether the skin is a plain page or a tile-map
game. Build the brain once; reskin forever. Nothing built in Phase 0 gets thrown away in Phase 3.

---

## The persona model (the heart of the product)

| Persona | What they want | What the site shows | Mechanic |
|---|---|---|---|
| 🎯 **Recruiter** | "Is he fit for *this* role?" | Pick a **role lens** → filtered projects + skills + a fit summary + honest stack-bridge notes | Role selector → re-themed journey + fit meter |
| 🚀 **Founder / Owner** | End-to-end ownership, beyond any JD | **Boss mode**: the 3 pure-PE projects + the 13-yr role-cycling arc, no filter | Single big story, "every hat" view |
| 🕵️ **Stalker** | The human | Hobbies, games played, Instagram, the Warnet origin, Korea blogger-award easter eggs | Bonus / easter-egg zone |

**Recruiter role lenses** (from CLAUDE.md): Backend · Embedded/IoT · Full-stack · QA/Test ·
Scrum-Master/PM · Tech Lead/EM · Forward-Deployed/Product. Each lens filters the *same* project
data and reframes the headline per role.

**Killer feature for the job hunt**: deep-linkable personas/lenses. Sending a backend application?
Paste `…?persona=recruiter&lens=backend` and the recruiter lands on the backend-framed story.
One site, infinite tailored entry points. This is the persona-router earning its keep.

---

## Tech stack (optimized for ship-fast + grows-into-a-game)

- **Framework**: Vite + React + TypeScript — **decided in [ADR-0002](ADR/adr-0002.md)** (ship fast +
  stay in the existing React stack; SEO is an explicit non-goal). SPA-first; add SSG only if that ever
  changes.
- **Hosting**: Vercel or Netlify (free, push-to-deploy, instant). GitHub Pages also fine.
- **Content**: typed `TS`/`JSON` modules — *the* source of truth, mirrors `projects.csv` facts.
- **Game engine (Phase 3 only)**: Phaser 3 (2D top-down, mature) mounted in a React canvas, or
  Kaplay/Kaboom for lighter syntax. Do **not** pull this in before Phase 3.
- **Domain**: short + memorable (hajj.buzz vibe). Candidates: `hasrul.dev`, `hasrul.fun`,
  `hasrul.buzz`, `hirehasrul.com`. Pick one in Weekend 1 so every deploy has a real home.

Keep v1 framework-light. Resist the urge to add the game engine, 3D, or a CMS early.

---

## The roadmap — weekend-sized, each one shippable

> Each phase = one or more weekends. **Definition of shipped = deployed and reachable at the domain.**
> Tackle top-to-bottom; never start a phase before the previous one is live.

### Phase 0 — Foundations + the router exists (Day 1) → **v0.1**
- [ ] Pick domain, create repo, wire push-to-deploy (Vercel/Netlify)
- [x] Build the **content data model** v1: career stations + projects + skills, seeded from
      `CLAUDE.md` + `projects.csv`. Persona-agnostic storage with per-persona framing fields.
      (`src/content/types.ts`, `stations.ts`, `projects.ts`)
- [x] Landing screen: **the 3-persona selector** (the front door) — `PersonaSelector.tsx`
- [x] Render each persona as a clean, well-typed page (plain styling is fine) —
      `RecruiterView`, `FounderView`, `StalkerView`; URL routing via `?persona=`
- [x] **Deploy live.** hasrul.buzz is live on Vercel, domain connected, push-to-deploy active.

*Already does the thing no one else does. Ship it even if it's black text on white.*

### Phase 1 — Make the router smart (Day 1–2) → **v0.3**
- [x] Recruiter **role-lens sub-selector** (7 roles) → filtered projects + per-role fit summary
      (`src/content/lenses.ts`, `LensSelector.tsx`, lens-aware `RecruiterView.tsx`)
- [x] Apply the **§E stack-deficit honesty notes** per lens (name gap + transferable bridge) —
      one `bridge` field per lens, rendered as a distinct "Honest gap & bridge" block
- [x] Founder **boss-mode** view: 3 pure-PE projects (ATM, EV Fleet, Secure Offline IoT Bridge)
      + the role-cycling arc (built in Phase 0; complete)
- [x] Stalker view: Warnet origin + Korea blogger award + physics-team + hardware tinkerer
      (hobbies / games / Instagram pending Hasrul's input — not invented, per §A)
- [x] **Deep links**: `?persona=…&lens=…` restore exact state (the job-hunt superpower) —
      lens persisted in URL, popstate-aware, deep-link lands straight on the filtered view
- [ ] Deploy. Done = every persona path is real and individually linkable.

### Phase 2 — Game-feel without a game engine (Day 2) → **v0.5**
- [ ] Career-as-journey visual: an animated **timeline/map of stations** (still HTML/CSS/SVG)
- [ ] Click a station → project cards (persona-filtered)
- [ ] **Skill-tree / character-sheet** component for the recruiter lens (stats per role)
- [ ] Retro pixel font, transitions, optional sound → the hajj.buzz *vibe* cheaply
- [ ] Deploy. Done = it *feels* like a game without being one yet.

### Phase 3 — The pixel walker (Weekends 2) → **v1.0**
- [ ] Introduce Phaser: a tile-map "career world," one zone per station
- [ ] Avatar walks station→station; **NPCs deliver persona-filtered dialogue** (reuse the SAME
      content model — no new content, just a new renderer)
- [ ] **"Skip to text" escape hatch** for hurried recruiters (like hajj.buzz's readable pages)
- [ ] Mobile touch controls
- [ ] Deploy. Done = the hajj.buzz-style walkable experience, persona-aware.

### Phase 4 — Polish, discoverability, flex (ongoing)
- [ ] **Analytics**: which persona/lens gets viewed (this is product feedback — very on-brand)
- [ ] ~~SEO content shell~~ — **de-prioritised (non-goal per [ADR-0002](ADR/adr-0002.md))**; traffic
      is direct-link from CV/LinkedIn, not search. Revisit only if that assumption changes.
- [ ] Achievements / fit-meter gamification; per-persona "contact / hire me" CTA
- [ ] Optional v2 flexes: 3D easter eggs, "chat with my career" LLM (ties to AI capability area)

---

## Guardrails (apply CV-grade rigor to site copy)

The site is outward-facing, so the same anti-hallucination rules as the CVs apply:
- **§A no inferred facts** — every claim traces to `%HASRUL_PROFILE%\CLAUDE.md` / `projects.csv` / Hasrul's input.
- **§E stack-deficit honesty** — name gaps + the transferable bridge; never overclaim a stack.
- **Language levels** stated honestly; never inflated.
- **Keep personal logistics private** — relocation/work-authorisation specifics stay out of public copy.
- **PE framing** — both halves: the pure-ownership projects *and* the role-cycling story.

## Success metrics (the feedback loop)
- Persona/lens view distribution (what audiences actually pick)
- Deep-link click-through from applications
- Time-on-site per persona; "skip to text" usage
- Inbound mentions ("saw your site") in recruiter replies — the real win

## Anti-goals (what NOT to do)
- ❌ Start with 3D / Bruno-Simon-style. It rewards graphics skill, not product judgment. v2 flex only.
- ❌ Add the game engine before Phase 3.
- ❌ Block a weekend's ship on polish. Live-and-rough > local-and-pretty.
- ❌ Rewrite the content model when changing skins. The brain is fixed; skins are disposable.
