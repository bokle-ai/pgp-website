'use client';

import { useMapStore } from '../hooks/useMapStore';
import { BRAND } from '@/lib/brand-tokens';

const FILTERS = [
  { id: 'all' as const, label: 'All Corridors' },
  { id: 'papanthangal' as const, label: 'Papanthangal' },
  { id: 'perumpallam' as const, label: 'Perumpallam' },
  { id: 'cheyyar' as const, label: 'Cheyyar' },
];

export function CorridorFilter() {
  const { activeFilter, setFilter } = useMapStore();

  return (
    <div
      className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-1 p-1.5 backdrop-blur-sm z-20"
      style={{
        backgroundColor: `${BRAND.bgCream}EE`,
        border: `1px solid ${BRAND.line}`,
      }}
    >
      {FILTERS.map(({ id, label }) => {
        const isActive = activeFilter === id;
        return (
          <button
            key={id}
            onClick={() => setFilter(id)}
            className="px-4 py-2 transition-colors"
            style={{
              fontSize: 10,
              fontFamily: BRAND.fontBody,
              fontWeight: 700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              backgroundColor: isActive ? BRAND.accentGold : 'transparent',
              color: isActive ? '#fff' : BRAND.inkMute,
              cursor: 'pointer',
              border: 'none',
              outline: 'none',
            }}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
}
