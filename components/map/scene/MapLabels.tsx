'use client';

import { Html } from '@react-three/drei';
import { projectLatLng } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';
import { CHENNAI_REFERENCE } from '@/lib/data/map-projects';

const GEOGRAPHIC_LABELS = [
  { lat: 9.5,   lng: 82.4,  text: 'Bay of Bengal', style: 'geo' as const },
  { lat: 7.6,   lng: 76.4,  text: 'Indian Ocean',  style: 'geo' as const },
  { lat: 8.077, lng: 77.55, text: 'Kanyakumari',   style: 'place' as const },
  { lat: 11.0,  lng: 76.95, text: 'Coimbatore',    style: 'place' as const },
  { lat: 11.67, lng: 78.14, text: 'Salem',         style: 'place' as const },
  { lat: 9.92,  lng: 78.12, text: 'Madurai',       style: 'place' as const },
  { lat: 10.78, lng: 79.14, text: 'Thanjavur',     style: 'place' as const },
];

const LABEL_Y = 0.5;

interface Props {
  tnGeoJSON: GeoJSON.FeatureCollection;
}

function GeoLabel({
  position,
  text,
  style,
}: {
  position: [number, number, number];
  text: string;
  style: 'geo' | 'place' | 'corridor' | 'cluster';
}) {
  const baseStyle: React.CSSProperties = {
    whiteSpace: 'nowrap',
    userSelect: 'none',
    pointerEvents: 'none',
    lineHeight: 1,
  };

  const variants: Record<string, React.CSSProperties> = {
    geo: {
      ...baseStyle,
      fontFamily: BRAND.fontDisplay,
      fontStyle: 'italic',
      fontSize: 13,
      fontWeight: 400,
      color: `${BRAND.accentGold}AA`,
      letterSpacing: '0.18em',
      textShadow: `0 1px 3px ${BRAND.bgCream}, 0 0 10px ${BRAND.bgCream}`,
    },
    place: {
      ...baseStyle,
      fontFamily: BRAND.fontBody,
      fontSize: 9,
      fontWeight: 700,
      color: BRAND.cream,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      backgroundColor: `${BRAND.bgDeep}E6`,
      border: `1px solid ${BRAND.accentGold}55`,
      padding: '3px 8px',
      borderRadius: 2,
      boxShadow: `0 2px 6px rgba(15,61,46,0.25)`,
    },
    corridor: {
      ...baseStyle,
      fontFamily: BRAND.fontBody,
      fontSize: 10,
      fontWeight: 700,
      color: BRAND.bgDeep,
      letterSpacing: '0.22em',
      textTransform: 'uppercase',
      backgroundColor: BRAND.accentGold,
      padding: '4px 10px',
      borderRadius: 2,
      boxShadow: `0 3px 10px rgba(15,61,46,0.35)`,
    },
    cluster: {
      ...baseStyle,
      fontFamily: BRAND.fontDisplay,
      fontSize: 11,
      fontWeight: 600,
      color: BRAND.bgDeep,
      letterSpacing: '0.05em',
      backgroundColor: BRAND.accentGold,
      padding: '5px 11px',
      borderRadius: 2,
      boxShadow: `0 4px 14px rgba(15,61,46,0.4)`,
    },
  };

  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[1, 3]}>
      <div style={variants[style]}>{text}</div>
    </Html>
  );
}

export function MapLabels({ tnGeoJSON }: Props) {
  const [cnX, cnZ] = projectLatLng(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng, tnGeoJSON);

  return (
    <group>
      {GEOGRAPHIC_LABELS.map((l) => {
        const [px, pz] = projectLatLng(l.lat, l.lng, tnGeoJSON);
        return (
          <GeoLabel
            key={l.text}
            position={[px, LABEL_Y, pz]}
            text={l.text}
            style={l.style}
          />
        );
      })}

      {/* Chennai — offset north so it doesn't collide with the project cluster */}
      <GeoLabel
        position={[cnX + 0.35, LABEL_Y, cnZ - 0.5]}
        text="Chennai"
        style="place"
      />
    </group>
  );
}
