import { lenses, type LensDef } from '../content/lenses';
import { stations } from '../content/stations';
import type { Station, Persona } from '../content/types';

/**
 * The game world (ADR-0008 hub · ADR-0013 default landing). A world larger than
 * the viewport, so you must *walk* to explore — the camera follows the avatar
 * (movement is load-bearing, ADR-0013). Coordinates are in world pixels.
 * Rendered in DOM/SVG, no engine (ADR-0012); cartographic tokens (ADR-0011).
 */

export const WORLD = { w: 1600, h: 1000 };
export const SPAWN = { x: 800, y: 860 };
/** Within this pixel-distance of a marker, it can be entered. */
export const ENTER_RADIUS = 120;
export const VISTA = { x: 1460, y: 170 };

export type Building = {
  lens: LensDef;
  emoji: string;
  x: number;
  y: number;
  stations: Station[];
};

const PLACEMENT: Record<string, { emoji: string; x: number; y: number }> = {
  backend:   { emoji: '🗄️', x: 360,  y: 360 },
  fullstack: { emoji: '🖥️', x: 740,  y: 200 },
  embedded:  { emoji: '🔌', x: 1180, y: 300 },
  qa:        { emoji: '🔬', x: 1410, y: 600 },
  pm:        { emoji: '📋', x: 1180, y: 840 },
  techlead:  { emoji: '👥', x: 470,  y: 790 },
  product:   { emoji: '🚀', x: 220,  y: 600 },
};

export const buildings: Building[] = lenses.map((lens) => {
  const place = PLACEMENT[lens.id] ?? { emoji: '🏛️', x: 800, y: 500 };
  return {
    lens,
    emoji: place.emoji,
    x: place.x,
    y: place.y,
    stations: stations.filter((s) => s.tags.includes(lens.id)),
  };
});

/** In-world persona selection (ADR-0013): walk to a gate to choose your quest. */
export type Quest = {
  persona: Persona;
  emoji: string;
  label: string;
  blurb: string;
  x: number;
  y: number;
};

export const QUESTS: Quest[] = [
  { persona: 'recruiter', emoji: '🎯', label: 'Recruiter',       blurb: 'Is he right for the role?',     x: 560,  y: 600 },
  { persona: 'founder',   emoji: '🧭', label: 'Founder / Owner', blurb: 'Can he own it end-to-end?',     x: 800,  y: 470 },
  { persona: 'stalker',   emoji: '👋', label: 'Casual',          blurb: 'Who is this person, really?',   x: 1040, y: 600 },
];

/** Nearest marker within `radius`, or null. Generic over anything with x/y. */
export function nearest<T extends { x: number; y: number }>(
  pos: { x: number; y: number },
  items: T[],
  radius: number,
): T | null {
  let best: T | null = null;
  let min = Infinity;
  for (const it of items) {
    const d = Math.hypot(pos.x - it.x, pos.y - it.y);
    if (d < min) {
      min = d;
      best = it;
    }
  }
  return min <= radius ? best : null;
}
