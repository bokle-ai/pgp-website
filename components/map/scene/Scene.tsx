'use client';

import { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, PerformanceMonitor } from '@react-three/drei';
import { EffectComposer, Noise, Vignette } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import { TamilNaduMesh } from './TamilNaduMesh';
import { TableBackdrop } from './TableBackdrop';
import { BeaconCluster } from './BeaconCluster';
import { DistrictLines } from './DistrictLines';
import { MapLabels } from './MapLabels';
import { CameraRig } from './CameraRig';
import { BRAND } from '@/lib/brand-tokens';

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  districtGeoJSON: GeoJSON.FeatureCollection;
  lite?: boolean;
}

export function Scene({ tnGeoJSON, districtGeoJSON, lite = false }: Props) {
  const [degraded, setDegraded] = useState(false);
  const shadows = !lite && !degraded;
  const extrudeDepth = lite ? 0.25 : 0.4;

  return (
    <Canvas
      shadows={shadows}
      camera={{ fov: 38, near: 0.1, far: 120, position: [0, 18, 18] }}
      gl={{ antialias: true, toneMapping: 2, toneMappingExposure: 1.1 }}
      style={{ background: BRAND.bgCream }}
    >
      <PerformanceMonitor
        onDecline={() => setDegraded(true)}
        onIncline={() => setDegraded(false)}
      />

      {/* Warm ambient fill */}
      <ambientLight intensity={0.42} color="#F4EBD3" />

      {/* Key light — warm white, top-left */}
      <directionalLight
        position={[6, 10, 4]}
        intensity={1.25}
        color="#FFF5DC"
        castShadow={shadows}
        shadow-mapSize-width={shadows ? 2048 : 512}
        shadow-mapSize-height={shadows ? 2048 : 512}
        shadow-camera-left={-14}
        shadow-camera-right={14}
        shadow-camera-top={14}
        shadow-camera-bottom={-14}
        shadow-bias={-0.0005}
      />

      {/* Rim — warm gold from behind-left */}
      <directionalLight position={[-4, 6, -3]} intensity={0.3} color={BRAND.accentGold} />

      {/* Fill — soft front */}
      <pointLight position={[0, 3, 5]} intensity={0.38} color="#FFF5DC" distance={18} />

      <Suspense fallback={null}>
        <Environment preset="studio" environmentIntensity={0.3} />
        <TableBackdrop />
        <TamilNaduMesh tnGeoJSON={tnGeoJSON} lite={lite} />
        <DistrictLines
          tnGeoJSON={tnGeoJSON}
          districtGeoJSON={districtGeoJSON}
          extrudeDepth={extrudeDepth}
        />
        <BeaconCluster tnGeoJSON={tnGeoJSON} />
        <MapLabels tnGeoJSON={tnGeoJSON} />
        <CameraRig tnGeoJSON={tnGeoJSON} lite={lite} />
      </Suspense>

      {!lite && !degraded && (
        <EffectComposer multisampling={4}>
          <Noise opacity={0.035} blendFunction={BlendFunction.OVERLAY} />
          <Vignette eskil={false} offset={0.18} darkness={0.38} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
