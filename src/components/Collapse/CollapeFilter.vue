<script lang="ts" setup>
import { globalSessionId, storeMapDataValue } from '~/composables'

// function handleClick(item: any) {
//   globalSessionId.value = item.id
// }
const sessionOptions = computed(() => {
  return globalAllSessions.value?.map((item: any) => {
    return {
      label: item.title,
      value: item.id,
    }
  })
})
</script>

<template>
  <a-scrollbar style="max-height:400px;overflow: auto;">
    <a-form :model="{}" layout="vertical">
      <a-form-item label="数据源">
        <a-select v-model:model-value="storeMapDataValue" :options="MAP_DATA_LIST" />
      </a-form-item>
      <a-form-item label="路线">
        <a-select v-model:model-value="globalSessionId" :options="sessionOptions" />
      </a-form-item>
    </a-form>
    <!-- <div class="grid grid-cols-2 gap-20px">
      <div
        v-for="item in globalAllSessions" :key="item.id"
        class="flex  rounded-lg border p-5px border-[var(--color-neutral-2)]"
        :class="globalSessionId !== item.id ? 'bg-[var(--color-neutral-2)] cursor-pointer' : 'bg-blue-500 text-white'"
        @click="handleClick(item)"
      >
        <img class="w-50px h-50px object-cover rounded-lg" :src="`${storeMapDataValue}/img/${item.cover}`">
        <div class="ml-10px flex flex-col">
          <div>{{ item.title }}</div>
          <div title="查看数">
            <icon-eye />{{ item.view }}
          </div>
          <div title="收藏数">
            <icon-star />{{ item.favorite }}
          </div>
          <div title="分享数">
            <icon-launch />{{ item.share }}
          </div>
          <div title="点赞数">
            <icon-thumb-up />{{ item.like }}
          </div>
        </div>
      </div>
    </div> -->
  </a-scrollbar>
</template>
