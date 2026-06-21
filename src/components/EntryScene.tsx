import { useState } from 'react';
import type { Persona } from '../content/types';

/**
 * The bare-root front door (ADR-0006): a narrative, engine-free persona chooser.
 * Hasrul greets the "adventurer" → they self-select a role → branch to READ
 * (canonical, calls onEnterReadable) or PLAY (pick an avatar → game).
 *
 * Invariants (ADR-0006 acceptance tests):
 *  - Deep links bypass this scene entirely — App only mounts it when there is no
 *    `?persona=` in the URL, so a CV link lands straight on the readable view.
 *  - Read-to-text is never gated behind the game: "Read the site" is one click at
 *    the branch, and a "Skip to reading" control is present from the first screen.
 *  - Engine-free (no Phaser). The PLAY branch is a Phase-3 placeholder for now.
 *  - The avatar is cosmetic only: it implies a gender and carries a skin tone, but
 *    no visitor attribute is ever asked for or recorded as a claim.
 */

type Props = {
  /** Leave the scene into the canonical readable view for this persona. */
  onEnterReadable: (persona: Persona) => void;
};

type Step = 'welcome' | 'role' | 'branch' | 'avatar' | 'play';

const personas: { id: Persona; label: string; tagline: string; description: string }[] = [
  {
    id: 'recruiter',
    label: 'Recruiter',
    tagline: 'Is he the right fit?',
    description:
      'Pick a role lens — Backend, Embedded, Full-stack, QA, Scrum-Master, Tech Lead, or Product — and the site reframes Hasrul\'s 18-year career around what matters for that specific role.',
  },
  {
    id: 'founder',
    label: 'Founder / Owner',
    tagline: 'Can he own it end-to-end?',
    description:
      'Three projects where one engineer did everything. Plus 13+ years of cycling through PM, Analyst, Architect, Developer, and QA hats — often two or three at once. The market\'s new shape is his old shape.',
  },
  {
    id: 'stalker',
    label: 'Casual / Stalker',
    tagline: 'Who is this person?',
    description:
      'The human behind the GitHub. Internet café owner at age 19, BK21 scholar in South Korea, physics-team finalist, blogger award winner. The engineering is real; so is the backstory.',
  },
];

// Avatar = a base figure (implies gender) + an optional emoji skin-tone modifier.
// Nothing here is asked as a question; the visitor just picks who represents them.
const FIGURES = [
  { id: 'person', emoji: '🧑' },
  { id: 'woman', emoji: '👩' },
  { id: 'man', emoji: '👨' },
];

const TONES = [
  { id: 'default', mod: '', label: 'Default' },
  { id: 'light', mod: '\u{1F3FB}', label: 'Light' },
  { id: 'medium-light', mod: '\u{1F3FC}', label: 'Medium-light' },
  { id: 'medium', mod: '\u{1F3FD}', label: 'Medium' },
  { id: 'medium-dark', mod: '\u{1F3FE}', label: 'Medium-dark' },
  { id: 'dark', mod: '\u{1F3FF}', label: 'Dark' },
];

export function EntryScene({ onEnterReadable }: Props) {
  const [step, setStep] = useState<Step>('welcome');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [figure, setFigure] = useState(FIGURES[0]);
  const [tone, setTone] = useState(TONES[0]);

  const personaLabel = personas.find((p) => p.id === persona)?.label ?? '';
  const avatarEmoji = figure.emoji + tone.mod;

  // The ≤1-click read escape: once a role is chosen it goes straight to text;
  // before that, it advances to the (mandatory) role chooser.
  const skipToReading = () => (persona ? onEnterReadable(persona) : setStep('role'));

  if (step === 'welcome') {
    return (
      <div className="selector-page entry-page">
        <button className="entry-skip-corner" onClick={skipToReading}>
          Skip to reading →
        </button>
        <div className="entry-card entry-welcome">
          <p className="entry-eyebrow">hasrul.buzz</p>
          <h1 className="entry-title">Well met, adventurer.</h1>
          <p className="entry-greeting">
            I'm Hasrul — eighteen years of building things, a few of them worth telling. You've
            wandered in. The only question is what you came to find out about me.
          </p>
          <button className="entry-primary" onClick={() => setStep('role')}>
            Choose your path →
          </button>
        </div>
      </div>
    );
  }

  if (step === 'branch' && persona) {
    return (
      <div className="selector-page entry-page">
        <header className="entry-head">
          <p className="entry-eyebrow">You enter as</p>
          <h1 className="entry-title">{personaLabel}</h1>
          <p className="entry-sub">How do you want to discover the story?</p>
        </header>

        <div className="branch-grid">
          <button className="branch-card branch-read" onClick={() => onEnterReadable(persona)}>
            <span className="branch-emoji" aria-hidden="true">📖</span>
            <span className="branch-label">Read the site</span>
            <span className="branch-desc">
              The full, no-friction version — everything, in text. The canonical path; always here.
            </span>
            <span className="branch-cta">Enter →</span>
          </button>

          <button className="branch-card branch-play" onClick={() => setStep('avatar')}>
            <span className="branch-emoji" aria-hidden="true">🎮</span>
            <span className="branch-label">Play the journey</span>
            <span className="branch-desc">
              Walk Hasrul's career as a world and uncover it station by station. Pick an avatar first.
            </span>
            <span className="branch-cta">Play →</span>
          </button>
        </div>

        <button className="entry-back" onClick={() => setStep('role')}>
          ← Choose a different role
        </button>
      </div>
    );
  }

  if (step === 'avatar' && persona) {
    return (
      <div className="selector-page entry-page">
        <button className="entry-skip-corner" onClick={skipToReading}>
          Skip to reading →
        </button>
        <header className="entry-head">
          <h1 className="entry-title">Choose your avatar</h1>
          <p className="entry-sub">Pick whoever represents you in the world. Purely for looks.</p>
        </header>

        <div className="avatar-preview" aria-hidden="true">{avatarEmoji}</div>

        <div className="avatar-pickers">
          <div className="avatar-row" role="group" aria-label="Avatar figure">
            {FIGURES.map((f) => (
              <button
                key={f.id}
                className={`avatar-figure${f.id === figure.id ? ' active' : ''}`}
                aria-pressed={f.id === figure.id}
                onClick={() => setFigure(f)}
              >
                {f.emoji + tone.mod}
              </button>
            ))}
          </div>
          <div className="avatar-row" role="group" aria-label="Skin tone">
            {TONES.map((t) => (
              <button
                key={t.id}
                className={`avatar-tone${t.id === tone.id ? ' active' : ''}`}
                aria-pressed={t.id === tone.id}
                title={t.label}
                onClick={() => setTone(t)}
              >
                {figure.emoji + t.mod}
              </button>
            ))}
          </div>
        </div>

        <button className="entry-primary" onClick={() => setStep('play')}>
          Enter the world →
        </button>
        <button className="entry-back" onClick={() => setStep('branch')}>
          ← Back
        </button>
      </div>
    );
  }

  if (step === 'play' && persona) {
    return (
      <div className="selector-page entry-page">
        <button className="entry-skip-corner" onClick={skipToReading}>
          Skip to reading →
        </button>
        <div className="entry-card play-stub">
          <div className="avatar-preview" aria-hidden="true">{avatarEmoji}</div>
          <h1 className="entry-title">The world is still being built.</h1>
          <p className="entry-greeting">
            The walkable journey — your avatar exploring Hasrul's career station by station, with
            challenges to unlock each one — is a later chapter, not a promise I'll pretend is ready.
            It's on the roadmap.
          </p>
          <p className="entry-sub">Everything's already waiting in the readable site, though:</p>
          <button className="entry-primary" onClick={() => onEnterReadable(persona)}>
            📖 Read the site instead →
          </button>
          <button className="entry-back" onClick={() => setStep('avatar')}>
            ← Change avatar
          </button>
        </div>
      </div>
    );
  }

  // step === 'role' (and the safe fallback for any persona-less state)
  return (
    <div className="selector-page entry-page">
      <header className="entry-head">
        <h1 className="entry-title">Who goes there?</h1>
        <p className="entry-sub">
          Pick the lens that fits you — the story of Hasrul reshapes around it.
        </p>
      </header>

      <div className="persona-grid">
        {personas.map((p) => (
          <button
            key={p.id}
            className="persona-card"
            onClick={() => {
              setPersona(p.id);
              setStep('branch');
            }}
          >
            <span className="persona-label">{p.label}</span>
            <span className="persona-tagline">{p.tagline}</span>
            <span className="persona-desc">{p.description}</span>
            <span className="persona-cta">Choose →</span>
          </button>
        ))}
      </div>

      <footer className="selector-footer">
        <p>
          Already know where you're going?{' '}
          <span className="muted">Deep-link any view: ?persona=recruiter&amp;lens=backend</span>
        </p>
      </footer>
    </div>
  );
}
