import type { Persona } from '../content/types';

type Props = {
  onSelect: (p: Persona) => void;
};

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

export function PersonaSelector({ onSelect }: Props) {
  return (
    <div className="selector-page">
      <header className="selector-header">
        <h1>Hasrul Maruf</h1>
        <p className="selector-subtitle">
          Senior Software Engineer &amp; Product Engineer · 18+ years · Netherlands
        </p>
        <p className="selector-prompt">Who are you?</p>
      </header>

      <div className="persona-grid">
        {personas.map((p) => (
          <button
            key={p.id}
            className="persona-card"
            onClick={() => onSelect(p.id)}
          >
            <span className="persona-label">{p.label}</span>
            <span className="persona-tagline">{p.tagline}</span>
            <span className="persona-desc">{p.description}</span>
            <span className="persona-cta">Enter →</span>
          </button>
        ))}
      </div>

      <footer className="selector-footer">
        <p>
          The site adapts to you.{' '}
          <span className="muted">Deep-link any view: ?persona=recruiter&amp;lens=backend</span>
        </p>
      </footer>
    </div>
  );
}
