'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { getProjection, getMeshCenterOffset } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  lite?: boolean;
}

export function TamilNaduMesh({ tnGeoJSON, lite = false }: Props) {
  const { geometry, lineGeometry } = useMemo(() => {
    const projection = getProjection(tnGeoJSON as Parameters<typeof getProjection>[0]);
    const center = getMeshCenterOffset(tnGeoJSON);

    const feature = tnGeoJSON.features[0];
    const geom = feature.geometry;
    if (geom.type !== 'Polygon' && geom.type !== 'MultiPolygon') {
      return { geometry: new THREE.BufferGeometry(), lineGeometry: new THREE.BufferGeometry() };
    }
    const coords =
      geom.type === 'Polygon'
        ? (geom.coordinates[0] as [number, number][])
        : (geom.coordinates[0][0] as [number, number][]);

    // Build shape using bounding-box-centred coordinates
    const shape = new THREE.Shape();
    coords.forEach((coord, i) => {
      const result = projection(coord);
      if (!result) return;
      const [x, y] = result;
      const sx = (x - 5) - center[0];
      const sz = (-(y - 5)) - center[1];
      if (i === 0) shape.moveTo(sx, sz);
      else shape.lineTo(sx, sz);
    });

    const extrudeDepth = lite ? 0.25 : 0.4;
    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: extrudeDepth,
      bevelEnabled: true,
      bevelThickness: 0.06,
      bevelSize: 0.05,
      bevelSegments: 3,
      bevelOffset: 0,
    };

    // No .center() — our coordinates are already bounding-box centred
    const extrudedGeom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    extrudedGeom.computeVertexNormals();

    // Coastline line — floats above top face
    const topY = extrudeDepth + 0.01;
    const linePoints = coords.map((coord) => {
      const result = projection(coord);
      if (!result) return new THREE.Vector3(0, topY, 0);
      const [x, y] = result;
      return new THREE.Vector3((x - 5) - center[0], topY, (-(y - 5)) - center[1]);
    });
    const lineGeom = new THREE.BufferGeometry().setFromPoints(linePoints);

    return { geometry: extrudedGeom, lineGeometry: lineGeom };
  }, [tnGeoJSON, lite]);

  return (
    <group>
      {/* Landmass — rotated to lie flat */}
      <mesh
        geometry={geometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        castShadow={!lite}
        receiveShadow={!lite}
      >
        <meshStandardMaterial
          color={BRAND.bgDeep}
          roughness={0.56}
          metalness={0.04}
          envMapIntensity={0.35}
        />
      </mesh>

      {/* Gold coastline accent line */}
      <lineSegments geometry={lineGeometry} position={[0, 0, 0]}>
        <lineBasicMaterial color={BRAND.accentGold} transparent opacity={0.5} />
      </lineSegments>
    </group>
  );
}
