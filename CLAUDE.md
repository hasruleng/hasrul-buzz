# hasrul-buzz — CLAUDE.md

Rules for the **hasrul-buzz** project — Hasrul's gamified personal site.

This repo is intended to be **public on GitHub**. Everything in it is read by strangers
(recruiters, founders) — treat docs and code as part of the deliverable, not scratch notes.

> **About this file.** This is how I direct AI coding agents on this project. The guardrails below —
> decision discipline, honesty protocols, architecture rules — matter more than any prompt. I drive;
> the agent is the tool.

## Profile source of truth (external + PRIVATE — never commit into this repo)

Hasrul's full career profile lives **outside this repo**, in a private folder linked by the
`HASRUL_PROFILE` environment variable (`$env:HASRUL_PROFILE` in PowerShell, `%HASRUL_PROFILE%`). Read
these for any factual claim about Hasrul:

- `%HASRUL_PROFILE%\CLAUDE.md` — curated profile, capability areas, framing & honesty rules
- `%HASRUL_PROFILE%\projects.csv` — full project history (source of truth for experience)

⚠️ **That folder is PRIVATE and lives outside this repo on purpose.** It holds private personal
material that must **never** be copied into this public repo. Use it only to *derive*
deliberately-published, honesty-checked site copy — never paste it in.

---

## What this project is

A gamified personal site where **the visitor self-selects a persona** (Recruiter → role lens /
Founder / Casual) and the story of Hasrul adapts to them. The site *is* the Product-Engineer proof:
it demonstrates the skill being sold — understanding different users and shipping for each.

**North star**: *product judgment*, not engineering wow. The differentiator is the persona-router, not
the graphics.

## Sources of truth (read these first, in order)

1. [ADR.md](ADR.md) + [ADR/](ADR/) — **decisions** (what was chosen and why). Authoritative.
2. [ROADMAP.md](ROADMAP.md) — **the build plan** (weekend-sized, ship-fast phases).
3. This file — **standing rules**.

If a decision isn't in an ADR yet, it isn't decided. Don't infer it from code or conversation.

## Locked decisions (see ADRs for full reasoning — never restate, link)

- **Site type** ([ADR-0001](ADR/adr-0001.md)): persona-routing, content-first / game-optional, 3 layers
  (Content → Routing → Render). The readable site is canonical; the game is opt-in at `/play`.
- **Stack** ([ADR-0002](ADR/adr-0002.md)): **Vite + React + TypeScript**, SPA-first. **SEO is an
  explicit non-goal** — traffic is direct-link from CV/LinkedIn, not search.

## Commit messages

Always draft commit messages using the [Conventional Commits](https://www.conventionalcommits.org/) standard:

```
<type>[optional scope]: <description>

[optional body]
```

Types: `feat`, `fix`, `docs`, `style`, `refactor`, `test`, `chore`, `perf`, `ci`, `build`.
Use a scope when the change is clearly bounded to one area (e.g. `feat(persona-router): ...`).
Keep the subject line under 72 characters; use the body only when the *why* is non-obvious.

## Working rules

- **Ship fast; every weekend ends with a live deploy.** Ugly-but-live beats pretty-but-local. Never
  block a ship on polish.
- **Stack discipline.** Stay in Vite + React + TS. Do **not** add another framework/language without a
  new ADR — fighting stack-sprawl is a stated goal.
- **3-layer separation is sacred.** Content and Routing (the "brain") are built once; Render skins are
  disposable. Never rewrite the content model to change a skin.
- **Persona state lives in the URL** (`?persona=&lens=`) so every view is deep-linkable.

## ADR rules (mandatory)

- Follow the [Michael Nygard format](https://github.com/joelparkerhenderson/architecture-decision-record):
  Context → Decision → Consequences, plus Alternatives and (where useful) Prior art.
- **One decision per file** in `ADR/adr-NNNN.md`; register it in the `ADR.md` index table.
- **Append-only.** Once an ADR is `Accepted`, never edit its substance — write a *new* ADR that
  supersedes it.
- **Never reference earlier drafts, "Draft versions", or removed text inside an ADR.** ADRs read as
  final. **Git is the history** — use it to see prior versions, not prose like "an earlier draft said…".
- **Prior art is expected**, especially for design/architecture ADRs: cite real references, each with a
  short "what we borrow / how our case differs" note, and an explicit "what we did *not* borrow." The
  goal is to show research, not invention from thin air.
- Status vocabulary: `Draft` · `Accepted` (date-stamped) · `Superseded`.

## Honesty rules (inherited from the profile's CLAUDE.md — apply to all site copy)

The site is outward-facing, so the CV-grade rigor applies to every word shown to a visitor:
- **No invented facts** (§A) — every claim traces to `%HASRUL_PROFILE%\CLAUDE.md` /
  `%HASRUL_PROFILE%\projects.csv` / Hasrul.
- **Stack-deficit honesty** (§E) — name a gap + the transferable bridge; never overclaim a stack.
- **Language levels** stated plainly and honestly; never inflated; no invented proficiency levels.
- **Keep personal logistics private** — anything flagged private in `%HASRUL_PROFILE%\CLAUDE.md`
  (relocation/work-authorisation specifics, etc.) stays out of all public site copy.
- **PE framing** keeps both halves: the pure-ownership projects *and* the role-cycling story.

## Doc maintenance

When a decision changes, update [ADR.md](ADR.md), the relevant `ADR/` file, and any contradicting line
in [ROADMAP.md](ROADMAP.md) in the same pass — the public repo must never contain self-contradicting docs.
