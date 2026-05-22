'use client';

import { useMemo } from 'react';
import { Beacon } from './Beacon';
import { MAP_PROJECTS, CHENNAI_REFERENCE } from '@/lib/data/map-projects';
import { projectLatLng } from '@/lib/map-projection';
import { useMapStore } from '../hooks/useMapStore';
import { BRAND } from '@/lib/brand-tokens';

const EXTRUDE_TOP = 0.4;

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
}

export function BeaconCluster({ tnGeoJSON }: Props) {
  const { activeFilter } = useMapStore();

  const beacons = useMemo(() => {
    return MAP_PROJECTS.map((p) => {
      const [px, pz] = projectLatLng(p.coordinates.lat, p.coordinates.lng, tnGeoJSON);
      return { project: p, pos: [px, EXTRUDE_TOP + 0.02, pz] as [number, number, number] };
    });
  }, [tnGeoJSON]);

  const chennaPos = useMemo(
    () => projectLatLng(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng, tnGeoJSON),
    [tnGeoJSON]
  );

  return (
    <group>
      {/* Chennai reference dot + ring */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[chennaPos[0], EXTRUDE_TOP + 0.01, chennaPos[1]]}>
        <circleGeometry args={[0.13, 32]} />
        <meshStandardMaterial color={BRAND.accentGold} transparent opacity={0.28} metalness={0.5} roughness={0.4} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[chennaPos[0], EXTRUDE_TOP + 0.015, chennaPos[1]]}>
        <ringGeometry args={[0.13, 0.18, 32]} />
        <meshStandardMaterial color={BRAND.accentGold} transparent opacity={0.5} metalness={0.5} roughness={0.3} />
      </mesh>

      {/* Project beacons */}
      {beacons.map(({ project, pos }) => (
        <Beacon
          key={project.slug}
          project={project}
          position={pos}
          isVisible={activeFilter === 'all' || activeFilter === project.corridor}
        />
      ))}
    </group>
  );
}
