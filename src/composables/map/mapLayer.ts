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

async function addLineLayer(id: string, name: string, color: string) {
  const map = window.map
  const sourceId = `source-${id}`
  const layerId = `layer-${id}`
  const arr = [-1, 0, 1, 0]
  arr.forEach((x, i) => {
    const lineLayerId = `${LINE_PREFIX}${layerId}-${i}`
    if (map.getLayer(lineLayerId))
      map.removeLayer(lineLayerId)
    map.addLayer({
      'id': lineLayerId,
      'type': 'line',
      'source': sourceId,
      'source-layer': name,
      'layout': {
        'line-cap': i === 3 ? 'butt' : 'square',
      },
      'paint': {
        'line-color': i === 3 ? color : 'white',
        'line-width': i === 3 ? 6 : 3,
        'line-offset': x * 3,
      },
    })
  })
  // map.addLayer(
  //   {
  //     'id': lineLayerId,
  //     'type': 'line',
  //     'source': sourceId,
  //     'source-layer': name,
  //     'filter': ['all', ['match', ['geometry-type'], ['LineString'], !0, !1]],
  //     'layout': {
  //       'line-join': 'round',
  //       'line-cap': 'round',
  //       'visibility': 'visible',
  //     },
  //     'paint': {
  //       'line-color': color,
  //       'line-width': 5,
  //       'line-gradient': [
  //         'interpolate',
  //         ['linear'],
  //         ['line-progress'],
  //         0, 'red',
  //         1, 'blue',
  //       ],
  //     },
  //   },
  // )
}

export function reloadMapGpxLayer(id: string, color: string) {
  const map = window.map
  const sourceId = `source-${id}`
  if (!map.getSource(sourceId)) {
    map.addSource(sourceId, {
      type: 'vector',
      // Use any Mapbox-hosted tileset using its tileset id.
      // Learn more about where to find a tileset id:
      // https://docs.mapbox.com/help/glossary/tileset-id/
      url: `mapbox://${id}?fresh=true`,
    })
  }

  addLineLayer(id, 'tracks', color)
}
