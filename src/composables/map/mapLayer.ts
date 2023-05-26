export function addSource() {
  const map = window.map
  const source: any = map.getSource(MAP_DATA_SOURCE)
  const filterMapFeatures = globalComputedFilterMapFeatures.value
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
      'icon-image': 'map-point',
      'icon-size': 0.1,
      'text-size': ['get', 'text-size'],
      'text-offset': [0, 0.5],
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
      ['==', ['get', 'sessionId'], globalSessionId.value],
    ],
  })
}

export function reloadDataSourceLayer() {
  addSource()
  drawPoint()
}

export async function updateLineLayer() {
  const map = window.map
  const arr = [-1, 0, 1, 0]
  MAP_DATA_LIST.forEach((item) => {
    // console.warn(storeMapImportLayerCheckedKeys.value)
    const visibility = storeMapImportLayerCheckedKeys.value.includes(item.label)
    // console.warn('visibility', visibility)
    const sourceId = `source-${item.label}`
    const layerId = `layer-${item.label}`
    arr.forEach((x, i) => {
      const lineLayerId = `${LINE_PREFIX}${layerId}-${i}`
      if (map.getLayer(lineLayerId))
        map.removeLayer(lineLayerId)
      map.addLayer({
        id: lineLayerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-cap': i === 3 ? 'butt' : 'square',
          'visibility': visibility ? 'visible' : 'none',
        },
        paint: {
          'line-color': i === 3 ? item.color : 'white',
          'line-width': i === 3 ? 6 : 3,
          'line-offset': x * 3,
        },
      })
    })
  })
}

export function reloadMapGpxLayer(label: string, value: string) {
  const map = window.map
  const sourceId = `source-${label}`
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'geojson',
      data: `${value}/geojson/track.geojson`,
    })
  }
}
