'use client';

import { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import { BRAND } from '@/lib/brand-tokens';
import type { MapProject } from '@/lib/data/map-projects';
import { useMapStore } from '../hooks/useMapStore';
import gsap from 'gsap';

const STATUS_COLORS: Record<MapProject['status'], string> = {
  available: BRAND.accentGold,
  few_left: '#D6A23E',
  sold_out: '#7A6440',
};

const STATUS_LABELS: Record<MapProject['status'], string> = {
  available: 'Available',
  few_left: 'Few Left',
  sold_out: 'Sold Out',
};

const STATUS_STYLES: Record<MapProject['status'], { bg: string; color: string }> = {
  available: { bg: '#2E7D5B22', color: BRAND.available },
  few_left: { bg: '#B8860B22', color: BRAND.fewLeft },
  sold_out: { bg: '#8B3A3A22', color: BRAND.soldOut },
};

interface BeaconProps {
  project: MapProject;
  position: [number, number, number];
  isVisible?: boolean;
}

export function Beacon({ project, position, isVisible = true }: BeaconProps) {
  const groupRef = useRef<THREE.Group>(null);
  const apexRef = useRef<THREE.Mesh>(null);
  const { selectedProject, hoveredProject, selectProject, hoverProject, setInteracting } =
    useMapStore();

  const isSelected = selectedProject?.slug === project.slug;
  const isHovered = hoveredProject?.slug === project.slug;
  const isActive = isSelected || isHovered;

  const shaftColor = STATUS_COLORS[project.status];
  const pulses = project.status !== 'sold_out';

  useFrame((state) => {
    if (!apexRef.current) return;
    const mat = apexRef.current.material as THREE.MeshStandardMaterial;
    if (pulses) {
      const t = state.clock.elapsedTime;
      const speed = project.status === 'few_left' ? 3.2 : 2.6;
      const base = isActive ? 1.8 : 0.9;
      const amp = isActive ? 0.5 : 0.35;
      mat.emissiveIntensity = base + Math.sin(t * speed) * amp;
    } else {
      mat.emissiveIntensity = 0.28;
    }

    // Lerp group Y for hover lift
    if (groupRef.current) {
      const targetY = isActive ? position[1] + 0.1 : position[1];
      groupRef.current.position.y += (targetY - groupRef.current.position.y) * 0.12;
    }
  });

  const handlePointerOver = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    document.body.style.cursor = 'pointer';
    hoverProject(project);
    setInteracting(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = 'auto';
    hoverProject(null);
    if (!isSelected) setInteracting(false);
  };

  const handleClick = (e: { stopPropagation: () => void }) => {
    e.stopPropagation();
    selectProject(isSelected ? null : project);
  };

  const opacity = isVisible ? 1 : 0.2;

  return (
    <group
      ref={groupRef}
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Base ring on surface */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.38, 0]}>
        <ringGeometry args={[0.1, 0.16, 32]} />
        <meshStandardMaterial
          color={shaftColor}
          transparent
          opacity={opacity * 0.5}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Shaft */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.035, 0.05, 0.7, 16]} />
        <meshStandardMaterial
          color={shaftColor}
          metalness={0.88}
          roughness={0.22}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Apex sphere */}
      <mesh ref={apexRef} position={[0, 0.38, 0]}>
        <sphereGeometry args={[0.07, 16, 16]} />
        <meshStandardMaterial
          color={BRAND.accentGoldGlow}
          emissive={BRAND.accentGoldGlow}
          emissiveIntensity={0.9}
          metalness={0.1}
          roughness={0.35}
          transparent
          opacity={opacity}
        />
      </mesh>

      {/* Tooltip */}
      <AnimatePresence>
        {isActive && (
          <Html position={[0, 1.1, 0]} center distanceFactor={9} occlude zIndexRange={[10, 100]}>
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
              className={isSelected ? 'pointer-events-auto' : 'pointer-events-none'}
              style={{ width: 264 }}
            >
              <div
                style={{
                  backgroundColor: BRAND.bgCream,
                  border: `1px solid ${BRAND.accentGold}66`,
                  boxShadow: '0 8px 32px rgba(15,61,46,0.18)',
                  padding: '16px',
                  fontFamily: BRAND.fontBody,
                }}
              >
                {/* Eyebrow */}
                <div
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: BRAND.accentGold,
                    marginBottom: 6,
                  }}
                >
                  {project.corridorDisplay} · {project.approval}
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontFamily: BRAND.fontDisplay,
                    fontWeight: 600,
                    fontSize: 18,
                    color: BRAND.ink,
                    lineHeight: 1.15,
                    marginBottom: 10,
                  }}
                >
                  {project.name}
                </h3>

                {/* Details */}
                <div style={{ fontSize: 12, color: BRAND.inkMute, lineHeight: 1.7 }}>
                  <div>
                    Plot size:{' '}
                    <span style={{ color: BRAND.ink, fontWeight: 500 }}>{project.sizes}</span>
                  </div>
                  <div>
                    Price:{' '}
                    <span style={{ color: BRAND.ink, fontWeight: 500 }}>
                      ₹{project.priceInLakhs} Lakhs
                    </span>
                  </div>
                </div>

                {/* Footer */}
                <div
                  style={{
                    marginTop: 12,
                    paddingTop: 10,
                    borderTop: `1px solid ${BRAND.line}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontSize: 10,
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: STATUS_STYLES[project.status].color,
                      backgroundColor: STATUS_STYLES[project.status].bg,
                      padding: '3px 8px',
                    }}
                  >
                    {STATUS_LABELS[project.status]}
                  </span>
                  <a
                    href={`/projects/${project.slug}`}
                    style={{
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: BRAND.accentGold,
                      textDecoration: 'none',
                    }}
                  >
                    View Project →
                  </a>
                </div>
              </div>
            </motion.div>
          </Html>
        )}
      </AnimatePresence>
    </group>
  );
}
