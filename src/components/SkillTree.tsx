import { useState } from 'react';
import type { Project } from '../content/types';
import type { LensDef } from '../content/lenses';
import { techIndex } from '../content/techIndex.generated';

type Props = {
  lens: LensDef;
  /** the projects already filtered to this lens — they decide which skills to show */
  projects: Project[];
};

/**
 * Option D from ADR-0004 — skill tree / character sheet, used as the lens's
 * Skills section. Which skills show is lens-driven (the lens's projects' tech);
 * the ×N count and the "proven in" list are CAREER-WIDE, crawled from the full
 * projects.csv into techIndex.generated.ts (see scripts/build-projects.mjs).
 * Click a skill → every project that used it.
 */
export function SkillTree({ lens, projects }: Props) {
  const [active, setActive] = useState<string | null>(null);

  const techs = Array.from(new Set(projects.flatMap((p) => p.tech)));
  const rows = techs
    .map((tech) => ({
      tech,
      // career-wide proof; fall back to the lens's own projects if a token is
      // somehow absent from the generated index.
      proof: techIndex[tech] ?? projects.filter((p) => p.tech.includes(tech)).map((p) => p.short),
    }))
    .sort((a, b) => b.proof.length - a.proof.length || a.tech.localeCompare(b.tech));

  return (
    <div className="skilltree">
      <div className="st-root">
        <span className="st-class">{lens.label}</span>
        <span className="st-level">
          {rows.length} skills · ×N = projects across the full career
        </span>
      </div>
      <div className="st-trunk" aria-hidden="true" />
      <ul className="st-branches">
        {rows.map(({ tech, proof }) => {
          const open = active === tech;
          return (
            <li key={tech} className={`st-node${open ? ' open' : ''}`}>
              <button
                className="st-skill"
                onClick={() => setActive(open ? null : tech)}
                aria-expanded={open}
              >
                {tech}
                <span className="st-count">×{proof.length}</span>
              </button>
              {open && (
                <span className="st-proof">proven in: {proof.join(' · ')}</span>
              )}
            </li>
          );
        })}
      </ul>
      <p className="st-hint">Click a skill to see every project that used it.</p>
    </div>
  );
}
