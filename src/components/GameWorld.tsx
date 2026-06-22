import { useEffect, useRef, useState } from 'react';
import type { Persona } from '../content/types';
import {
  buildings,
  QUESTS,
  WORLD,
  SPAWN,
  VISTA,
  ENTER_RADIUS,
  nearest,
  type Building,
  type Quest,
} from '../game/world';
import { DEFAULT_AVATAR } from '../game/avatar';
import { HasrulAvatar } from './HasrulAvatar';

/**
 * The game world — the default landing (ADR-0013). You spawn into a world larger
 * than the screen and *walk* (the camera follows you), so movement is the way you
 * explore rather than a static menu (ADR-0013's answer to "it feels like nav").
 * Persona is chosen IN-WORLD by walking to a quest gate; the readable site is the
 * always-present escape (content-first guarantee). Rendered in DOM/SVG, no engine
 * (ADR-0012); cartographic tokens (ADR-0011).
 *
 * Stubbed for later slices: the gatekeeper's predict-then-reveal challenge
 * (ADR-0007), in-world NPC dialogue + screenshot exhibits, the finale (ADR-0008),
 * the in-world avatar picker, and founder/casual world framing (ADR-0009).
 */

type Props = {
  /** Leave for the canonical readable site (the magic door / skip-to-text). */
  onRead: (persona: Persona) => void;
};

const PERSONA_LABEL: Record<Persona, string> = {
  recruiter: 'Recruiter',
  founder: 'Founder / Owner',
  stalker: 'Casual',
};

const STEP = 38;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function GameWorld({ onRead }: Props) {
  const [pos, setPos] = useState(SPAWN);
  const [persona, setPersona] = useState<Persona | null>(null);
  const [open, setOpen] = useState<Building | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());
  const [moved, setMoved] = useState(false);

  const viewportRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 880, h: 520 });

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setVp({ w: el.clientWidth, h: el.clientHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const nearQuest = !persona ? nearest(pos, QUESTS, ENTER_RADIUS) : null;
  const nearBuilding = persona ? nearest(pos, buildings, ENTER_RADIUS) : null;

  const chooseQuest = (q: Quest) => {
    setPersona(q.persona);
    setMoved(true);
  };
  const enter = (b: Building) => {
    setVisited((v) => new Set(v).add(b.lens.id));
    setOpen(b);
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (open) {
        if (e.key === 'Escape') setOpen(null);
        return;
      }
      let dx = 0;
      let dy = 0;
      switch (e.key) {
        case 'ArrowUp': case 'w': case 'W': dy = -STEP; break;
        case 'ArrowDown': case 's': case 'S': dy = STEP; break;
        case 'ArrowLeft': case 'a': case 'A': dx = -STEP; break;
        case 'ArrowRight': case 'd': case 'D': dx = STEP; break;
        case 'Enter': case ' ':
          if (nearQuest) { e.preventDefault(); chooseQuest(nearQuest); }
          else if (nearBuilding) { e.preventDefault(); enter(nearBuilding); }
          return;
        default: return;
      }
      e.preventDefault();
      setMoved(true);
      setPos((p) => ({ x: clamp(p.x + dx, 30, WORLD.w - 30), y: clamp(p.y + dy, 30, WORLD.h - 30) }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, nearQuest, nearBuilding]);

  // Camera: keep the avatar centred, clamped so the world edges don't pull away.
  const camX = clamp(vp.w / 2 - pos.x, vp.w - WORLD.w, 0);
  const camY = clamp(vp.h / 2 - pos.y, vp.h - WORLD.h, 0);

  return (
    <div className="selector-page entry-page game-page">
      <div className="game-readbar">
        <span className="game-persona">
          {persona ? `Quest · ${PERSONA_LABEL[persona]}` : 'Choose your quest'}
        </span>
        <button className="game-door" onClick={() => onRead(persona ?? 'founder')}>
          📖 Read the site
        </button>
      </div>

      <div
        className="game-viewport"
        ref={viewportRef}
        role="application"
        aria-label="Hasrul's world — walk with the arrow keys; approach a marker and press Enter"
      >
        <div
          className="game-world"
          style={{ width: WORLD.w, height: WORLD.h, transform: `translate(${camX}px, ${camY}px)` }}
        >
          <div className="game-contour" aria-hidden="true" />
          <div className="game-vista" style={{ left: VISTA.x, top: VISTA.y }} aria-hidden="true">⛰️</div>

          {!persona &&
            QUESTS.map((q) => (
              <button
                key={q.persona}
                className={'game-quest' + (nearQuest?.persona === q.persona ? ' near' : '')}
                style={{ left: q.x, top: q.y }}
                onClick={() => chooseQuest(q)}
              >
                <span className="gb-emoji" aria-hidden="true">{q.emoji}</span>
                <span className="gb-label">{q.label}</span>
                <span className="gq-blurb">{q.blurb}</span>
              </button>
            ))}

          {persona &&
            buildings.map((b) => (
              <button
                key={b.lens.id}
                className={
                  'game-building' +
                  (nearBuilding?.lens.id === b.lens.id ? ' near' : '') +
                  (visited.has(b.lens.id) ? ' visited' : '')
                }
                style={{ left: b.x, top: b.y }}
                onClick={() => enter(b)}
              >
                <span className="gb-emoji" aria-hidden="true">{b.emoji}</span>
                <span className="gb-label">{b.lens.label}</span>
              </button>
            ))}

          <div className="game-avatar" style={{ left: pos.x, top: pos.y }} aria-hidden="true">
            {DEFAULT_AVATAR}
          </div>
        </div>

        {!persona && !moved && (
          <div className="game-banner">
            <HasrulAvatar size={52} />
            <p>
              <b>Well met, adventurer.</b> Walk to a gate to choose your quest — or 📖 read the site anytime.
            </p>
          </div>
        )}

        {(nearQuest || nearBuilding) && !open && (
          <div className="game-prompt">
            Press <kbd>Enter</kbd> to{' '}
            {nearQuest ? (
              <>choose <b>{nearQuest.label}</b></>
            ) : (
              <>explore <b>{nearBuilding!.lens.label}</b></>
            )}
          </div>
        )}
      </div>

      <p className="game-hint">
        Walk with <kbd>← ↑ ↓ →</kbd> / <kbd>WASD</kbd>.{' '}
        {persona ? 'Explore the buildings — ' : 'Reach a gate to begin — '}📖 read the site anytime.
      </p>

      {open && (
        <div className="game-panel-backdrop" onClick={() => setOpen(null)}>
          <div
            className="game-panel"
            role="dialog"
            aria-modal="true"
            aria-label={open.lens.label}
            onClick={(e) => e.stopPropagation()}
          >
            <header className="gp-head">
              <span className="gp-emoji" aria-hidden="true">{open.emoji}</span>
              <div>
                <h2 className="gp-title">{open.lens.label}</h2>
                <p className="gp-tagline">{open.lens.tagline}</p>
              </div>
              <button className="gp-close" onClick={() => setOpen(null)} aria-label="Back to the map">✕</button>
            </header>

            <p className="gp-headline">{open.lens.headline}</p>
            <p className="gp-fit">{open.lens.fitSummary}</p>

            <h3 className="gp-sub">Where this shows up</h3>
            <ul className="gp-stations">
              {open.stations.map((s) => (
                <li key={s.id}>
                  <b>{s.employer}</b> — {s.role} <span className="gp-period">{s.period}</span>
                </li>
              ))}
            </ul>

            <div className="gp-foot">
              <button className="entry-primary" onClick={() => onRead(persona ?? 'founder')}>
                🚪 Take the magic door to the readable site →
              </button>
              <button className="entry-back" onClick={() => setOpen(null)}>← Back to the map</button>
            </div>

            <p className="gp-note">
              A gatekeeper's challenge will live here later (ADR-0007). For now the door is always open.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
