# hasrul-buzz — the product is me

A gamified personal site where **the visitor chooses who they are**, and the story of Hasrul reshapes
itself for them. A recruiter sees role-fit. A founder sees end-to-end ownership. A curious visitor sees
the human.

The twist is the whole point: as a Product Engineer, this is a product I own **end-to-end**. I've
shipped real public software before — most visibly the open-source [WWF Forest
Foresight](#a-real-public-product-ive-worked-on--wwf-forest-foresight) — but as a contributor inside a
team, not the sole owner. This site is mine top to bottom, and it demonstrates the exact skill it's
selling: understanding different users and shipping the right experience for each.

Built in public, one weekend at a time.

## The concept

The visitor self-selects a **persona** at the door; everything downstream adapts to it:

| Persona | Wants to know | What the site surfaces |
| --- | --- | --- |
| 🎯 **Recruiter** | "Is he a fit for *this* role?" | Pick a role lens (backend · embedded/IoT · full-stack · QA/test · scrum/PM · tech-lead/EM · forward-deployed/product) → a filtered, role-framed story |
| 🚀 **Founder / Owner** | End-to-end ownership, beyond any one job | "Boss mode" — the pure ownership projects plus the multi-year role-cycling arc, no JD filter |
| 🕵️ **Casual visitor** | The person behind the CV | Hobbies, games, origin story, the human side |

The same career data drives every persona — the persona just selects and reframes it. Every view is
deep-linkable (`?persona=…&lens=…`), so a single application link can open straight onto the right story.

There's no "you must play the game" wall: the readable site is always the default, and the game (later)
is an opt-in way to explore the same content.

## A real public product I've worked on — WWF Forest Foresight

Before "the product is me" raises an eyebrow: I *have* shipped public software. The clearest example is
**[WWF Forest Foresight](https://github.com/ForestForesight/ForestForesight)** — an open-source, GIS/map-based,
machine-learning system that predicts near-future deforestation across the tropical belt, operational
in countries like Gabon, Indonesia, Peru, and Colombia, used by forestry stakeholders to intervene
before the damage is done.

My role there was **Quality Engineer — not originator or end-to-end Product Engineer.** WWF-NL built and owns Forest Foresight;
I joined to *improve* it: analysed gaps, refactored the codebase, automated tests, wired CI/CD pipelines, **introduced MLflow** for ML experiment tracking (Databricks / MLOps), and coached the team on software-engineering and DevOps practices — all to lift its long-term maintainability.
[Bits&Chips covered the project](https://bits-chips.com/article/software-technology-trainees-help-wwf-nl-detect-deforestation/) (Jun 2025).

So why build this site at all? Because Forest Foresight proves I can bring quality to a real public
product *inside a team* — it doesn't show me owning a product **end-to-end, alone, from idea to ship.**
That's the specific thing Product / Forward-Deployed / Founding-Engineer roles want to see, and it's the
exact gap this site is built to close.

## Documentation map

Three documents, three jobs. The README is the only place that explains how they relate.

```
DECISIONS              PLAN              RULES
─────────              ────              ─────
ADR.md  +  ADR/*       ROADMAP.md        CLAUDE.md
```

| Document | What it contains |
| --- | --- |
| **[ADR.md](ADR.md)** + **[ADR/](ADR/)** | Architecture Decision Records — one decision per file, *why this and not the alternative*. Append-only, with alternatives considered, consequences, and a `## Prior art` section anchoring each choice to recognised work (so it's research, not invention from thin air). |
| **[ROADMAP.md](ROADMAP.md)** | The build plan — weekend-sized, ship-fast phases (v0.1 → v1.0+), each one ending in a live deploy. The persona-router ships first; the game skin comes later without rewriting it. |
| **[CLAUDE.md](CLAUDE.md)** | Standing rules for how this repo is built and written — stack discipline, the layered architecture, honesty rules for all public copy, and the ADR conventions. |

## Tech

**Vite + React + TypeScript**, single-page app (decided in [ADR-0002](ADR/adr-0002.md) — ship fast,
stay in one familiar stack; SEO is an explicit non-goal since visitors arrive by direct link). The
architecture keeps three layers apart so the look can change without touching the logic:

```
Content  →  Routing  →  Render
(career     (persona +   (skin: readable site now,
 data)       lens)        pixel-walker game later)
```

The Phase-3 game will mount as a [Phaser](https://phaser.io) canvas inside a React route — an addition,
not a rewrite.

The SkillTree's career-wide tech counts are generated from the private `projects.csv` (never committed).
After updating the CSV, regenerate and commit:

```bash
npm run build:projects
git add src/content/techIndex.generated.ts
git commit -m "chore(skills): regenerate techIndex from projects.csv"
git push
```

## Privacy & secrets hygiene (by design)

This repo is public, so it carries **only** what's meant to be public. The underlying personal data —
full career history, contact details, personal logistics — lives in a **separate private store outside
the repo**, referenced at build time through an environment variable, never committed. Everything you
see here is deliberately published and fact-checked; nothing personal leaks by accident.

- **Private source of truth stays out of version control** — linked via an env var, not a path or file
  in the repo.
- **Public copy is derived from it, then scrubbed** of anything personal or logistical.
- **The rule is encoded in [CLAUDE.md](CLAUDE.md)** so it's enforced on every change — a standing
  guardrail, not something I have to remember each commit.

Same instinct I bring to secure-systems work: treat the public repo as untrusted ground, and keep the
sensitive material on the other side of the boundary.

## Why [CLAUDE.md](CLAUDE.md) is public — on purpose

Most people keep their AI-agent config private, or never commit it at all. I publish mine deliberately,
because it's the most honest answer to a question every engineer now gets asked: *how do you actually
work with AI?*

- **The guardrails are the point, not the prompts.** [CLAUDE.md](CLAUDE.md) isn't "make the AI do my
  work." It's the constraint system I put *around* the AI — append-only decision records, an
  anti-hallucination / honesty protocol, a layered architecture that can't be violated, a rule that
  facts must trace to a source. That's the engineer staying in charge; the AI is the tool.
- **It defuses the lazy read.** "The AI built this" doesn't survive contact with a file full of the
  rules I impose to keep the AI correct and honest. What's published is my judgment, made legible.
- **Transparency is part of the deliverable.** You can audit not just *what* I built, but *how I
  decided* (the [ADRs](ADR.md)) and *how I keep the AI honest* (this config). That openness is the
  same product-judgment the site itself is about.
- **It's reproducible craft.** Anyone can read exactly how this repo is run and hold the work to it —
  including me, on every commit.

In short: the private data stays out (above); the *thinking* stays in. The boundary is drawn on
purpose, in both directions.

## Status

Early and evolving — built incrementally on weekends. See [ROADMAP.md](ROADMAP.md) for the current
phase. The goal is a living site that gets a little better every week, not a big-bang launch.

## Reading order

[README.md](README.md) → [ADR-0001](ADR/adr-0001.md) (what kind of site, and why) →
[ROADMAP.md](ROADMAP.md) (what gets built, in what order). Dip into the rest of the
[ADRs](ADR.md) when you want the reasoning behind a specific decision.
