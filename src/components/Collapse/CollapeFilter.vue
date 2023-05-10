<script lang="ts" setup>
const handleClick = (item: any) => {
  globalSessionId.value = item.id
}
</script>
<template>
  <a-scrollbar style="height:400px;overflow: auto;">
    <div class="grid grid-cols-2 gap-20px">
      <div v-for="item in globalAllSessions" :key="item.id" class="flex  rounded-lg shadow-lg"
        :class="globalSessionId !== item.id ? 'bg-white cursor-pointer' : 'bg-green-500 text-white'"
        @click="handleClick(item)">
        <img class="w-50px h-50px object-cover rounded-lg" :src="`/xuyun-data/img/${item.cover}`" />
        <div class="ml-10px flex flex-col">
          <div>{{ item.title }}</div>
          <div title="查看数"><icon-eye />{{ item.view }}</div>
          <div title="收藏数"><icon-star />{{ item.favorite }}</div>
          <div title="分享数"><icon-launch />{{ item.share }}</div>
          <div><icon-thumb-up />{{ item.like }}</div>
        </div>
      </div>
    </div>
  </a-scrollbar>
</template>
