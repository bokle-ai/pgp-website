'use client';

import { useMemo } from 'react';
import * as THREE from 'three';
import { getProjection } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  lite?: boolean;
}

export function TamilNaduMesh({ tnGeoJSON, lite = false }: Props) {
  const { geometry, lineGeometry } = useMemo(() => {
    const projection = getProjection(tnGeoJSON as Parameters<typeof getProjection>[0]);

    const feature = tnGeoJSON.features[0];
    const geometry = feature.geometry;
    if (geometry.type !== 'Polygon' && geometry.type !== 'MultiPolygon') {
      return { geometry: new THREE.BufferGeometry(), lineGeometry: new THREE.BufferGeometry() };
    }
    const coords =
      geometry.type === 'Polygon'
        ? (geometry.coordinates[0] as [number, number][])
        : (geometry.coordinates[0][0] as [number, number][]);

    // Build extruded shape
    const shape = new THREE.Shape();
    coords.forEach((coord, i) => {
      const result = projection(coord);
      if (!result) return;
      const [x, y] = result;
      if (i === 0) shape.moveTo(x - 5, -(y - 5));
      else shape.lineTo(x - 5, -(y - 5));
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

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.computeVertexNormals();
    geom.center();

    // Coastline line — floats above top face
    const topY = extrudeDepth + 0.01;
    const points = coords.map((coord) => {
      const result = projection(coord);
      if (!result) return new THREE.Vector3(0, topY, 0);
      const [x, y] = result;
      return new THREE.Vector3(x - 5, topY, -(y - 5));
    });
    // Centre line geometry to match mesh
    const centre = new THREE.Vector3();
    points.forEach((p) => centre.add(p));
    centre.divideScalar(points.length);
    const centredPoints = points.map((p) =>
      new THREE.Vector3(p.x - centre.x, p.y, p.z - centre.z)
    );
    const lineGeom = new THREE.BufferGeometry().setFromPoints(centredPoints);

    return { geometry: geom, lineGeometry: lineGeom };
  }, [tnGeoJSON, lite]);

  return (
    <group>
      {/* Landmass */}
      <mesh
        geometry={geometry}
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

      {/* Coastline gold accent */}
      <lineSegments geometry={lineGeometry} rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <lineBasicMaterial color={BRAND.accentGold} transparent opacity={0.45} />
      </lineSegments>
    </group>
  );
}
