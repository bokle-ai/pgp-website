'use client';

import { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import * as THREE from 'three';
import gsap from 'gsap';
import { useMapStore } from '../hooks/useMapStore';
import { projectLatLng } from '@/lib/map-projection';
import { CORRIDORS } from '@/lib/data/map-projects';

const INITIAL_POS = new THREE.Vector3(0, 9, 10);
const INITIAL_TARGET = new THREE.Vector3(0, 0, 0);
const ENTRY_POS = new THREE.Vector3(0, 18, 18);

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
  lite?: boolean;
}

export function CameraRig({ tnGeoJSON, lite = false }: Props) {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const orbitAngleRef = useRef(0);
  const idleTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idlePausedRef = useRef(false);
  const { selectedProject, activeFilter, isInteracting } = useMapStore();

  // Entry animation
  useEffect(() => {
    camera.position.copy(ENTRY_POS);
    gsap.to(camera.position, {
      x: INITIAL_POS.x,
      y: INITIAL_POS.y,
      z: INITIAL_POS.z,
      duration: 1.4,
      ease: 'power3.out',
      onUpdate: () => camera.lookAt(INITIAL_TARGET),
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // React to selected project — fly to it
  useEffect(() => {
    if (!selectedProject) {
      // Return to initial
      gsap.to(camera.position, {
        x: INITIAL_POS.x,
        y: INITIAL_POS.y,
        z: INITIAL_POS.z,
        duration: 1.4,
        ease: 'power3.inOut',
        onUpdate: () => camera.lookAt(INITIAL_TARGET),
      });
      if (controlsRef.current) {
        gsap.to(controlsRef.current.target, {
          x: 0, y: 0, z: 0,
          duration: 1.4,
          ease: 'power3.inOut',
          onUpdate: () => controlsRef.current?.update(),
        });
      }
      return;
    }

    const [px, pz] = projectLatLng(
      selectedProject.coordinates.lat,
      selectedProject.coordinates.lng,
      tnGeoJSON
    );

    const targetPos = new THREE.Vector3(px + 1.5, 2.5, pz + 3);
    const lookAt = new THREE.Vector3(px, 0.4, pz);

    gsap.to(camera.position, {
      x: targetPos.x, y: targetPos.y, z: targetPos.z,
      duration: 1.6,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.lerp(lookAt, 0.05);
          controlsRef.current.update();
        }
      },
    });
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: lookAt.x, y: lookAt.y, z: lookAt.z,
        duration: 1.6,
        ease: 'power3.inOut',
        onUpdate: () => controlsRef.current?.update(),
      });
    }
  }, [selectedProject, camera, tnGeoJSON]);

  // React to corridor filter — fly to corridor center
  useEffect(() => {
    if (activeFilter === 'all') return;
    const corridor = CORRIDORS.find((c) => c.id === activeFilter);
    if (!corridor) return;

    const [px, pz] = projectLatLng(
      corridor.center.lat,
      corridor.center.lng,
      tnGeoJSON
    );
    const targetPos = new THREE.Vector3(px, 5, pz + 5);
    const lookAt = new THREE.Vector3(px, 0, pz);

    gsap.to(camera.position, {
      x: targetPos.x, y: targetPos.y, z: targetPos.z,
      duration: 1.2,
      ease: 'power3.inOut',
      onUpdate: () => {
        if (controlsRef.current) {
          controlsRef.current.target.lerp(lookAt, 0.08);
          controlsRef.current.update();
        }
      },
    });
    if (controlsRef.current) {
      gsap.to(controlsRef.current.target, {
        x: lookAt.x, y: lookAt.y, z: lookAt.z,
        duration: 1.2,
        ease: 'power3.inOut',
        onUpdate: () => controlsRef.current?.update(),
      });
    }
  }, [activeFilter, camera, tnGeoJSON]);

  // Pause idle orbit when interacting, resume after 8s
  useEffect(() => {
    if (isInteracting) {
      idlePausedRef.current = true;
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
      idleTimerRef.current = setTimeout(() => {
        idlePausedRef.current = false;
      }, 8000);
    }
    return () => {
      if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    };
  }, [isInteracting]);

  // Idle orbit + atmospheric drift
  useFrame((state, delta) => {
    if (idlePausedRef.current || lite) return;
    orbitAngleRef.current += delta * (Math.PI * 2) / 80; // 80-second full rotation
    const r = camera.position.length();
    camera.position.x = Math.sin(orbitAngleRef.current) * r * 0.12;
    // Subtle sine drift
    const driftX = Math.sin(state.clock.elapsedTime / 12) * 0.015;
    const driftZ = Math.cos(state.clock.elapsedTime / 15) * 0.015;
    if (!isInteracting) {
      camera.position.x += driftX;
      camera.position.z += driftZ;
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableZoom={true}
      enablePan={false}
      minDistance={5.5}
      maxDistance={14}
      minPolarAngle={Math.PI / 6}
      maxPolarAngle={Math.PI / 2.1}
      enableDamping={true}
      dampingFactor={0.08}
      onStart={() => useMapStore.getState().setInteracting(true)}
      onEnd={() => {
        idleTimerRef.current = setTimeout(
          () => useMapStore.getState().setInteracting(false),
          8000
        );
      }}
    />
  );
}
