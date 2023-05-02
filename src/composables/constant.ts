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
