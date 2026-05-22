'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { getProjection, getMeshCenterOffset } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  districtGeoJSON?: GeoJSON.FeatureCollection;
  lite?: boolean;
}

// Districts where the 6 project corridors live — these get the "home zone" tint
const HOME_ZONE_DISTRICTS = new Set([
  'Chennai',
  'Thiruvallur',
  'Kancheepuram',
  'Tiruvannamalai',
  'Vellore',
]);

interface RenderedShape {
  geometry: THREE.ExtrudeGeometry;
  outline: THREE.BufferGeometry;
  isHomeZone: boolean;
  name: string;
}

export function TamilNaduMesh({ tnGeoJSON, districtGeoJSON, lite = false }: Props) {
  const shapes = useMemo<RenderedShape[]>(() => {
    const projection = getProjection(tnGeoJSON as Parameters<typeof getProjection>[0]);
    const center = getMeshCenterOffset(tnGeoJSON);
    const extrudeDepth = lite ? 0.25 : 0.4;
    const topY = extrudeDepth + 0.01;

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: extrudeDepth,
      bevelEnabled: true,
      bevelThickness: 0.05,
      bevelSize: 0.04,
      bevelSegments: 2,
      bevelOffset: 0,
    };

    const project = (coord: [number, number]): [number, number] | null => {
      const r = projection(coord);
      if (!r) return null;
      return [(r[0] - 5) - center[0], (-(r[1] - 5)) - center[1]];
    };

    // Prefer districts (accurate, complete coverage). Fall back to state outline.
    const source = districtGeoJSON || tnGeoJSON;
    const out: RenderedShape[] = [];

    source.features.forEach((feature) => {
      const props = (feature.properties || {}) as Record<string, unknown>;
      const name = String(props.district || props.name || props.NAME_2 || '');
      const isHomeZone = HOME_ZONE_DISTRICTS.has(name);

      const polygons: { outer: [number, number][]; holes: [number, number][][] }[] = [];
      const g = feature.geometry;
      if (g.type === 'Polygon') {
        const rings = g.coordinates as [number, number][][];
        polygons.push({ outer: rings[0], holes: rings.slice(1) });
      } else if (g.type === 'MultiPolygon') {
        (g.coordinates as [number, number][][][]).forEach((poly) => {
          polygons.push({ outer: poly[0], holes: poly.slice(1) });
        });
      }

      polygons.forEach(({ outer, holes }) => {
        if (outer.length < 3) return;
        const shape = new THREE.Shape();
        outer.forEach((coord, i) => {
          const p = project(coord);
          if (!p) return;
          if (i === 0) shape.moveTo(p[0], p[1]);
          else shape.lineTo(p[0], p[1]);
        });
        holes.forEach((hole) => {
          if (hole.length < 3) return;
          const path = new THREE.Path();
          hole.forEach((coord, i) => {
            const p = project(coord);
            if (!p) return;
            if (i === 0) path.moveTo(p[0], p[1]);
            else path.lineTo(p[0], p[1]);
          });
          shape.holes.push(path);
        });

        const eg = new THREE.ExtrudeGeometry(shape, extrudeSettings);
        eg.computeVertexNormals();

        const outlinePoints = outer
          .map(project)
          .filter((p): p is [number, number] => !!p)
          .map((p) => new THREE.Vector3(p[0], topY, p[1]));
        const outlineGeom = new THREE.BufferGeometry().setFromPoints(outlinePoints);

        out.push({ geometry: eg, outline: outlineGeom, isHomeZone, name });
      });
    });

    return out;
  }, [tnGeoJSON, districtGeoJSON, lite]);

  return (
    <group>
      {/* Render non-home districts first, then home-zone on top so the rim highlight shows */}
      {shapes
        .filter((s) => !s.isHomeZone)
        .map((s, i) => (
          <mesh
            key={`d-${s.name}-${i}`}
            geometry={s.geometry}
            rotation={[-Math.PI / 2, 0, 0]}
            position={[0, 0, 0]}
            castShadow={!lite}
            receiveShadow={!lite}
          >
            <meshStandardMaterial
              color={BRAND.bgDeep}
              roughness={0.58}
              metalness={0.04}
              envMapIntensity={0.35}
            />
          </mesh>
        ))}

      {shapes
        .filter((s) => s.isHomeZone)
        .map((s, i) => (
          <group key={`hz-${s.name}-${i}`}>
            {/* Brighter base — the "where we work" zone */}
            <mesh
              geometry={s.geometry}
              rotation={[-Math.PI / 2, 0, 0]}
              position={[0, 0.001, 0]}
              castShadow={!lite}
              receiveShadow={!lite}
            >
              <meshStandardMaterial
                color={BRAND.bgDeep2}
                emissive={BRAND.accentGold}
                emissiveIntensity={0.06}
                roughness={0.48}
                metalness={0.08}
                envMapIntensity={0.5}
              />
            </mesh>
            {/* Gold rim outline on home districts */}
            <lineSegments geometry={s.outline} position={[0, 0.002, 0]}>
              <lineBasicMaterial color={BRAND.accentGold} transparent opacity={0.75} />
            </lineSegments>
          </group>
        ))}
    </group>
  );
}
