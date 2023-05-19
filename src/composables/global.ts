import type { FeatureCollection } from '@turf/turf'
import { handleSetLineString, handleSetPoint, handleSetPolygon, handleSetRadius } from './draw/mode'
import type { MyFeature, MyGeometry } from './types'

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
export const globalModalDrawDataUploadVisible = ref(false)
export const globalModalDataMultipleMarkerVisible = ref(false)

export const globalMapDataValue = ref('/xuyun-data')

export const globalMapDataValueUrl = computed(() => {
  return `${globalMapDataValue.value}/json/allSessions.json`
})
export const globalMapDataGeojsonUrl = computed(() => {
  return `${globalMapDataValue.value}/geojson/allPoints.geojson`
})
export const globalMapPointUrl = computed(() => {
  return `${globalMapDataValue.value}/img/map-point.png`
})
export const { data: globalAllSessions, execute: globalMapDataExecute } = useFetch<FormatSession[]>(globalMapDataValueUrl).get().json<FormatSession[]>()

export const { data: globalGeojson, execute: globalGeojsonExecute } = useFetch<FeatureCollection<MyGeometry, any>>(globalMapDataGeojsonUrl).get().json<FeatureCollection<MyGeometry, any>>()
export const globalGeojsonFeatures = computed(() => {
  return globalGeojson.value?.features || []
})
watch(() => globalMapDataGeojsonUrl.value, () => {
  globalGeojsonExecute()
})
export const globalSessionId = ref(-1)
watch(() => globalMapDataValueUrl.value, async () => {
  await globalMapDataExecute()
  if (globalAllSessions.value?.length)
    globalSessionId.value = globalAllSessions.value[0].id
})
export const globalVideoId = ref(-1)

watchDebounced([() => globalGeojson.value,
  () => globalSessionId.value,
  () => globalVideoId.value,
  () => globalIsMapboxLoad.value], () => {
  console.warn('globalGeojson changed')
  if (globalIsMapboxLoad.value)
    reloadDataSourceLayer()
}, { debounce: 300, maxWait: 600, immediate: true })

export const globalComputedFilterMapFeatures = computed(() => {
  return ((globalGeojson.value?.features || []) as MyFeature[]).filter(
    (item) => {
      if (globalSessionId.value === -1)
        return true
      else if (item.properties?.sessionId === globalSessionId.value)
        return true
      else
        return false
    },
  ).filter((item) => {
    if (globalVideoId.value === -1)
      return true
    else if (item.properties?.videoId === globalVideoId.value)
      return true
    else
      return false
  })
})
