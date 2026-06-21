import { useState } from 'react';
import type { Station } from '../content/types';

type Props = {
  stations: Station[];
  /** id of the station expanded by default (defaults to the first/most-recent) */
  defaultOpenId?: string;
};

/**
 * Option A from ADR-0004 — vertical scrolling timeline.
 * Stations top-to-bottom on a connecting line; click a node to expand its detail.
 */
export function Timeline({ stations, defaultOpenId }: Props) {
  const [openId, setOpenId] = useState<string | null>(
    defaultOpenId ?? stations[0]?.id ?? null,
  );

  return (
    <div className="timeline">
      {stations.map((s) => {
        const open = openId === s.id;
        return (
          <div key={s.id} className={`tl-node${open ? ' open' : ''}`}>
            <button
              className="tl-head"
              onClick={() => setOpenId(open ? null : s.id)}
              aria-expanded={open}
            >
              <span className="tl-dot" aria-hidden="true" />
              <span className="tl-period">{s.period}</span>
              <span className="tl-employer">{s.employer}</span>
              <span className="tl-role">{s.role}</span>
              <span className="tl-toggle" aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            {open && (
              <div className="tl-body">
                <p className="tl-summary">{s.summary}</p>
                <ul className="tl-bullets">
                  {s.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
