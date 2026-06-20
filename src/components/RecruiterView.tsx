import { stations } from '../content/stations';
import { projects } from '../content/projects';

type Props = { onBack: () => void };

const skills: { category: string; items: string[] }[] = [
  { category: 'Languages', items: ['C# .NET', 'Python', 'Java', 'SQL', 'C/C++ (embedded)'] },
  { category: 'Frontend', items: ['React', 'Web API', 'Micro Frontend'] },
  { category: 'Embedded', items: ['STM32 ST HAL', 'nRF52833 Zephyr RTOS', 'ESP32 ESP-IDF/FreeRTOS', 'I²C', 'MIFARE/RFID'] },
  { category: 'Cloud / DevOps', items: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform', 'GitLab CI/CD'] },
  { category: 'Data / IoT', items: ['Kafka', 'Elasticsearch', 'PostgreSQL', 'ETL pipelines', 'CAN-bus telemetry', 'Databricks', 'MLflow'] },
  { category: 'Methods', items: ['Scrum · SAFe · PMBOK · ITIL v4', 'PMP (active Jan 2028)', 'PSM I (Scrum.org)'] },
];

export function RecruiterView({ onBack }: Props) {
  return (
    <div className="view">
      <nav className="view-nav">
        <button className="back-btn" onClick={onBack}>← Change lens</button>
        <span className="persona-badge recruiter-badge">Recruiter view</span>
      </nav>

      <header className="view-header">
        <h1>Hasrul Maruf</h1>
        <p className="view-subtitle">
          Senior Software / Fullstack / Product Engineer · 18+ years · Eindhoven, Netherlands
        </p>
        <p className="view-tagline">
          EngD (TU/e) · PMP · PSM I · Indonesian, open to relocation globally
        </p>
      </header>

      <section className="view-section">
        <h2>Summary</h2>
        <p>
          18+ years spanning full-stack development, embedded firmware, software architecture,
          project and product management, DevSecOps, research, and teaching — across Indonesia,
          South Korea, and the Netherlands. Currently at Alltrons shipping across 5 simultaneous
          projects (web, mobile, multi-platform embedded, security R&amp;D). Recently completed an
          EngD at TU Eindhoven and a 10-month contract at Thermo Fisher Scientific.
        </p>
        <p className="hint">
          Role lens selector coming in Phase 1 — for now, all flagships are listed below.
          Deep-link: <code>?persona=recruiter&amp;lens=backend</code>
        </p>
      </section>

      <section className="view-section">
        <h2>Flagship projects</h2>
        <div className="project-list">
          {projects.map((p) => (
            <div key={p.id} className="project-card">
              <div className="project-name">{p.name}</div>
              <div className="project-period">{p.period}</div>
              <div className="project-one-liner">{p.oneLiner}</div>
              {p.metric && <div className="project-metric">{p.metric}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Career timeline</h2>
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
        <h2>Skills</h2>
        <div className="skills-grid">
          {skills.map((cat) => (
            <div key={cat.category} className="skill-category">
              <div className="skill-cat-label">{cat.category}</div>
              <div className="skill-items">{cat.items.join(' · ')}</div>
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
