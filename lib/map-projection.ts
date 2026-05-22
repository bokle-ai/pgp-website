import { geoMercator } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';

// We lazily initialise the projection once the GeoJSON is loaded.
// This module exports a factory so the projection is consistent across
// TamilNaduMesh, CoastlineLine, and all beacon placements.

let _projection: ReturnType<typeof geoMercator> | null = null;

export function getProjection(tnGeoJSON: GeoPermissibleObjects) {
  if (!_projection) {
    _projection = geoMercator().fitSize([10, 10], tnGeoJSON);
  }
  return _projection;
}

export function projectLatLng(
  lat: number,
  lng: number,
  tnGeoJSON: GeoPermissibleObjects
): [number, number] {
  const proj = getProjection(tnGeoJSON);
  const result = proj([lng, lat]);
  if (!result) return [0, 0];
  const [x, y] = result;
  // Offset to centre and flip Y (d3 projects Y-down, Three.js is Y-up)
  return [x - 5, -(y - 5)];
}
