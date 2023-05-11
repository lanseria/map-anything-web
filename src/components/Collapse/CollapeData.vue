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
const handlePlay = (item: FormatVideo) => {
  open('https://www.bilibili.com/video/' + item.bvid)
}
</script>
<template>
  <a-scrollbar style="height:200px;overflow: auto;">
    <div class="grid grid-cols-2 gap-20px">
      <div v-for="item in videoList" :key="item.aid" class="flex rounded-lg p-5px border border-[var(--color-neutral-2)]"
        :class="globalVideoId !== item.aid ? 'bg-[var(--color-neutral-2)]' : 'bg-blue-500 text-white'"
        @click="handleClick(item)">
        <div class="flex flex-col">
          <div>{{ item.title }}</div>
          <div class="cursor-pointer" title="查看数" @click="handlePlay(item)"><icon-eye />{{ item.play }}</div>
          <div title="评论数"><icon-message />{{ item.comment }}</div>
          <div title="发布时间"><icon-clock-circle />{{ item.createdStr }}</div>
        </div>
      </div>
    </div>
  </a-scrollbar>
</template>
