export const storeContentSideCollapseActiveKey = useStorage('storeContentSideCollapseActiveKey', ['1'])
export const storeContentSideCollapsed = useStorage('storeContentSideCollapsed', true)
export function handleContentSideCollapsed() {
  storeContentSideCollapsed.value = !storeContentSideCollapsed.value
  nextTick(() => {
    window.map.resize()
  })
}
export const storeMapStyle = useStorage('storeMapStyle', '街道地图')
