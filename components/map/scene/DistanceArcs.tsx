'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { Html } from '@react-three/drei';
import { projectLatLng } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';
import { CORRIDORS, CHENNAI_REFERENCE } from '@/lib/data/map-projects';
import { useMapStore } from '../hooks/useMapStore';

const TOP_Y = 0.46;

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
}

// Build a smooth arc between two ground points using a quadratic bezier
// with the control point raised slightly to create a gentle curve over the surface.
function buildArc(
  ax: number,
  az: number,
  bx: number,
  bz: number,
  segments = 48,
  lift = 0.28
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

// Where along the arc (0 = Chennai end, 1 = corridor end) each label sits.
// Fans them out so the pills don't stack on top of each other.
const LABEL_T_BY_CORRIDOR: Record<string, number> = {
  papanthangal: 0.35, // closest to Chennai — push label toward corridor end
  perumpallam:  0.55, // middle
  cheyyar:      0.75, // farthest — push label closer to the corridor
};

export function DistanceArcs({ tnGeoJSON }: Props) {
  const { activeFilter } = useMapStore();

  const arcs = useMemo(() => {
    const [cnX, cnZ] = projectLatLng(
      CHENNAI_REFERENCE.lat,
      CHENNAI_REFERENCE.lng,
      tnGeoJSON
    );
    return CORRIDORS.map((corridor) => {
      const [cx, cz] = projectLatLng(corridor.center.lat, corridor.center.lng, tnGeoJSON);
      const points = buildArc(cnX, cnZ, cx, cz);
      const geom = new THREE.BufferGeometry().setFromPoints(points);
      const t = LABEL_T_BY_CORRIDOR[corridor.id] ?? 0.5;
      const idx = Math.round(t * (points.length - 1));
      const lp = points[idx];
      return {
        id: corridor.id,
        name: corridor.name,
        distance: corridor.distance,
        geometry: geom,
        labelPos: [lp.x, lp.y + 0.08, lp.z] as [number, number, number],
      };
    });
  }, [tnGeoJSON]);

  return (
    <group>
      {arcs.map((arc) => {
        const isActive = activeFilter === 'all' || activeFilter === arc.id;
        const opacity = isActive ? 0.85 : 0.18;

        return (
          <group key={arc.id}>
            <line>
              <primitive object={arc.geometry} attach="geometry" />
              <lineBasicMaterial
                color={BRAND.accentGold}
                transparent
                opacity={opacity}
                linewidth={2}
              />
            </line>

            {isActive && (
              <Html
                position={arc.labelPos}
                center
                distanceFactor={11}
                zIndexRange={[2, 4]}
              >
                <div
                  style={{
                    fontFamily: BRAND.fontBody,
                    fontSize: 9,
                    fontWeight: 700,
                    color: BRAND.bgDeep,
                    backgroundColor: BRAND.accentGold,
                    padding: '3px 8px',
                    borderRadius: 2,
                    letterSpacing: '0.12em',
                    whiteSpace: 'nowrap',
                    userSelect: 'none',
                    pointerEvents: 'none',
                    boxShadow: `0 3px 8px rgba(15,61,46,0.4)`,
                  }}
                >
                  {arc.distance.replace(' from Chennai', '')}
                </div>
              </Html>
            )}
          </group>
        );
      })}
    </group>
  );
}
