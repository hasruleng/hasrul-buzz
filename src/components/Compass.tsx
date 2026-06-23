/**
 * Compass rose — the recurring cartographic mark (ADR-0011).
 *
 * A small flat-SVG flourish that signals "this is a map." Used as the favicon
 * and as a corner mark in both the readable site and the game viewport. Inked
 * in --fg with the N-arm in --trail, echoing the route accent.
 */

type Props = {
  size?: number;
  className?: string;
  title?: string;
};

export function Compass({ size = 28, className, title = 'Compass' }: Props) {
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 64 64"
      role="img"
      aria-label={title}
    >
      {/* outer ring */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="32" cy="32" r="20" fill="none" stroke="currentColor" strokeWidth="0.6" opacity="0.55" />

      {/* secondary rose (E/W/S — ink) */}
      <polygon points="32,32 36,32 56,32 36,32" fill="currentColor" opacity="0.85" />
      <polygon points="32,32 28,32 8,32  28,32" fill="currentColor" opacity="0.55" />
      <polygon points="32,32 32,36 32,56 32,36" fill="currentColor" opacity="0.55" />

      {/* north arm — trail accent */}
      <polygon points="32,32 28,32 32,8 36,32" fill="var(--trail, currentColor)" />

      {/* tick marks at the cardinals */}
      <g stroke="currentColor" strokeWidth="0.8" opacity="0.6">
        <line x1="32" y1="2"  x2="32" y2="6" />
        <line x1="32" y1="58" x2="32" y2="62" />
        <line x1="2"  y1="32" x2="6"  y2="32" />
        <line x1="58" y1="32" x2="62" y2="32" />
      </g>

      {/* pivot */}
      <circle cx="32" cy="32" r="2" fill="currentColor" />
    </svg>
  );
}
