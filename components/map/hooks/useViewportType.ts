'use client';

import { useState, useEffect } from 'react';

export type ViewportType = '3d-full' | '3d-lite' | '2d';

export function useViewportType(): ViewportType {
  const [type, setType] = useState<ViewportType>('2d');

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const canvas = document.createElement('canvas');
      const supportsWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));

      if (prefersReduced || !supportsWebGL || w < 768) {
        setType('2d');
      } else if (w < 1024) {
        setType('3d-lite');
      } else {
        setType('3d-full');
      }
    };

    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return type;
}
