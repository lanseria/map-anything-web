import type { FeatureCollection } from '@turf/turf'
import { handleSetLineString, handleSetPoint, handleSetPolygon, handleSetRadius } from './draw/mode'
import type { MyFeature } from './types'

export * as turf from '@turf/turf'
export { nanoid } from 'nanoid'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)

export const globalMapCenter = ref(INIT_POINT)

export const globalDrawMode = ref('')
export const globalDrawEdit = ref(false)
export const globalDrawMove = ref(false)
export function handleSelectGlobalDrawMode(val: string) {
  globalDrawMode.value = val
}

export function handleMapDrawEdit() {
  globalDrawEdit.value = true
}
export function handleMapDrawMove(val: boolean) {
  globalDrawMove.value = val
}
export function handleMapExitDrawEdit() {
  globalDrawEdit.value = false
  globalDrawMode.value = ''
  setTimeout(() => {
    window.map.resize()
  }, 300)
}

watchEffect(() => {
  if (globalDrawMode.value === 'draw_point')
    handleSetPoint()

  if (globalDrawMode.value === 'draw_line_string')
    handleSetLineString()

  if (globalDrawMode.value === 'draw_polygon') {
    //
    console.warn('draw_polygon')
    handleSetPolygon()
  }

  if (globalDrawMode.value === 'draw_radius') {
    //
    console.warn('draw_radius')
    handleSetRadius()
  }
})

export const globalCurrentProperties = ref(null) as Ref<any>

export const globalMapDrawFeatureModalVisible = ref(false)

export const globalMapDataValue = ref('/xuyun-data')
export const globalMapDataValueUrl = computed(() => {
  return `${globalMapDataValue.value}/json/allSessions.json`
})
export const globalMapDataGeojsonUrl = computed(() => {
  return `${globalMapDataValue.value}/geojson/allPoints.geojson`
})
export const { data: globalAllSessions, execute: globalMapDataExecute } = useFetch<FormatSession[]>(globalMapDataValueUrl).get().json<FormatSession[]>()

watch(() => globalMapDataValueUrl.value, () => {
  globalMapDataExecute()
})

export const { data: globalGeojson, execute: globalGeojsonExecute } = useFetch<FeatureCollection<any, MyFeature>>(globalMapDataGeojsonUrl).get().json<FeatureCollection<any, MyFeature>>()

watch(() => globalMapDataGeojsonUrl.value, () => {
  globalGeojsonExecute()
})

watchDebounced(() => globalGeojson.value, () => {
  console.warn('mapFeatures changed')
  console.warn('drawLayerCheckedKeys changed')
  reloadDataSourceLayer()
}, { debounce: 300, maxWait: 600, immediate: true })

export const globalSessionId = ref(-1)

export const globalVideoId = ref(-1)
