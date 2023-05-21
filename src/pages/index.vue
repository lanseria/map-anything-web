<script setup lang="ts">
const size = ref('400px')
const min = ref('200px')
watchEffect(() => {
  if (!storeContentSideCollapsed.value) {
    min.value = '0px'
    size.value = '0px'
  }
  else {
    min.value = '200px'
    size.value = '400px'
  }
})
function resizeHandler() {
  window.map.resize()
}
const debounceMapboxResize = useDebounceFn(resizeHandler, 100)
function onMoving() {
  debounceMapboxResize()
}
</script>

<template>
  <div class="w-screen h-screen flex flex-col">
    <TabPanelMenu class="shrink-0" />
    <a-split
      v-model:size="size"
      class="flex-1 w-full h-full"
      style="height: calc(100vh - 168.5px);"
      :min="min"
      max="400px"
      @moving="onMoving"
    >
      <template #first>
        <ContentSide v-if="storeContentSideCollapsed" />
      </template>
      <template #second>
        <ContentMap />
      </template>
    </a-split>
  </div>
  <ModalMapDraw />
  <ModalDrawDataUpload />
  <ModalDataMultipleMarker />
  <ModalAbout />
  <ModalJoinUs />
</template>
