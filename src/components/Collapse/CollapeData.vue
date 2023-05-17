<script lang="ts" setup>
const videoList = computed(() => {
  if (globalAllSessions.value) {
    const sessions = globalAllSessions.value.find((item: any) => item.id === globalSessionId.value)
    if (sessions)
      return sessions.videoList
    else
      return []
  }
  else {
    return []
  }
})
function handleClick(item: FormatVideo) {
  globalVideoId.value = item.aid
}
function handleClickReset() {
  globalVideoId.value = -1
}
function handlePlay(item: FormatVideo) {
  open(`https://www.bilibili.com/video/${item.bvid}`)
}
</script>

<template>
  <a-scrollbar style="height:400px;overflow: auto;">
    <div class="grid grid-cols-2 gap-20px">
      <div
        class="cursor-pointer flex rounded-lg p-5px border border-[var(--color-neutral-2)]"
        :class="globalVideoId !== -1 ? 'bg-[var(--color-neutral-2)]' : 'bg-[var(--color-neutral-4)]'"
        @click="handleClickReset()"
      >
        全部路线
      </div>
      <div
        v-for="item in videoList" :key="item.aid" class="cursor-pointer flex rounded-lg p-5px border border-[var(--color-neutral-2)]"
        :class="globalVideoId !== item.aid ? 'bg-[var(--color-neutral-2)]' : 'bg-[var(--color-neutral-4)] '"
        @click="handleClick(item)" @dblclick="handlePlay(item)"
      >
        <div class="flex flex-col">
          <div class="text-12px">
            {{ item.title }}
          </div>
          <div title="发布时间" class="text-12px text-[var(--color-neutral-8)]">
            <icon-clock-circle />{{ item.createdStr }}
          </div>
        </div>
      </div>
    </div>
  </a-scrollbar>
</template>
