'use client';

import { Html } from '@react-three/drei';
import { projectLatLng } from '@/lib/map-projection';
import { BRAND } from '@/lib/brand-tokens';
import { CORRIDORS, CHENNAI_REFERENCE } from '@/lib/data/map-projects';

const GEOGRAPHIC_LABELS = [
  { lat: 10.5,  lng: 81.6,  text: 'Bay of Bengal', style: 'geo' as const },
  { lat: 8.4,   lng: 77.2,  text: 'Indian Ocean',  style: 'geo' as const },
  { lat: 8.077, lng: 77.55, text: 'Kanyakumari',   style: 'place' as const },
  { lat: 11.0,  lng: 76.95, text: 'Coimbatore',    style: 'place' as const },
  { lat: 11.67, lng: 78.14, text: 'Salem',         style: 'place' as const },
  { lat: 9.92,  lng: 78.12, text: 'Madurai',       style: 'place' as const },
  { lat: 10.78, lng: 79.14, text: 'Thanjavur',     style: 'place' as const },
  { lat: 12.51, lng: 79.07, text: 'Vellore',       style: 'place' as const },
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
  style: 'geo' | 'place' | 'corridor';
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
      fontSize: 12,
      fontWeight: 400,
      color: `${BRAND.accentGold}77`,
      letterSpacing: '0.14em',
    },
    place: {
      ...baseStyle,
      fontFamily: BRAND.fontBody,
      fontSize: 8,
      fontWeight: 600,
      color: `${BRAND.accentGoldSoft}88`,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
    },
    corridor: {
      ...baseStyle,
      fontFamily: BRAND.fontBody,
      fontSize: 9,
      fontWeight: 700,
      color: BRAND.accentGold,
      letterSpacing: '0.2em',
      textTransform: 'uppercase',
      textShadow: `0 1px 6px rgba(15,61,46,0.9)`,
    },
  };

  return (
    <Html position={position} center distanceFactor={10} zIndexRange={[1, 2]}>
      <div style={variants[style]}>{text}</div>
    </Html>
  );
}

export function MapLabels({ tnGeoJSON }: Props) {
  const [cnX, cnZ] = projectLatLng(CHENNAI_REFERENCE.lat, CHENNAI_REFERENCE.lng, tnGeoJSON);

  return (
    <group>
      {/* Geographic context */}
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

      {/* Chennai */}
      <GeoLabel
        position={[cnX, LABEL_Y, cnZ - 0.25]}
        text="Chennai"
        style="place"
      />

      {/* Corridor labels */}
      {CORRIDORS.map((corridor) => {
        const [px, pz] = projectLatLng(corridor.center.lat, corridor.center.lng, tnGeoJSON);
        return (
          <GeoLabel
            key={corridor.id}
            position={[px, LABEL_Y + 0.7, pz]}
            text={corridor.name}
            style="corridor"
          />
        );
      })}
    </group>
  );
}
