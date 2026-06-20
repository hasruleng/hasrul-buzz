import { stations } from '../content/stations';
import { projects } from '../content/projects';
import type { LensDef } from '../content/lenses';

type Props = {
  lens: LensDef;
  onChangeLens: () => void;
  onBack: () => void;
};

export function RecruiterView({ lens, onChangeLens, onBack }: Props) {
  const relevantProjects = projects.filter((p) => p.tags.includes(lens.id));

  return (
    <div className="view">
      <nav className="view-nav">
        <button className="back-btn" onClick={onChangeLens}>← Change lens</button>
        <button className="back-btn" onClick={onBack}>Change persona</button>
        <span className="persona-badge recruiter-badge">{lens.label}</span>
      </nav>

      <header className="view-header">
        <h1>Hasrul Maruf</h1>
        <p className="view-subtitle">{lens.headline}</p>
        <p className="view-tagline">
          18+ years · EngD (TU/e) · PMP · PSM I · Eindhoven, NL · open to relocation globally
        </p>
      </header>

      <section className="view-section">
        <h2>Fit for {lens.label}</h2>
        <p>{lens.fitSummary}</p>
        <div className="bridge-note">
          <span className="bridge-label">Honest gap &amp; bridge</span>
          <p>{lens.bridge}</p>
        </div>
      </section>

      <section className="view-section">
        <h2>Most relevant skills</h2>
        <div className="lens-skills">
          {lens.skills.map((s) => (
            <span key={s} className="skill-chip">{s}</span>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Projects for this lens</h2>
        <p className="section-note">
          {relevantProjects.length} of {projects.length} flagship projects matched to {lens.label}.
        </p>
        <div className="project-list">
          {relevantProjects.map((p) => (
            <div key={p.id} className={`project-card${p.isPurePE ? ' pe-card' : ''}`}>
              <div className="project-name">{p.name}</div>
              <div className="project-period">{p.period}</div>
              <div className="project-one-liner">{p.oneLiner}</div>
              {p.metric && <div className="project-metric">{p.metric}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Full career timeline</h2>
        <p className="section-note">
          The complete arc — the lens above filters the highlights, but the whole career is here.
        </p>
        <div className="station-list">
          {stations.map((s) => (
            <div key={s.id} className="station">
              <div className="station-meta">
                <span className="station-period">{s.period}</span>
                <span className="station-employer">{s.employer}</span>
                <span className="station-location">{s.location}</span>
              </div>
              <div className="station-role">{s.role}</div>
              <p className="station-summary">{s.summary}</p>
              <ul className="station-bullets">
                {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Education &amp; credentials</h2>
        <ul className="creds-list">
          <li><strong>EngD Software Technology</strong> — TU Eindhoven (Oct 2023–Oct 2025) · Stan Ackermans Institute (4TU)</li>
          <li><strong>MSc Computer Science &amp; Engineering</strong> — Sun Moon University, South Korea (BK21 full government scholarship)</li>
          <li><strong>BSc Computer Science</strong> — University of Indonesia</li>
          <li><strong>PMP</strong> — Project Management Institute (active until Jan 2028)</li>
          <li><strong>PSM I</strong> — Scrum.org (no expiry)</li>
          <li>ISO/IEC 25010 training (TU/e 2024) · ISO 27001 Lead Implementer training (ITGID/PROXSIS 2020) · ISO 55001 training (BSI 2016)</li>
        </ul>
      </section>

      <footer className="view-footer">
        <p>hasrule@hotmail.com · +31 616 828 809 · <a href="https://www.linkedin.com/in/hasrule/" target="_blank" rel="noreferrer">linkedin.com/in/hasrule</a></p>
      </footer>
    </div>
  );
}
