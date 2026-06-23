/**
 * Visitor avatar options — cosmetic only, recording no claim about the visitor (§A).
 * Per ADR-0013 the avatar is chosen *in-world*; until that picker is wired, the
 * game uses DEFAULT_AVATAR. These option lists are preserved here (they used to
 * live in the now-removed pre-game chooser) so the figure / skin-tone / hair work
 * isn't lost and can be reused by the in-world picker.
 *
 * Emoji compose as: base + skin-tone modifier + ZWJ + hair component.
 */

export const FIGURES = [
  { id: 'woman', emoji: '👩' },
  { id: 'man', emoji: '👨' },
];

export const TONES = [
  { id: 'light', mod: '\u{1F3FB}', label: 'Light' },
  { id: 'medium-light', mod: '\u{1F3FC}', label: 'Medium-light' },
  { id: 'medium', mod: '\u{1F3FD}', label: 'Medium' },
  { id: 'medium-dark', mod: '\u{1F3FE}', label: 'Medium-dark' },
  { id: 'dark', mod: '\u{1F3FF}', label: 'Dark' },
];

export const HAIRS = [
  { id: 'straight', mod: '', label: 'Straight' },
  { id: 'curly', mod: '\u{200D}\u{1F9B1}', label: 'Curly' },
  { id: 'red', mod: '\u{200D}\u{1F9B0}', label: 'Red' },
  { id: 'white', mod: '\u{200D}\u{1F9B3}', label: 'White' },
  { id: 'bald', mod: '\u{200D}\u{1F9B2}', label: 'Bald' },
];

export function buildAvatar(figure: string, toneMod: string, hairMod: string): string {
  return figure + toneMod + hairMod;
}

/** The avatar used until the in-world picker is wired (ADR-0013). */
export const DEFAULT_AVATAR = FIGURES[0].emoji; // 🧑
