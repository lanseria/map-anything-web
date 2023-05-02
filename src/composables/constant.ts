export const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN

console.warn('renderer constant: ', MAPBOX_TOKEN)

export const MAPBOX_STYLE_LIST = [
  {
    name: '街道地图',
    style: 'mapbox://styles/lanseria/cld5ur36v000301lngmbtq0qh',
  },
  {
    name: '简洁白底',
    style: 'mapbox://styles/lanseria/cldwdod87000e01pcn2ezak1n',
  },
  {
    name: '卫星地图',
    value: '3',
    style: 'mapbox://styles/lanseria/cldecwoux001t01pk90yx1jj3',
  },
]

export const INIT_POINT = [108.84, 31.06]
export const INIT_ZOOM = 3.5

export enum PointTypeEnum {
  点 = 'InitPoint',
}

export const PointTypeEnumMap = {
  [PointTypeEnum.点]: '点',
}

export enum LineStringTypeEnum {
  线 = 'InitLineString',
}

export const LineStringTypeEnumMap = {
  [LineStringTypeEnum.线]: '线',
}

export enum PolygonTypeEnum {
  面 = 'InitPolygon',
}

export const PolygonTypeEnumMap = {
  [PolygonTypeEnum.面]: '面',
}

export const DOT_IMAGE_NAME = 'draw-point'

export const FILL_PREFIX = 'fill-'
export const LINE_PREFIX = 'line-'
export const CIRCLE_PREFIX = 'circle-'
export const SYMBOL_PREFIX = 'symbol-'

export const SETTING_TEXT_MAXSIZE = 30
export const SETTING_SYMBOL_MAXSIZE = 1

export const INIT_POLYGON_FILL_COLOR = '#e88b4d'
export const INIT_POLYGON_LINE_COLOR = '#e0be28'
export const INIT_POLYGON_OPACITY = 0.5

export const INIT_LINE_COLOR = '#ee6b3b'

export const INIT_POINT_SYMBOL_SIZE = 0.1
export const INIT_POINT_COLOR = '#71717a'
export const INIT_POINT_TEXT_FILL_COLOR = '#7e6c56'
export const INIT_POINT_TEXT_HALO_COLOR = '#ffffff'
export const INIT_POINT_TEXT_SIZE = 12

export const INIT_LINE_OPACITY = 0.8

export const INIT_RASTER_OPACITY = 0.5

export const MAP_DRAW_SOURCE = 'MAP_DRAW_SOURCE'
export const MAP_DRAW_LAYER_POLYGON_FILL = 'MAP_DRAW_LAYER_POLYGON_FILL'
export const MAP_DRAW_LAYER_POLYGON_OUTLINE = 'MAP_DRAW_LAYER_POLYGON_OUTLINE'
export const MAP_DRAW_LAYER_STRINGLINE = 'MAP_DRAW_LAYER_STRINGLINE'
export const MAP_DRAW_LAYER_POINT = 'MAP_DRAW_LAYER_POINT'
