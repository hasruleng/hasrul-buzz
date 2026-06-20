import { lenses } from '../content/lenses';
import type { RoleLens } from '../content/types';

type Props = {
  onSelect: (lens: RoleLens) => void;
  onBack: () => void;
};

export function LensSelector({ onSelect, onBack }: Props) {
  return (
    <div className="view">
      <nav className="view-nav">
        <button className="back-btn" onClick={onBack}>← Change persona</button>
        <span className="persona-badge recruiter-badge">Recruiter view</span>
      </nav>

      <header className="view-header">
        <h1>What role are you hiring for?</h1>
        <p className="view-subtitle">
          Pick a lens. The same 18-year career re-frames itself around what matters for that role —
          filtered projects, relevant skills, a fit summary, and an honest gap-and-bridge note.
        </p>
      </header>

      <div className="lens-grid">
        {lenses.map((lens) => (
          <button
            key={lens.id}
            className="lens-card"
            onClick={() => onSelect(lens.id)}
          >
            <span className="lens-label">{lens.label}</span>
            <span className="lens-tagline">{lens.tagline}</span>
            <span className="lens-cta">View this lens →</span>
          </button>
        ))}
      </div>

      <footer className="view-footer">
        <p className="muted">
          Every lens is deep-linkable — e.g. <code>?persona=recruiter&amp;lens=backend</code>.
          Paste the matching link into an application and the recruiter lands on the right story.
        </p>
      </footer>
    </div>
  );
}
