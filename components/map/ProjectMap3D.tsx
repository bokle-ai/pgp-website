'use client';

import { useState, useEffect } from 'react';
import { Scene } from './scene/Scene';
import { MapHeader } from './ui/MapHeader';
import { CorridorFilter } from './ui/CorridorFilter';
import { StatsRow } from './ui/StatsRow';
import { ProjectDrawer } from './ui/ProjectDrawer';
import type { ViewportType } from './hooks/useViewportType';

interface Props {
  viewportType: ViewportType;
}

export function ProjectMap3D({ viewportType }: Props) {
  const [tnGeoJSON, setTnGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);
  const [districtGeoJSON, setDistrictGeoJSON] = useState<GeoJSON.FeatureCollection | null>(null);

  useEffect(() => {
    Promise.all([
      fetch('/data/tamil-nadu.geojson').then((r) => r.json()),
      fetch('/data/tamil-nadu-districts.geojson').then((r) => r.json()),
    ])
      .then(([tn, dist]) => {
        setTnGeoJSON(tn);
        setDistrictGeoJSON(dist);
      })
      .catch(console.error);
  }, []);

  const lite = viewportType === '3d-lite';
  const loading = !tnGeoJSON || !districtGeoJSON;

  if (loading) {
    return (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: '80vh', backgroundColor: '#F8F5EF' }}
      >
        <div
          style={{
            width: 32,
            height: 32,
            border: '2px solid #D4A017',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ height: lite ? '60vh' : '80vh' }}>
      <Scene
        tnGeoJSON={tnGeoJSON}
        districtGeoJSON={districtGeoJSON}
        lite={lite}
      />
      {!lite && <MapHeader />}
      <CorridorFilter />
      {!lite && <StatsRow />}
      <ProjectDrawer />
    </div>
  );
}
