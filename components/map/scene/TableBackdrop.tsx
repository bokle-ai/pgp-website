'use client';

import { BRAND } from '@/lib/brand-tokens';

export function TableBackdrop() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.06, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial color={BRAND.bgCream} roughness={0.92} metalness={0} />
    </mesh>
  );
}
