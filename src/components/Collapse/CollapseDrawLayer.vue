<script lang="ts" setup>
import { Icon, Message } from '@arco-design/web-vue'
import { IconLayers } from '@arco-design/web-vue/es/icon'
import { storeMapDrawLayerCheckedKeys } from '~/composables'

const IconFont = Icon.addFromIconFontCn({ src: DEFAULT_ICONFONT_CN_URL })
const treeData = computed<any>(() => {
  const filterPoints = storeMapDrawFeatures.value.filter(item => item.geometry.type === 'Point').map(item => ({
    title: item.properties!.description || item.properties!.id,
    key: item.properties!.id,
    icon: () => h(IconFont, { type: 'icon-dian' }),
    leaf: true,
  }))
  const filterLineStrings = storeMapDrawFeatures.value.filter(item => item.geometry.type === 'LineString').map(item => ({
    title: item.properties!.description || item.properties!.id,
    key: item.properties!.id,
    icon: () => h(IconFont, { type: 'icon-xian' }),
    leaf: true,
  }))
  const filterPolygons = storeMapDrawFeatures.value.filter(item => item.geometry.type === 'Polygon').map(item => ({
    title: item.properties!.description || item.properties!.id,
    key: item.properties!.id,
    icon: () => h(IconFont, { type: 'icon-mian' }),
    leaf: true,
  }))
  return [
    {
      title: '点',
      key: 'point',
      leaf: false,
      icon: () => h(IconLayers),
      children: filterPoints,
    },
    {
      title: '线',
      key: 'linestring',
      leaf: false,
      icon: () => h(IconLayers),
      children: filterLineStrings,
    },
    {
      title: '面',
      key: 'polygon',
      leaf: false,
      icon: () => h(IconLayers),
      children: filterPolygons,
    },
  ]
})

function handleDelete(node: any) {
  storeMapDrawFeatures.value = storeMapDrawFeatures.value.filter(item => item.properties!.id !== node.key)
  Message.success('已删除')
}
function handleClickTreeItem(node: any) {
  const current = storeMapDrawFeatures.value.find(item => item.properties!.id === node.key)
  if (current) {
    globalCurrentProperties.value = {
      ...current.properties,
    }
    globalMapDrawFeatureModalVisible.value = true
  }
}
</script>

<template>
  <a-tree
    v-model:checked-keys="storeMapDrawLayerCheckedKeys"
    :block-node="true"
    :checkable="true"
    :data="treeData"
  >
    <template #title="nodeData">
      <span @click="handleClickTreeItem(nodeData)">{{ nodeData.title }}</span>
    </template>
    <template #extra="nodeData">
      <span v-if="nodeData.leaf" class="text-red-500">
        <a-popconfirm content="真的要删除此数据?" @ok="handleDelete(nodeData)">
          <IconDelete
            class="absolute right-8px text-size-12px top-10px"
          />
        </a-popconfirm>
      </span>
    </template>
  </a-tree>
</template>
