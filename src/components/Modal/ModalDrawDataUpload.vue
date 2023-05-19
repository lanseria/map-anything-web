<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs'

const filterMapDrawFeatures = computed(() => {
  return storeMapDrawFeatures.value.filter(item => item.properties?.sessionId === globalSessionId.value && item.properties?.videoId === globalVideoId.value)
})
const { copy, copied, isSupported } = useClipboard()
function handleOk() {
  const mapData = MAP_DATA_LIST.find(item => item.value === globalMapDataValue.value)
  const sessionIdx = globalAllSessions.value!.findIndex(item => item.id === globalSessionId.value)
  const sessionName = globalAllSessions.value![sessionIdx].title
  const videoIdx = globalAllSessions.value![sessionIdx].videoList.findIndex(item => item.aid === globalVideoId.value)
  const videoName = globalAllSessions.value![sessionIdx].videoList[videoIdx].title
  const title = `[${dayjs().format('YYYY-MM-DD HH:mm:ss')}][${sessionName}]${videoName}`
  useFetch('https://s8zygv.laf.run/sendEmail', {
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify({
      subject: title,
      milestone: sessionName,
      text: filterMapDrawFeatures.value,
      issue: mapData!.issue,
    }),
  }).post().json()
  Message.success('发送成功')
}
function handleCancel() {
  globalModalDrawDataUploadVisible.value = false
}
</script>

<template>
  <a-modal :visible="globalModalDrawDataUploadVisible" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      提示
    </template>
    <div>
      <div class="flex justify-between items-center mb-10px">
        <div>
          确定提交此数据嘛？
        </div>
        <AButton v-if="isSupported" @click="copy(JSON.stringify(filterMapDrawFeatures, null, 2))">
          <!-- by default, `copied` will be reset in 1.5s -->
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </AButton>
        <AButton v-else>
          Your browser does not support Clipboard API
        </AButton>
      </div>
      <pre class="overflow-auto h-400px">{{ JSON.stringify(filterMapDrawFeatures, null, 2) }}
      </pre>
    </div>
  </a-modal>
</template>
