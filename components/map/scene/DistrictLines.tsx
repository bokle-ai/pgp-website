'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { getProjection, getMeshCenterOffset } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  districtGeoJSON: GeoJSON.FeatureCollection;
  extrudeDepth?: number;
}

export function DistrictLines({ tnGeoJSON, districtGeoJSON, extrudeDepth = 0.4 }: Props) {
  const geometries = useMemo(() => {
    const projection = getProjection(tnGeoJSON as Parameters<typeof getProjection>[0]);
    const center = getMeshCenterOffset(tnGeoJSON);
    const topY = extrudeDepth + 0.005; // just above the top face

    const lines: THREE.BufferGeometry[] = [];

    districtGeoJSON.features.forEach((feature) => {
      const geom = feature.geometry;
      const rings: [number, number][][] = [];

      if (geom.type === 'Polygon') {
        rings.push(...(geom.coordinates as [number, number][][]));
      } else if (geom.type === 'MultiPolygon') {
        (geom.coordinates as [number, number][][][]).forEach((poly) => {
          rings.push(...poly);
        });
      }

      rings.forEach((ring) => {
        if (ring.length < 2) return;
        const points: THREE.Vector3[] = [];
        ring.forEach((coord) => {
          const result = projection(coord);
          if (!result) return;
          const [x, y] = result;
          points.push(
            new THREE.Vector3((x - 5) - center[0], topY, (-(y - 5)) - center[1])
          );
        });
        if (points.length < 2) return;
        lines.push(new THREE.BufferGeometry().setFromPoints(points));
      });
    });

    return lines;
  }, [tnGeoJSON, districtGeoJSON, extrudeDepth]);

  return (
    <group>
      {geometries.map((geom, i) => (
        <lineSegments key={i} geometry={geom}>
          <lineBasicMaterial color={BRAND.bgDeep2} transparent opacity={0.6} />
        </lineSegments>
      ))}
    </group>
  );
}
