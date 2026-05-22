'use client';

import dynamic from 'next/dynamic';
import { useViewportType } from './hooks/useViewportType';
import { ProjectMap2D } from './ProjectMap2D';

// Dynamically import the heavy 3D bundle — SSR disabled, not loaded on mobile
const ProjectMap3DLazy = dynamic(
  () => import('./ProjectMap3D').then((m) => ({ default: m.ProjectMap3D })),
  {
    ssr: false,
    loading: () => (
      <div
        className="w-full flex items-center justify-center"
        style={{ height: '80vh', backgroundColor: '#F8F5EF' }}
      >
        <div
          style={{
            width: 28,
            height: 28,
            border: '2px solid #D4A017',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    ),
  }
);

export function ProjectMap() {
  const viewportType = useViewportType();

  if (viewportType === '2d') {
    return <ProjectMap2D />;
  }

  return <ProjectMap3DLazy viewportType={viewportType} />;
}
