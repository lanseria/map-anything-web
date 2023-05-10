<script lang="ts" setup>
const videoList = computed(() => {
  if (globalAllSessions.value) {
    return globalAllSessions.value.find((item: any) => item.id === globalSessionId.value)!.videoList
  } else {
    return []
  }
})
const handleClick = (item: FormatVideo) => {
  globalVideoId.value = item.aid
}
</script>
<template>
  <a-scrollbar style="height:400px;overflow: auto;">
    <div class="grid grid-cols-2 gap-20px">
      <div v-for="item in videoList" :key="item.aid" class="flex  rounded-lg shadow-lg"
        :class="globalVideoId !== item.aid ? 'bg-white cursor-pointer' : 'bg-green-500 text-white'"
        @click="handleClick(item)">
        <div class="ml-10px flex flex-col">
          <div>{{ item.title }}</div>
          <div title="查看数"><icon-eye />{{ item.play }}</div>
          <div title="评论数"><icon-star />{{ item.comment }}</div>
        </div>
      </div>
    </div>
  </a-scrollbar>
</template>
