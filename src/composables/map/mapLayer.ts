export function addSource() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_SOURCE)
  const filterMapFeatures = globalGeojson.value?.features || []
  // 判断source
  if (source) {
    source.setData(
      turf.featureCollection(filterMapFeatures),
    )
  }
  else {
    map.addSource(MAP_DATA_SOURCE, {
      type: 'geojson',
      data: turf.featureCollection(filterMapFeatures),
    })
  }
}

export function drawPoint() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_SOURCE)
  if (!source)
    return
  if (map.getLayer(MAP_DATA_LAYER_POINT))
    map.removeLayer(MAP_DATA_LAYER_POINT)
  map.addLayer({
    id: MAP_DATA_LAYER_POINT,
    type: 'symbol',
    source: MAP_DATA_SOURCE,
    layout: {
      'text-field': ['get', 'description'],
      'icon-image': 'bicycle1',
      'icon-size': ['coalesce', ['get', 'icon-size'], 1],
      'text-size': ['get', 'text-size'],
      'text-offset': [0, 1.5],
      'text-anchor': 'top',
      'icon-allow-overlap': true,
    },
    paint: {
      'text-color': ['get', 'text-color'],
      'text-halo-color': INIT_POINT_TEXT_HALO_COLOR,
      'text-halo-width': 1,
      'text-halo-blur': 0,
    },
    filter: ['all',
      ['==', ['geometry-type'], 'Point'],
      // ['!=', ['get', 'icon-image'], 'bicycle1'],
    ],
  })
}

export function reloadDataSourceLayer() {
  addSource()
  drawPoint()
}
