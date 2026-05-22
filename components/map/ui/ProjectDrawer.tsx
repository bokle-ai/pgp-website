'use client';

import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { MAP_PROJECTS } from '@/lib/data/map-projects';
import { useMapStore } from '../hooks/useMapStore';
import { BRAND } from '@/lib/brand-tokens';

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

export function ProjectDrawer() {
  const { drawerOpen, toggleDrawer, activeFilter, selectProject, selectedProject } = useMapStore();

  const projects =
    activeFilter === 'all'
      ? MAP_PROJECTS
      : MAP_PROJECTS.filter((p) => p.corridor === activeFilter);

  return (
    <>
      {/* Collapsed toggle strip */}
      <button
        onClick={toggleDrawer}
        className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center justify-center z-30"
        style={{
          width: 44,
          height: 140,
          backgroundColor: BRAND.bgCream,
          border: `1px solid ${BRAND.line}`,
          borderRight: 'none',
          cursor: 'pointer',
          outline: 'none',
        }}
        aria-label="Toggle project list"
      >
        <span
          style={{
            fontFamily: BRAND.fontBody,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: BRAND.inkMute,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          {projects.length} Projects →
        </span>
      </button>

      {/* Expanded drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="absolute right-0 top-0 bottom-0 z-40 overflow-y-auto"
            style={{
              width: 360,
              backgroundColor: BRAND.bgCream,
              borderLeft: `1px solid ${BRAND.line}`,
            }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-5"
              style={{ borderBottom: `1px solid ${BRAND.line}` }}
            >
              <span
                style={{
                  fontFamily: BRAND.fontBody,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: BRAND.inkMute,
                }}
              >
                {projects.length} Projects
              </span>
              <button
                onClick={toggleDrawer}
                style={{ color: BRAND.inkMute, cursor: 'pointer', background: 'none', border: 'none' }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Project cards */}
            <div className="p-4 space-y-3">
              {projects.map((project) => {
                const isSelected = selectedProject?.slug === project.slug;
                return (
                  <button
                    key={project.slug}
                    onClick={() => selectProject(isSelected ? null : project)}
                    className="w-full text-left transition-all"
                    style={{
                      padding: '14px',
                      backgroundColor: isSelected ? `${BRAND.accentGold}12` : 'white',
                      border: `1px solid ${isSelected ? BRAND.accentGold : BRAND.line}`,
                      cursor: 'pointer',
                      outline: 'none',
                    }}
                  >
                    <div
                      style={{
                        fontSize: 9,
                        fontWeight: 700,
                        letterSpacing: '0.18em',
                        textTransform: 'uppercase',
                        color: BRAND.accentGold,
                        marginBottom: 4,
                        fontFamily: BRAND.fontBody,
                      }}
                    >
                      {project.corridorDisplay} · {project.approval}
                    </div>
                    <div
                      style={{
                        fontFamily: BRAND.fontDisplay,
                        fontWeight: 600,
                        fontSize: 16,
                        color: BRAND.ink,
                        marginBottom: 8,
                      }}
                    >
                      {project.name}
                    </div>
                    <div className="flex items-center justify-between">
                      <span
                        style={{
                          fontFamily: BRAND.fontBody,
                          fontSize: 12,
                          color: BRAND.ink,
                          fontWeight: 500,
                        }}
                      >
                        ₹{project.priceInLakhs} Lakhs · {project.sizes}
                      </span>
                      <span
                        style={{
                          fontFamily: BRAND.fontBody,
                          fontSize: 9,
                          fontWeight: 700,
                          letterSpacing: '0.12em',
                          textTransform: 'uppercase',
                          color: STATUS_COLOR[project.status],
                          padding: '2px 7px',
                          backgroundColor: `${STATUS_COLOR[project.status]}18`,
                        }}
                      >
                        {STATUS_LABEL[project.status]}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Footer CTA */}
            <div className="p-5" style={{ borderTop: `1px solid ${BRAND.line}` }}>
              <Link
                href="/projects"
                className="block text-center py-3 transition-opacity hover:opacity-80"
                style={{
                  fontFamily: BRAND.fontBody,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: BRAND.bgCream,
                  backgroundColor: BRAND.accentGold,
                  textDecoration: 'none',
                }}
              >
                View All Projects →
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
