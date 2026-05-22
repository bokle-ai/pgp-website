'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { projectLatLng } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';
import { CLUSTER_CENTER, CHENNAI_REFERENCE } from '@/lib/data/map-projects';

const TOP_Y = 0.46;

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
}

// Smooth bezier arc lifted slightly above the ground.
function buildArc(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  segments = 64,
  lift = 0.45
): THREE.Vector3[] {
  const a = new THREE.Vector3(ax, TOP_Y, az);
  const b = new THREE.Vector3(bx, TOP_Y, bz);
  const mid = new THREE.Vector3((ax + bx) / 2, TOP_Y + lift, (az + bz) / 2);
  const pts: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const oneMt = 1 - t;
    const x = oneMt * oneMt * a.x + 2 * oneMt * t * mid.x + t * t * b.x;
    const y = oneMt * oneMt * a.y + 2 * oneMt * t * mid.y + t * t * b.y;
    const z = oneMt * oneMt * a.z + 2 * oneMt * t * mid.z + t * t * b.z;
    pts.push(new THREE.Vector3(x, y, z));
  }
  return pts;
}

export function DistanceArcs({ tnGeoJSON }: Props) {
  const arc = useMemo(() => {
    const [cnX, cnZ] = projectLatLng(
      CHENNAI_REFERENCE.lat,
      CHENNAI_REFERENCE.lng,
      tnGeoJSON
    );
    const [cx, cz] = projectLatLng(
      CLUSTER_CENTER.lat,
      CLUSTER_CENTER.lng,
      tnGeoJSON
    );
    const points = buildArc(cnX, cnZ, cx, cz);
    const geom = new THREE.BufferGeometry().setFromPoints(points);
    // Label sits ~55% along the arc (slightly closer to the cluster end)
    const lp = points[Math.round(0.55 * (points.length - 1))];
    return {
      geometry: geom,
      labelPos: [lp.x, lp.y + 0.08, lp.z] as [number, number, number],
    };
  }, [tnGeoJSON]);

  return (
    <group>
      <line>
        <primitive object={arc.geometry} attach="geometry" />
        <lineBasicMaterial
          color={BRAND.accentGold}
          transparent
          opacity={0.85}
          linewidth={2}
        />
      </line>

      <Html
        position={arc.labelPos}
        center
        distanceFactor={11}
        zIndexRange={[2, 4]}
      >
        <div
          style={{
            fontFamily: BRAND.fontBody,
            fontSize: 10,
            fontWeight: 700,
            color: BRAND.bgDeep,
            backgroundColor: BRAND.accentGold,
            padding: '4px 10px',
            borderRadius: 2,
            letterSpacing: '0.16em',
            whiteSpace: 'nowrap',
            userSelect: 'none',
            pointerEvents: 'none',
            boxShadow: `0 3px 10px rgba(15,61,46,0.4)`,
            textTransform: 'uppercase',
          }}
        >
          ~100 km · 2 hrs from Chennai
        </div>
      </Html>
    </group>
  );
}
