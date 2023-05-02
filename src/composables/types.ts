import type { Feature, LineString, Point, Polygon } from '@turf/turf'

export type MyFeature = Feature<Polygon | Point | LineString>
