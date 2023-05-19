<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs'
import Editor from '../Editor.vue'

const filterMapDataMultipleMarkerFeatures = ref('')
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
      text: filterMapDataMultipleMarkerFeatures.value,
      issue: mapData!.issue,
    }),
  }).post().json()
  Message.success('发送成功')
}
function handleCancel() {
  globalModalDataMultipleMarkerVisible.value = false
}
watchEffect(() => {
  if (globalModalDataMultipleMarkerVisible.value)
    filterMapDataMultipleMarkerFeatures.value = JSON.stringify(globalGeojsonFeatures.value.filter(item => item.properties.sessionId === globalSessionId.value && item.properties.videoId === globalVideoId.value), null, 2)
  else
    filterMapDataMultipleMarkerFeatures.value = ''
})
</script>

<template>
  <a-modal :visible="globalModalDataMultipleMarkerVisible" :width="600" @ok="handleOk" @cancel="handleCancel">
    <template #title>
      提示
    </template>
    <div>
      <div class="flex justify-between items-center mb-10px">
        <div>
          确定提交此数据嘛？
        </div>
        <AButton v-if="isSupported" @click="copy(filterMapDataMultipleMarkerFeatures)">
          <!-- by default, `copied` will be reset in 1.5s -->
          <span v-if="!copied">Copy</span>
          <span v-else>Copied!</span>
        </AButton>
        <AButton v-else>
          Your browser does not support Clipboard API
        </AButton>
      </div>
      <Editor v-model="filterMapDataMultipleMarkerFeatures" class="h-400px" />
      <!-- <pre class="overflow-auto h-400px">{{ JSON.stringify(filterMapDataMultipleMarkerFeatures, null, 2) }}
      </pre> -->
    </div>
  </a-modal>
</template>
