'use client';

import { useMapStore } from '../hooks/useMapStore';
import { BRAND } from '@/lib/brand-tokens';
import { RotateCcw } from 'lucide-react';

export function MapHeader() {
  const { reset } = useMapStore();

  return (
    <>
      {/* Top-left section header */}
      <div className="absolute top-8 left-8 max-w-sm z-20 pointer-events-none">
        <div
          style={{
            fontFamily: BRAND.fontBody,
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: BRAND.accentGold,
            marginBottom: 10,
          }}
        >
          Where We Build
        </div>
        <h2
          style={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: 600,
            fontSize: 'clamp(1.6rem, 2.5vw, 2.4rem)',
            color: BRAND.ink,
            lineHeight: 1.08,
            letterSpacing: '-0.02em',
          }}
        >
          Three corridors.
          <br />
          <em
            style={{
              fontStyle: 'italic',
              fontWeight: 400,
              color: BRAND.accentGold,
            }}
          >
            Six projects.
          </em>
          <br />
          One trusted partner.
        </h2>
      </div>

      {/* Top-right reset */}
      <div className="absolute top-8 right-14 flex items-center gap-2 z-20">
        <button
          onClick={reset}
          className="flex items-center gap-2 px-3 py-2 transition-colors hover:border-[var(--accent-gold)]"
          style={{
            fontFamily: BRAND.fontBody,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            border: `1px solid ${BRAND.line}`,
            color: BRAND.inkMute,
            backgroundColor: `${BRAND.bgCream}CC`,
            cursor: 'pointer',
            outline: 'none',
            backdropFilter: 'blur(4px)',
          }}
        >
          <RotateCcw size={11} />
          Reset View
        </button>
      </div>
    </>
  );
}
