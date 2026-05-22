'use client';

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MAP_PROJECTS, CHENNAI_REFERENCE } from '@/lib/data/map-projects';
import type { MapProject } from '@/lib/data/map-projects';
import { BRAND } from '@/lib/brand-tokens';
import Link from 'next/link';

// Simple Mercator-like projection for SVG (not using d3-geo to keep bundle light on mobile)
const SVG_W = 400;
const SVG_H = 520;

// Tamil Nadu bounding box (approx)
const LAT_MIN = 8.05;
const LAT_MAX = 13.58;
const LNG_MIN = 76.23;
const LNG_MAX = 80.35;

function projectToSVG(lat: number, lng: number): { x: number; y: number } {
  const padding = 30;
  const x = padding + ((lng - LNG_MIN) / (LNG_MAX - LNG_MIN)) * (SVG_W - padding * 2);
  const y = padding + ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * (SVG_H - padding * 2);
  return { x, y };
}

// Simplified TN SVG path (hand-crafted approximation of the state outline)
const TN_PATH = `
  M 185,28 L 210,35 L 240,42 L 265,38 L 290,55 L 310,70 L 340,88
  L 355,105 L 360,125 L 358,148 L 352,165 L 345,185 L 340,205
  L 342,228 L 338,250 L 330,272 L 320,292 L 308,315 L 295,338
  L 282,360 L 268,382 L 255,405 L 240,425 L 228,445 L 218,462
  L 205,478 L 195,492 L 190,500 L 185,495 L 178,480 L 172,462
  L 165,445 L 155,428 L 143,410 L 133,392 L 125,372 L 118,352
  L 112,333 L 105,314 L 98,295 L 92,275 L 88,255 L 85,235
  L 82,215 L 80,195 L 78,175 L 80,155 L 85,135 L 92,118
  L 100,102 L 112,88 L 128,76 L 146,64 L 162,50 L 175,38 Z
`;

const STATUS_LABEL: Record<string, string> = {
  available: 'Available',
  few_left: 'Few Left',
  sold_out: 'Sold Out',
};
const STATUS_COLOR: Record<string, string> = {
  available: BRAND.available,
  few_left: BRAND.fewLeft,
  sold_out: BRAND.soldOut,
};

export function ProjectMap2D() {
  const [selected, setSelected] = useState<MapProject | null>(null);

  const chennaPos = projectToSVG(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng);

  const projectPositions = useMemo(() =>
    MAP_PROJECTS.map((p) => ({ project: p, pos: projectToSVG(p.coordinates.lat, p.coordinates.lng) })),
    []
  );

  return (
    <div
      className="relative w-full"
      style={{ backgroundColor: BRAND.bgCream, fontFamily: BRAND.fontBody }}
    >
      {/* Section header */}
      <div className="px-6 pt-12 pb-6">
        <div
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: BRAND.accentGold,
            marginBottom: 8,
          }}
        >
          Where We Build
        </div>
        <h2
          style={{
            fontFamily: BRAND.fontDisplay,
            fontWeight: 600,
            fontSize: '1.75rem',
            color: BRAND.ink,
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
          }}
        >
          Three corridors.{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: BRAND.accentGold }}>
            Six projects.
          </em>
        </h2>
      </div>

      {/* SVG Map */}
      <div className="px-4">
        <svg
          viewBox={`0 0 ${SVG_W} ${SVG_H}`}
          className="w-full"
          style={{ maxHeight: 480 }}
        >
          {/* TN landmass */}
          <path d={TN_PATH} fill={BRAND.bgDeep} stroke={BRAND.accentGold} strokeWidth="1.2" opacity="0.95" />
          {/* Coastline accent */}
          <path d={TN_PATH} fill="none" stroke={BRAND.accentGold} strokeWidth="0.5" opacity="0.4" />

          {/* Chennai reference */}
          <circle cx={chennaPos.x} cy={chennaPos.y} r={6} fill={BRAND.accentGold} opacity="0.25" />
          <circle cx={chennaPos.x} cy={chennaPos.y} r={3} fill={BRAND.accentGold} opacity="0.5" />
          <text
            x={chennaPos.x + 9}
            y={chennaPos.y + 4}
            fill={BRAND.accentGoldSoft}
            fontSize="9"
            fontFamily={BRAND.fontBody}
            opacity="0.7"
          >
            Chennai
          </text>

          {/* Project markers */}
          {projectPositions.map(({ project, pos }) => (
            <g
              key={project.slug}
              onClick={() => setSelected(project.slug === selected?.slug ? null : project)}
              style={{ cursor: 'pointer' }}
            >
              <circle cx={pos.x} cy={pos.y} r={10} fill={BRAND.accentGold} opacity="0.15" />
              <circle cx={pos.x} cy={pos.y} r={5.5} fill={BRAND.accentGold} opacity="0.85" />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={5.5}
                fill="none"
                stroke={selected?.slug === project.slug ? '#fff' : BRAND.bgDeep}
                strokeWidth={selected?.slug === project.slug ? '1.5' : '1'}
                opacity="0.8"
              />
            </g>
          ))}
        </svg>
      </div>

      {/* Selected project panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-6"
            style={{
              backgroundColor: 'white',
              border: `1px solid ${BRAND.accentGold}55`,
              boxShadow: '0 4px 20px rgba(15,61,46,0.12)',
              padding: '16px',
            }}
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BRAND.accentGold,
                    marginBottom: 4,
                  }}
                >
                  {selected.corridorDisplay} · {selected.approval}
                </div>
                <h3
                  style={{
                    fontFamily: BRAND.fontDisplay,
                    fontWeight: 600,
                    fontSize: 18,
                    color: BRAND.ink,
                    lineHeight: 1.15,
                  }}
                >
                  {selected.name}
                </h3>
              </div>
              <button
                onClick={() => setSelected(null)}
                style={{ color: BRAND.inkFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ fontSize: 13, color: BRAND.inkMute, lineHeight: 1.7, marginBottom: 12 }}>
              <div>
                Plot size: <span style={{ color: BRAND.ink, fontWeight: 500 }}>{selected.sizes}</span>
              </div>
              <div>
                Price: <span style={{ color: BRAND.ink, fontWeight: 500 }}>₹{selected.priceInLakhs} Lakhs</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: STATUS_COLOR[selected.status],
                  padding: '3px 8px',
                  backgroundColor: `${STATUS_COLOR[selected.status]}18`,
                }}
              >
                {STATUS_LABEL[selected.status]}
              </span>
              <Link
                href={`/projects/${selected.slug}`}
                style={{
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  color: BRAND.accentGold,
                  textDecoration: 'none',
                }}
              >
                View Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project list chips below map */}
      <div className="px-4 pb-10">
        <div
          style={{
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BRAND.inkFaint,
            marginBottom: 10,
          }}
        >
          Tap a dot or a project
        </div>
        <div className="flex flex-wrap gap-2">
          {MAP_PROJECTS.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelected(p.slug === selected?.slug ? null : p)}
              style={{
                fontFamily: BRAND.fontBody,
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '6px 12px',
                backgroundColor: selected?.slug === p.slug ? BRAND.accentGold : 'white',
                color: selected?.slug === p.slug ? '#fff' : BRAND.inkMute,
                border: `1px solid ${selected?.slug === p.slug ? BRAND.accentGold : BRAND.line}`,
                cursor: 'pointer',
                outline: 'none',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
