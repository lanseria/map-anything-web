import { reloadMapDrawLayer } from '../draw/mode'

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
function setMapPointImg(url: string) {
  const map = window.map
  const name = 'map-point'
  if (map.hasImage(name))
    map.removeImage(name)

  loadImg('map-point', url)
}

watch(() => globalMapPointUrl.value, () => {
  if (globalMapPointUrl.value === '')
    return
  setMapPointImg(globalMapPointUrl.value)
})

export function mapLoad() {
  // loadImg('DrawLineArrow', drawLineArrow, true)
  // loadImg('DrawLineArrow', '/draw-line-arrow.png', true)
  // mapLoadImages()

  reloadMapDrawLayer()
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
