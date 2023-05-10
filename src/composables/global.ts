import { handleSetLineString, handleSetPoint, handleSetPolygon, handleSetRadius } from './draw/mode'

export * as turf from '@turf/turf'
export { nanoid } from 'nanoid'

export const globalIsMapboxLoad = ref(false)
export const globalSettingModalVisible = ref(false)

export const globalMapCenter = ref(INIT_POINT)

export const globalDrawMode = ref('')
export const globalDrawEdit = ref(false)
export function handleSelectGlobalDrawMode(val: string) {
  globalDrawMode.value = val
}

export function handleMapDrawEdit() {
  globalDrawEdit.value = true
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

export const { data: globalAllSessions } = useFetch<FormatSession[]>('/xuyun-data/json/allSessions.json').get().json<FormatSession[]>()

export const globalSessionId = ref(-1)

export const globalVideoId = ref(-1)
