import { reloadMapDrawLayer } from './draw/mode'
import type { MyFeature } from './types'

export const storeContentSideCollapseActiveKey = useStorage('storeContentSideCollapseActiveKey', ['1'])
export const storeContentSideCollapsed = useStorage('storeContentSideCollapsed', true)
export function handleContentSideCollapsed() {
  storeContentSideCollapsed.value = !storeContentSideCollapsed.value
  nextTick(() => {
    window.map.resize()
  })
}
export const storeMapStyle = useStorage('storeMapStyle', '街道地图')
export const storeMapDrawFeatures = useStorage('storeMapDrawFeatures', []) as Ref<MyFeature[]>
export const storeMapDrawLayerCheckedKeys = useStorage<string[]>('storeMapDrawLayerCheckedKeys', [])
watchDebounced([() => storeMapDrawFeatures.value, () => storeMapDrawLayerCheckedKeys.value], () => {
  console.warn('storeMapDrawFeatures or storeMapDrawLayerCheckedKeys changed')
  if (globalIsMapboxLoad.value) {
    console.warn('reloadMapDrawLayer')
    reloadMapDrawLayer()
  }
}, { debounce: 300, maxWait: 600, immediate: true })

export const storeMapImportLayerCheckedKeys
= useStorage<string[]>('storeMapImportLayerCheckedKeys', [...MAP_DATA_LIST.map(it => it.label)])

watchDebounced([() => globalIsMapboxLoad.value, () => storeMapImportLayerCheckedKeys.value], () => {
  console.warn('storeMapImportLayerCheckedKeys changed')
  if (globalIsMapboxLoad.value)
    updateLineLayer()
}, { debounce: 300, maxWait: 600, immediate: true })
