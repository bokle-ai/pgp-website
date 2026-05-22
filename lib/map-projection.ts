import { geoMercator } from 'd3-geo';
import type { GeoPermissibleObjects } from 'd3-geo';

let _projection: ReturnType<typeof geoMercator> | null = null;
// The bounding-box centre of the extruded state mesh after THREE geometry.center()
// We compute this once from the outer ring and reuse it so all scene objects align.
let _centerOffset: [number, number] | null = null;

export function getProjection(tnGeoJSON: GeoPermissibleObjects) {
  if (!_projection) {
    _projection = geoMercator().fitSize([10, 10], tnGeoJSON);
  }
  return _projection;
}

/** Compute and cache the bounding-box centre of the state outline in scene space.
 *  This matches what THREE.ExtrudeGeometry.center() applies to the mesh.
 */
export function getMeshCenterOffset(tnGeoJSON: GeoJSON.FeatureCollection): [number, number] {
  if (_centerOffset) return _centerOffset;

  const proj = getProjection(tnGeoJSON as GeoPermissibleObjects);

  const outerRings: [number, number][][] = [];
  tnGeoJSON.features.forEach((f) => {
    const g = f.geometry;
    if (g.type === 'Polygon') {
      outerRings.push(g.coordinates[0] as [number, number][]);
    } else if (g.type === 'MultiPolygon') {
      (g.coordinates as [number, number][][][]).forEach((poly) =>
        outerRings.push(poly[0])
      );
    }
  });

  let minX = Infinity, maxX = -Infinity, minZ = Infinity, maxZ = -Infinity;
  outerRings.forEach((ring) => {
    ring.forEach((coord) => {
      const r = proj(coord);
      if (!r) return;
      const sx = r[0] - 5;
      const sz = -(r[1] - 5);
      if (sx < minX) minX = sx;
      if (sx > maxX) maxX = sx;
      if (sz < minZ) minZ = sz;
      if (sz > maxZ) maxZ = sz;
    });
  });

  _centerOffset = [(minX + maxX) / 2, (minZ + maxZ) / 2];
  return _centerOffset;
}

/** Project lat/lng → [x, z] in scene space, centred on the TN mesh origin. */
export function projectLatLng(
  lat: number,
  lng: number,
  tnGeoJSON: GeoJSON.FeatureCollection
): [number, number] {
  const proj = getProjection(tnGeoJSON as GeoPermissibleObjects);
  const result = proj([lng, lat]);
  if (!result) return [0, 0];
  const [x, y] = result;
  const raw: [number, number] = [x - 5, -(y - 5)];
  const center = getMeshCenterOffset(tnGeoJSON);
  return [raw[0] - center[0], raw[1] - center[1]];
}
