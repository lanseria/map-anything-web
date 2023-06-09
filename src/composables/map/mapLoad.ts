import { reloadMapDrawLayer } from '../draw/mode'
import { reloadMapGpxLayer } from './mapLayer'

function loadImg(name: string, url: string, sdf = false) {
  const map = window.map
  if (map.hasImage(name))
    return

  map.loadImage(url, (error, image) => {
    if (error)
      throw error
    image && map.addImage(name, image, { sdf })
  })
}
export function setMapPointImg(url: string) {
  console.warn('setMapPointImg')
  const map = window.map
  const name = 'map-point'
  if (map.hasImage(name))
    map.removeImage(name)
  loadImg('map-point', url)
}

watch([() => globalMapPointUrl.value, () => globalIsMapboxLoad.value], () => {
  if (globalMapPointUrl.value === '')
    return
  if (globalIsMapboxLoad.value) {
    setMapPointImg(globalMapPointUrl.value)
  }
  else {
    setTimeout(() => {
      setMapPointImg(globalMapPointUrl.value)
    })
  }
})

export function mapLoad() {
  // loadImg('DrawLineArrow', drawLineArrow, true)
  // loadImg('DrawLineArrow', '/draw-line-arrow.png', true)
  // mapLoadImages()

  reloadMapDrawLayer()

  MAP_DATA_LIST.forEach((item) => {
    reloadMapGpxLayer(item.label, item.value)
    // console.warn('mapLoad')
    setTimeout(() => {
      updateLineLayer()
    }, 1000)
  })
  // reloadMapGpxLayer('lanseria.1yil1z4p', '#ffdcb6')
  // for (const key in mapCityTypeColorMap.value) {
  //   const color = mapCityTypeColorMap.value[key]
  //   const colorRgb = hexToRgb(color)
  //   if (map.hasImage(color))
  //     map.removeImage(color)
  //   map.addImage(color, createColorPoint(...colorRgb, 255))
  // }

  // setTimeout(() => {
  //   styleIsLoad.value = true
  //   reloadSourceLayer()
  //   reloadCityLayer()

  //   watchDebounced(() => filterCityList.value, () => {
  //     console.warn('filterCityList changed')
  //     reloadCityLayer()
  //   }, { debounce: 300, maxWait: 600 })
  // }, 2000)
}
