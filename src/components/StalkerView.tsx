type Props = { onBack: () => void };

const facts = [
  {
    label: 'The origin story',
    text: 'Built and ran an internet café inside the Universitas Indonesia dormitory from his 2nd undergrad semester. Tech, ops, HR, finance, and customer service — alone, age 19. It ran for 8 years.',
  },
  {
    label: 'South Korea',
    text: 'Won a Brain Korea 21 (BK21) full government scholarship — one of South Korea\'s most competitive academic programmes. Moved to Sun Moon University, completed an MSc in Computer Science, and won a top-10 blogger award at "World Students in Korea."',
  },
  {
    label: 'Physics nerd',
    text: 'Represented his high school (Insan Cendekia Serpong — one of Indonesia\'s top-ranked science schools) at the national physics competition. Reached 4th place nationally.',
  },
  {
    label: 'AI-augmented from the start',
    text: 'Uses Claude, Gemini, GitHub Copilot, ChatGPT, and Deepseek as daily engineering collaborators — not for hype, but because it doubles his output. His CLAUDE.md files document the anti-hallucination rules he enforced on his own AI assistant.',
  },
  {
    label: 'Hardware tinkerer',
    text: 'In 2023, built a Raspberry Pi + Python rig that brute-forces a TV PIN via GPIO pins. Planned the next version with a camera module and computer vision to detect the unlock event. Posted it publicly on LinkedIn.',
  },
  {
    label: 'The breadth is not an accident',
    text: 'Warnet → Pariti (co-founder) → UI Lecturer → PLN IT Manager → Ecomindo Scrum Master → EngD researcher → Thermo Fisher static analysis engineer → Alltrons embedded + security R&D. He didn\'t pivot to avoid depth — he cycled to find the edges of each discipline.',
  },
  {
    label: 'Language arc',
    text: 'Indonesian (native) · English (professional) · Dutch (conversational and growing). Lived in Indonesia, South Korea, and the Netherlands — three very different engineering cultures.',
  },
];

export function StalkerView({ onBack }: Props) {
  return (
    <div className="view">
      <nav className="view-nav">
        <button className="back-btn" onClick={onBack}>← Change lens</button>
        <span className="persona-badge stalker-badge">Casual / Stalker view</span>
      </nav>

      <header className="view-header">
        <h1>Hasrul Maruf</h1>
        <p className="view-subtitle">The person behind the GitHub.</p>
        <p className="view-tagline">
          Internet café founder · BK21 scholar · physics finalist · hardware tinkerer · AI-augmented engineer
        </p>
      </header>

      <section className="view-section">
        <h2>Who is this person?</h2>
        <div className="fact-list">
          {facts.map((f) => (
            <div key={f.label} className="fact-card">
              <div className="fact-label">{f.label}</div>
              <p className="fact-text">{f.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="view-section">
        <h2>Currently</h2>
        <p>
          Based in Eindhoven, Netherlands. Working at Alltrons on IoT, full-stack, mobile, and
          security R&D projects. Pursuing ISTQB CTFL → CT-AI certifications. Open to conversations
          about interesting problems in any time zone.
        </p>
      </section>

      <section className="view-section">
        <h2>What he's about</h2>
        <p>
          He builds things that work, ships them before they're perfect, and learns what's
          wrong from users rather than from speculation. The Warnet taught him that. PLN reinforced
          it at national scale. Alltrons is the current proving ground.
        </p>
        <p>
          He's not chasing the flashiest stack. He's chasing the hardest problem available in
          the constraints he has.
        </p>
      </section>

      <footer className="view-footer">
        <p>
          <a href="https://www.linkedin.com/in/hasrule/" target="_blank" rel="noreferrer">LinkedIn</a>
          {' · '}
          hasrule@hotmail.com
        </p>
      </footer>
    </div>
  );
}
