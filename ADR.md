# Architecture Decision Records — Personal Website ("The Product Is Me")

Append-only log of the decisions behind this site. Each entry follows the
[Michael Nygard ADR format](https://github.com/joelparkerhenderson/architecture-decision-record) —
short, focused on *why*, never edited once **Accepted** (a later ADR supersedes it instead).

This repo is intended to be **public on GitHub**. The ADRs are therefore part of the deliverable:
the site sells *product judgment*, and a visible, honest decision trail is itself evidence of it.

**Status vocabulary**: `Draft` (open decision, alternatives captured, not chosen yet) ·
`Accepted` (decided; date stamped) · `Superseded` (replaced by a later ADR).
**Dates** are filled in when an ADR moves to *Accepted*.

For the build plan these decisions feed, see [ROADMAP.md](ROADMAP.md).

---

## Decision drivers (the lens every ADR is judged against)

1. **North star — product judgment, not engineering wow.** The differentiator is the persona-router
   (no portfolio in the wild does audience-routing), not graphics.
2. **Ship fast, improve every weekend.** Every weekend ends with a live deploy. Ugly-but-live beats
   pretty-but-local.
3. **Discoverable.** Recruiters Google the name; ATS and link-previews read the page. The readable
   route must be indexable.
4. **Reuse existing skills.** Hasrul ships React and C# .NET; lean toward what's productive *now*.
5. **No wasted work.** The content/routing "brain" is built once; render skins are swappable.

---

## Table of Contents

*ADR numbers are chronological identifiers, not priorities (Nygard convention).*

| # | Title | Status | Date |
|---|---|---|---|
| [ADR-0001](ADR/adr-0001.md) | Site type — a persona-routing, content-first / game-optional personal site | Accepted | 2026-06-20 |
| [ADR-0002](ADR/adr-0002.md) | Frontend stack — Vite + React + TypeScript (SPA-first, SSG-later) | Accepted | 2026-06-20 |
| [ADR-0003](ADR/adr-0003.md) | Content data model — persona-agnostic storage, tag-filtered + framing-centralised at render | Accepted | 2026-06-20 |
| [ADR-0004](ADR/adr-0004.md) | Career visualisation — readable-site layout (vertical timeline; skill-tree deferred) | Accepted | 2026-06-20 |
| [ADR-0005](ADR/adr-0005.md) | Differentiation thesis — persona-routing *and* gamified discovery, both serving persona-specific discovery | Accepted | 2026-06-20 |
| [ADR-0006](ADR/adr-0006.md) | Entry flow — a narrative persona-selection front door, branching to read-or-play | Accepted | 2026-06-21 |
| [ADR-0007](ADR/adr-0007.md) | Challenge mechanic — per-station evidence checks (persona performs its own evaluation) | Accepted | 2026-06-21 |

---

## Open questions / backlog (future ADRs)

These are decisions we know are coming but haven't framed yet. Numbers are assigned when an ADR is
*written* (chronological IDs, not a queue), so these are listed without numbers:

- **Game engine** for the Phase-3 pixel walker (Phaser 3 vs Kaplay). Deferred to Phase 3.
- **Hosting/deploy target** — *decided in practice* (Vercel, push-to-deploy, `hasrul.buzz` connected);
  not yet written up as an ADR.
- **Domain choice** — *decided in practice* (`hasrul.buzz` live); not yet written up as an ADR.
- **Styling approach** (plain CSS vs CSS modules vs Tailwind). Currently plain global CSS; no ADR yet.
