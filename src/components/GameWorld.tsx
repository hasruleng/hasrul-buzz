import { useCallback, useEffect, useRef, useState } from 'react';
import type { Persona } from '../content/types';
import {
  buildings,
  WORLD,
  SPAWN,
  VISTA,
  ENTER_RADIUS,
  nearest,
  type Building,
} from '../game/world';
import { FIGURES, TONES, HAIRS, buildAvatar } from '../game/avatar';
import { HasrulAvatar } from './HasrulAvatar';

/**
 * The game world — the default landing (ADR-0013). Scenes ①–② (welcome splash,
 * quest/persona select, avatar pick) play out as overlays before the walkable
 * hub (scene ③) begins. Rendered in DOM/SVG, no engine (ADR-0012); cartographic
 * tokens (ADR-0011).
 */

type GamePhase = 'welcome' | 'quest-select' | 'avatar-pick' | 'playing';

type Props = {
  onRead: (persona: Persona) => void;
};

const PERSONA_LABEL: Record<Persona, string> = {
  recruiter: 'Recruiter',
  founder: 'Founder / Owner',
  stalker: 'Casual',
};

const QUEST_CARDS: { persona: Persona; emoji: string; label: string; blurb: string }[] = [
  { persona: 'recruiter', emoji: '🎯', label: "The Recruiter's Path",  blurb: 'You assess talent. Is Hasrul right for the role?' },
  { persona: 'founder',   emoji: '🧭', label: "The Founder's Trial",   blurb: 'You need someone to own it end-to-end. Can he?' },
  { persona: 'stalker',   emoji: '👋', label: "The Wanderer's Way",    blurb: "You're just curious. Who is this person, really?" },
];

const STEP = 38;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

export function GameWorld({ onRead }: Props) {
  const [phase, setPhase] = useState<GamePhase>('welcome');
  const [persona, setPersona] = useState<Persona | null>(null);
  const [open, setOpen] = useState<Building | null>(null);
  const [visited, setVisited] = useState<Set<string>>(new Set());

  const [pos, setPos] = useState(SPAWN);
  const viewportRef = useRef<HTMLDivElement>(null);
  const [vp, setVp] = useState({ w: 880, h: 520 });
  const moveIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Avatar picker state (scene ②)
  const [figure, setFigure] = useState(FIGURES[0]);
  const [tone, setTone]     = useState(TONES[0]);
  const [hair, setHair]     = useState(HAIRS[0]);
  const avatarEmoji = buildAvatar(figure.emoji, tone.mod, hair.mod);

  // Scene ①: auto-dismiss welcome after 3.5 s
  useEffect(() => {
    if (phase !== 'welcome') return;
    const t = setTimeout(() => setPhase('quest-select'), 3500);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const measure = () => setVp({ w: el.clientWidth, h: el.clientHeight });
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const nearBuilding = phase === 'playing' ? nearest(pos, buildings, ENTER_RADIUS) : null;

  const enter = (b: Building) => {
    setVisited((v) => new Set(v).add(b.lens.id));
    setOpen(b);
  };

  const stopMove = useCallback(() => {
    if (moveIntervalRef.current !== null) {
      clearInterval(moveIntervalRef.current);
      moveIntervalRef.current = null;
    }
  }, []);

  const startMove = useCallback((dx: number, dy: number) => {
    if (open || phase !== 'playing') return;
    stopMove();
    const step = () =>
      setPos((p) => ({ x: clamp(p.x + dx * STEP, 30, WORLD.w - 30), y: clamp(p.y + dy * STEP, 30, WORLD.h - 30) }));
    step();
    moveIntervalRef.current = setInterval(step, 120);
  }, [open, phase, stopMove]);

  useEffect(() => stopMove, [stopMove]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (phase !== 'playing') return;
      if (open) {
        if (e.key === 'Escape') setOpen(null);
        return;
      }
      let dx = 0, dy = 0;
      switch (e.key) {
        case 'ArrowUp':    case 'w': case 'W': dy = -STEP; break;
        case 'ArrowDown':  case 's': case 'S': dy =  STEP; break;
        case 'ArrowLeft':  case 'a': case 'A': dx = -STEP; break;
        case 'ArrowRight': case 'd': case 'D': dx =  STEP; break;
        case 'Enter': case ' ':
          if (nearBuilding) { e.preventDefault(); enter(nearBuilding); }
          return;
        default: return;
      }
      e.preventDefault();
      setPos((p) => ({ x: clamp(p.x + dx, 30, WORLD.w - 30), y: clamp(p.y + dy, 30, WORLD.h - 30) }));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, phase, nearBuilding]);

  const camX = clamp(vp.w / 2 - pos.x, vp.w - WORLD.w, 0);
  const camY = clamp(vp.h / 2 - pos.y, vp.h - WORLD.h, 0);

  return (
    <div className="selector-page entry-page game-page">

      {/* Readbar — only during scene ③ */}
      {phase === 'playing' && (
        <div className="game-readbar">
          <span className="game-persona">
            {persona ? `Quest · ${PERSONA_LABEL[persona]}` : 'Choose your quest'}
          </span>
          <button className="game-door" onClick={() => onRead(persona ?? 'founder')}
            title="This door exits the game and takes you directly to your final destination">
            📖 Read
          </button>
        </div>
      )}

      {/* Viewport — always mounted (keeps measurement alive during onboarding) */}
      <div
        className={'game-viewport' + (phase !== 'playing' ? ' game-viewport--dim' : '')}
        ref={viewportRef}
        role="application"
        aria-label="Hasrul's world — walk with arrow keys or the D-pad; approach a marker and tap or press Enter"
      >
        <div
          className="game-world"
          style={{ width: WORLD.w, height: WORLD.h, transform: `translate(${camX}px, ${camY}px)` }}
        >
          <div className="game-contour" aria-hidden="true" />
          <div className="game-vista" style={{ left: VISTA.x, top: VISTA.y }} aria-hidden="true">⛰️</div>

          {phase === 'playing' && buildings.map((b) => (
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
            {avatarEmoji}
          </div>
        </div>

        {nearBuilding && !open && phase === 'playing' && (
          <button className="game-prompt" onClick={() => enter(nearBuilding)}>
            <span className="game-hint-key">Press <kbd>Enter</kbd> to </span>
            <span className="game-hint-touch">Tap to </span>
            explore <b>{nearBuilding.lens.label}</b>
          </button>
        )}

        {phase === 'playing' && !open && (
          <div className="game-dpad" aria-label="Move avatar">
            <button className="dpad-btn dpad-up"    aria-label="Move up"
              onPointerDown={() => startMove(0, -1)} onPointerUp={stopMove} onPointerLeave={stopMove} onPointerCancel={stopMove}>↑</button>
            <button className="dpad-btn dpad-left"  aria-label="Move left"
              onPointerDown={() => startMove(-1, 0)} onPointerUp={stopMove} onPointerLeave={stopMove} onPointerCancel={stopMove}>←</button>
            <button className="dpad-btn dpad-right" aria-label="Move right"
              onPointerDown={() => startMove(1, 0)}  onPointerUp={stopMove} onPointerLeave={stopMove} onPointerCancel={stopMove}>→</button>
            <button className="dpad-btn dpad-down"  aria-label="Move down"
              onPointerDown={() => startMove(0, 1)}  onPointerUp={stopMove} onPointerLeave={stopMove} onPointerCancel={stopMove}>↓</button>
          </div>
        )}
      </div>

      {/* Hint — scene ③ only */}
      {phase === 'playing' && (
        <p className="game-hint">
          <span className="game-hint-key">Walk with <kbd>← ↑ ↓ →</kbd> / <kbd>WASD</kbd>. </span>
          <span className="game-hint-touch">Use the D-pad to walk. </span>
          Explore the buildings — 📖 read the site anytime.
        </p>
      )}

      {/* ── Onboarding overlay (scenes ①–②) ──────────────── */}
      {phase !== 'playing' && (
        <div className="game-onboard">

          {/* Scene ①a: Welcome splash */}
          {phase === 'welcome' && (
            <div className="go-welcome">
              <HasrulAvatar size={80} />
              <p className="go-greeting"><b>Well met, adventurer.</b></p>
              <p className="go-text">
                I'm Hasrul — engineer, maker of things, occasional chaos-navigator.
                <br />Your quest awaits.
              </p>
              <div className="go-progress" aria-hidden="true">
                <div className="go-progress-bar" />
              </div>
              <button className="go-skip" onClick={() => setPhase('quest-select')}>
                Tap to begin →
              </button>
            </div>
          )}

          {/* Scene ①b: Quest / persona select */}
          {phase === 'quest-select' && (
            <div className="go-quest-select">
              <HasrulAvatar size={48} />
              <h2 className="go-title">What brings you here, adventurer?</h2>
              <div className="go-quest-grid">
                {QUEST_CARDS.map((q) => (
                  <button
                    key={q.persona}
                    className="go-quest-card"
                    onClick={() => { setPersona(q.persona); setPhase('avatar-pick'); }}
                  >
                    <span className="go-quest-emoji">{q.emoji}</span>
                    <b className="go-quest-label">{q.label}</b>
                    <p className="go-quest-blurb">{q.blurb}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Scene ②: Avatar pick */}
          {phase === 'avatar-pick' && (
            <div className="go-avatar-pick">
              <h2 className="go-title">Choose your avatar, adventurer</h2>
              <div className="go-avatar-preview" aria-label={`Selected avatar: ${avatarEmoji}`}>
                {avatarEmoji}
              </div>
              <div className="go-avatar-options">
                <div className="go-option-row">
                  <span className="go-option-label">Figure</span>
                  <div className="go-option-btns">
                    {FIGURES.map((f) => (
                      <button key={f.id} aria-label={f.id}
                        className={'go-option-btn' + (figure.id === f.id ? ' selected' : '')}
                        onClick={() => setFigure(f)}>{f.emoji}</button>
                    ))}
                  </div>
                </div>
                <div className="go-option-row">
                  <span className="go-option-label">Tone</span>
                  <div className="go-option-btns">
                    {TONES.map((t) => (
                      <button key={t.id} aria-label={t.label}
                        className={'go-option-btn' + (tone.id === t.id ? ' selected' : '')}
                        onClick={() => setTone(t)}>{figure.emoji + t.mod}</button>
                    ))}
                  </div>
                </div>
                <div className="go-option-row">
                  <span className="go-option-label">Hair</span>
                  <div className="go-option-btns">
                    {HAIRS.map((h) => (
                      <button key={h.id} aria-label={h.label}
                        className={'go-option-btn' + (hair.id === h.id ? ' selected' : '')}
                        onClick={() => setHair(h)}>{figure.emoji + tone.mod + h.mod}</button>
                    ))}
                  </div>
                </div>
              </div>
              <button className="entry-primary go-enter" onClick={() => setPhase('playing')}>
                Enter the world →
              </button>
              <button className="go-door" onClick={() => onRead(persona ?? 'founder')}
                title="This door exits the game and takes you directly to your final destination">
                🚪 Read instead
              </button>
            </div>
          )}

        </div>
      )}

      {/* Building panel (scene ④ stub) */}
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
              <button className="entry-primary" onClick={() => onRead(persona ?? 'founder')}
                title="This door exits the game and takes you directly to your final destination">
                🚪 Read instead
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
