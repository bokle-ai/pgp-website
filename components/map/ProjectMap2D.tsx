'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MAP_PROJECTS } from '@/lib/data/map-projects';
import type { MapProject } from '@/lib/data/map-projects';
import { BRAND } from '@/lib/brand-tokens';
import Link from 'next/link';
import { geoMercator, geoPath } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';

const SVG_W = 360;
const SVG_H = 520;

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
  const [tnGeoJSON, setTnGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [districtGeoJSON, setDistrictGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/tamil-nadu.geojson').then((r) => r.json()),
      fetch('/data/tamil-nadu-districts.geojson').then((r) => r.json()),
    ]).then(([tn, dist]) => {
      setTnGeoJSON(tn);
      setDistrictGeoJSON(dist);
    });
  }, []);

  const { projection, statePath, districtPaths, projectDots, chennaiDot } = useMemo(() => {
    if (!tnGeoJSON) return { projection: null, statePath: '', districtPaths: [], projectDots: [], chennaiDot: { x: 0, y: 0 } };

    const proj = geoMercator().fitSize([SVG_W - 20, SVG_H - 20], tnGeoJSON as GeoPermissibleObjects);
    proj.translate([proj.translate()[0] + 10, proj.translate()[1] + 10]);

    const pathGen = geoPath(proj);

    const statePath = pathGen(tnGeoJSON.features[0] as GeoPermissibleObjects) ?? '';

    const districtPaths = districtGeoJSON
      ? districtGeoJSON.features.map((f) => ({
          name: f.properties?.name as string,
          d: pathGen(f as GeoPermissibleObjects) ?? '',
        }))
      : [];

    const projectDots = MAP_PROJECTS.map((p) => {
      const pt = proj([p.coordinates.lng, p.coordinates.lat]);
      return { project: p, x: pt?.[0] ?? 0, y: pt?.[1] ?? 0 };
    });

    const chennai = proj([80.2707, 13.0827]);
    const chennaiDot = { x: chennai?.[0] ?? 0, y: chennai?.[1] ?? 0 };

    return { projection: proj, statePath, districtPaths, projectDots, chennaiDot };
  }, [tnGeoJSON, districtGeoJSON]);

  return (
    <div style={{ backgroundColor: BRAND.bgCream, fontFamily: BRAND.fontBody }}>
      {/* Section header */}
      <div className="px-6 pt-12 pb-4">
        <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: BRAND.accentGold, marginBottom: 8 }}>
          Where We Build
        </div>
        <h2 style={{ fontFamily: BRAND.fontDisplay, fontWeight: 600, fontSize: '1.75rem', color: BRAND.ink, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
          Three corridors.{' '}
          <em style={{ fontStyle: 'italic', fontWeight: 400, color: BRAND.accentGold }}>Six projects.</em>
        </h2>
      </div>

      {/* SVG Map */}
      <div className="px-4">
        {!tnGeoJSON ? (
          <div style={{ height: 420, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 24, height: 24, border: `2px solid ${BRAND.accentGold}`, borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        ) : (
          <svg viewBox={`0 0 ${SVG_W} ${SVG_H}`} className="w-full" style={{ maxHeight: 480 }}>
            {/* State fill */}
            <path d={statePath} fill={BRAND.bgDeep} opacity={0.97} />

            {/* District boundaries */}
            {districtPaths.map(({ name, d }) => (
              <path key={name} d={d} fill="none" stroke={BRAND.bgDeep2} strokeWidth="0.6" opacity="0.7" />
            ))}

            {/* State outline */}
            <path d={statePath} fill="none" stroke={BRAND.accentGold} strokeWidth="1.2" opacity="0.8" />

            {/* Subtle inner coastline glow */}
            <path d={statePath} fill="none" stroke={BRAND.accentGoldSoft} strokeWidth="0.4" opacity="0.35" />

            {/* Chennai reference */}
            <circle cx={chennaiDot.x} cy={chennaiDot.y} r={7} fill={BRAND.accentGold} opacity="0.15" />
            <circle cx={chennaiDot.x} cy={chennaiDot.y} r={3.5} fill={BRAND.accentGold} opacity="0.55" />
            <text x={chennaiDot.x + 6} y={chennaiDot.y + 3} fill={BRAND.accentGoldSoft} fontSize="8" fontFamily={BRAND.fontBody} opacity="0.8">Chennai</text>

            {/* Project markers */}
            {projectDots.map(({ project, x, y }) => (
              <g key={project.slug} onClick={() => setSelected(project.slug === selected?.slug ? null : project)} style={{ cursor: 'pointer' }}>
                <circle cx={x} cy={y} r={11} fill={BRAND.accentGold} opacity="0.12" />
                <circle cx={x} cy={y} r={5} fill={selected?.slug === project.slug ? '#fff' : BRAND.accentGold} opacity="0.9" />
                <circle cx={x} cy={y} r={5} fill="none" stroke={BRAND.bgDeep} strokeWidth="0.8" opacity="0.6" />
              </g>
            ))}

            {/* Corridor labels */}
            {[
              { lat: 13.02, lng: 80.101, label: 'Papanthangal' },
              { lat: 12.61, lng: 79.87,  label: 'Perumpallam' },
              { lat: 12.67, lng: 79.43,  label: 'Cheyyar' },
            ].map(({ lat, lng, label }) => {
              if (!projection) return null;
              const pt = projection([lng, lat]);
              if (!pt) return null;
              return (
                <text key={label} x={pt[0]} y={pt[1] - 12} fill={BRAND.accentGold} fontSize="7" fontFamily={BRAND.fontBody} fontWeight="700" letterSpacing="1" textAnchor="middle" opacity="0.9">
                  {label.toUpperCase()}
                </text>
              );
            })}
          </svg>
        )}
      </div>

      {/* Selected project panel */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="mx-4 mb-4"
            style={{ backgroundColor: 'white', border: `1px solid ${BRAND.accentGold}55`, boxShadow: '0 4px 20px rgba(15,61,46,0.10)', padding: '14px' }}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: BRAND.accentGold, marginBottom: 3 }}>
                  {selected.corridorDisplay} · {selected.approval}
                </div>
                <h3 style={{ fontFamily: BRAND.fontDisplay, fontWeight: 600, fontSize: 17, color: BRAND.ink, lineHeight: 1.15 }}>
                  {selected.name}
                </h3>
              </div>
              <button onClick={() => setSelected(null)} style={{ color: BRAND.inkFaint, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}>
                <X size={15} />
              </button>
            </div>
            <div style={{ fontSize: 12, color: BRAND.inkMute, lineHeight: 1.7, marginBottom: 10 }}>
              <div>Plot size: <span style={{ color: BRAND.ink, fontWeight: 500 }}>{selected.sizes}</span></div>
              <div>Price: <span style={{ color: BRAND.ink, fontWeight: 500 }}>₹{selected.priceInLakhs} Lakhs</span></div>
            </div>
            <div className="flex items-center justify-between">
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: STATUS_COLOR[selected.status], padding: '2px 7px', backgroundColor: `${STATUS_COLOR[selected.status]}18` }}>
                {STATUS_LABEL[selected.status]}
              </span>
              <Link href={`/projects/${selected.slug}`} style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: BRAND.accentGold, textDecoration: 'none' }}>
                View Project →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Project chips */}
      <div className="px-4 pb-10">
        <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.22em', textTransform: 'uppercase', color: BRAND.inkFaint, marginBottom: 10 }}>
          Tap a dot or a project
        </div>
        <div className="flex flex-wrap gap-2">
          {MAP_PROJECTS.map((p) => (
            <button
              key={p.slug}
              onClick={() => setSelected(p.slug === selected?.slug ? null : p)}
              style={{ fontFamily: BRAND.fontBody, fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', padding: '5px 11px', backgroundColor: selected?.slug === p.slug ? BRAND.accentGold : 'white', color: selected?.slug === p.slug ? '#fff' : BRAND.inkMute, border: `1px solid ${selected?.slug === p.slug ? BRAND.accentGold : BRAND.line}`, cursor: 'pointer', outline: 'none' }}
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
