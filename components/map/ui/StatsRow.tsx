'use client';

import { useEffect, useRef } from 'react';
import { MAP_PROJECTS } from '@/lib/data/map-projects';
import { useMapStore } from '../hooks/useMapStore';
import { BRAND } from '@/lib/brand-tokens';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';

function AnimatedNumber({ value }: { value: number }) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));

  useEffect(() => {
    const controls = animate(mv, value, { duration: 0.6, ease: 'easeOut' });
    return controls.stop;
  }, [value, mv]);

  return <motion.span>{rounded}</motion.span>;
}

interface StatProps {
  label: string;
  value: number | string;
  animated?: boolean;
}

function Stat({ label, value, animated = false }: StatProps) {
  return (
    <div>
      <div
        style={{
          fontFamily: BRAND.fontDisplay,
          fontWeight: 600,
          fontSize: 28,
          color: BRAND.ink,
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {animated && typeof value === 'number' ? (
          <AnimatedNumber value={value} />
        ) : (
          value
        )}
      </div>
      <div
        style={{
          fontFamily: BRAND.fontBody,
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: BRAND.inkMute,
          marginTop: 5,
        }}
      >
        {label}
      </div>
    </div>
  );
}

export function StatsRow() {
  const { activeFilter } = useMapStore();

  const visible = activeFilter === 'all'
    ? MAP_PROJECTS
    : MAP_PROJECTS.filter((p) => p.corridor === activeFilter);

  const totalPlots = visible.length;

  return (
    <div className="absolute bottom-8 left-8 flex items-end gap-8 z-20">
      <Stat label="Active Projects" value={totalPlots} animated />
      <Stat label="Corridors" value={activeFilter === 'all' ? 3 : 1} animated />
      <Stat label="Plots from" value="₹4 L" />
    </div>
  );
}
