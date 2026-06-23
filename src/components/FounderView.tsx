import { projects } from '../content/projects';
import { Compass } from './Compass';

type Props = { onBack: () => void };

const purePE = projects.filter((p) => p.isPurePE);

const roleCyclingArc = [
  {
    period: 'Feb 2013 – Jul 2021 (8.5 yrs)',
    org: 'PT PLN Enjiniring',
    hats: 'IT Manager + Product Manager / Business Analyst + Architect + PMO Team',
    note: 'Portfolio of 10+ internal IT products simultaneously. PINTAR (national 35GW monitoring, 18 sites, 4-yr). Virtual Cubicle (team of 30, 3-yr). SAP ERP Rescue (€200K write-off prevented). 30× IT asset growth.',
  },
  {
    period: 'Nov 2021 – Oct 2023 (2 yrs)',
    org: 'Ecomindo',
    hats: 'Scrum Master + Supporting Architect + Project Manager',
    note: '9 teams, €1M+ portfolio across financial services, retail, and transportation. DevSecOps framework adopted by 50+ engineers. Transjakarta real-time GPS for 1M+ daily commuters.',
  },
  {
    period: 'Jan 2026 – present',
    org: 'Alltrons',
    hats: 'Senior IC delivering across 5 projects simultaneously',
    note: 'Full-stack web (EV Fleet), enterprise supply chain (AlphaTheta), mobile accessibility (Speechlabel), multi-platform embedded firmware (MIFARE smart-lock), security R&D architecture (WBSO Secure Offline IoT Bridge). Three hardware stacks.',
  },
];

export function FounderView({ onBack }: Props) {
  return (
    <div className="view">
      <nav className="view-nav">
        <button className="back-btn" onClick={onBack}>← Change lens</button>
        <span className="persona-badge founder-badge">Founder / Boss-mode view</span>
      </nav>

      <header className="view-header">
        <h1>Hasrul Maruf</h1>
        <p className="view-subtitle">
          One engineer with 13+ years of every hat — before the market needed a name for it.
        </p>
        <p className="view-tagline">
          AI is collapsing the PM + Scrum Master + Analyst + Architect + Developer + QE stack into one role.
          Hasrul has been that role since 2013 — 13+ years before the market needed a name for it.
        </p>
      </header>

      <section className="view-section">
        <h2>The 4 pure-PE projects</h2>
        <p className="section-note">
          One engineer, end-to-end ownership of the full problem space.
        </p>
        <div className="project-list">
          {purePE.map((p) => (
            <div key={p.id} className="project-card pe-card">
              <div className="project-name">{p.name}</div>
              <div className="project-period">{p.period}</div>
              <div className="project-one-liner">{p.oneLiner}</div>
              {p.metric && <div className="project-metric">{p.metric}</div>}
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>13+ years of role-cycling</h2>
        <p className="section-note">
          Not all 6 hats at once for 13 years straight — that would be fiction. Honest claim:
          cycling through PM, Scrum Master, Analyst, Architect, Developer, and QE, often holding
          2–3 concurrently per project or tenure.
        </p>
        <div className="arc-list">
          {roleCyclingArc.map((arc) => (
            <div key={arc.org} className="arc-item">
              <div className="arc-header">
                <span className="arc-period">{arc.period}</span>
                <span className="arc-org">{arc.org}</span>
              </div>
              <div className="arc-hats">{arc.hats}</div>
              <div className="arc-note">{arc.note}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Why the two halves reinforce each other</h2>
        <p>
          The 4 pure-PE projects prove he can own everything end-to-end. The 13+ years of
          role-cycling prove he can be <em>whatever role the project needs at any moment</em>.
          The cycling is what makes the solo ownership credible — you can only be every role
          at once if you've already been all of them separately.
        </p>
      </section>

      <section className="view-section">
        <h2>Formal PM / SM credentials</h2>
        <ul className="creds-list">
          <li><strong>PMP</strong> — Project Management Institute (active until Jan 2028). Most engineers pivoting to PE/FDE roles don't hold a current PMP.</li>
          <li><strong>PSM I</strong> — Scrum.org. Paired with 10+ years of formal PM/SM ownership (PLN PMO 2.5 yrs + PLN PM-on-projects 8.5 yrs + Ecomindo SM/PM 2 yrs).</li>
          <li><strong>PM Flip Product Management curriculum</strong> — PM role, real-case PM, MVP, PRD, Practical Problem Solving. Proves the customer and product-discovery muscle alongside the engineering side.</li>
        </ul>
      </section>

      <section className="view-section">
        <h2>The origin</h2>
        <p>
          Warnet owner at age 19, running an internet café inside the Universitas Indonesia
          dormitory — tech, ops, HR, finance, and customer service alone. That's where the
          clock started. It ran through Pariti (co-founder, direct-to-client engagements for Bank
          Indonesia, BNI, and Pegadaian) → PLN Enjiniring (30× IT asset growth, national-scale
          delivery) → Ecomindo (9 teams, €1M+ portfolio) → Thermo Fisher + Alltrons.
        </p>
      </section>

      <footer className="view-footer">
        <Compass className="view-compass" size={32} title="Map of Hasrul's world" />
        <p>
          hasrule@hotmail.com
          {' · '}<a href="https://www.linkedin.com/in/hasrule/" target="_blank" rel="noreferrer">LinkedIn</a>
          {' · '}<a href="https://github.com/hasruleng" target="_blank" rel="noreferrer">GitHub</a>
          {' · '}<a href="https://github.com/hasruleng/hasrul-buzz" target="_blank" rel="noreferrer">this site's source</a>
        </p>
      </footer>
    </div>
  );
}
