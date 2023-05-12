<script setup lang="ts">
import { Message } from '@arco-design/web-vue'
import dayjs from 'dayjs'

const tabCollapse = ref(false)
const activeKey = ref('1')
function onTabCollapse() {
  tabCollapse.value = !tabCollapse.value
  nextTick(() => {
    window.map.resize()
  })
}
function handleSendIssueUseEmail() {
  if (globalAllSessions.value) {
    if (!globalSessionId.value) {
      Message.warning('未选择路线,无法发送邮件')
      return
    }
    if (globalVideoId.value === -1) {
      Message.warning('未选择视频,无法发送邮件')
      return
    }
    if (storeMapDrawFeatures.value.length === 0) {
      Message.warning('未画图,无法发送邮件')
      return
    }
    const sessionIdx = globalAllSessions.value.findIndex(item => item.id === globalSessionId.value)
    const sessionName = globalAllSessions.value[sessionIdx].title
    const videoIdx = globalAllSessions.value[sessionIdx].videoList.findIndex(item => item.aid === globalVideoId.value)
    const videoName = globalAllSessions.value[sessionIdx].videoList[videoIdx].title
    const title = `[徐云][${sessionName}]${videoName}-${dayjs().format('YYYY-MM-DD HH:mm:ss')}`
    useFetch('https://s8zygv.laf.run/sendEmail', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({
        subject: title,
        milestone: sessionName,
        text: storeMapDrawFeatures.value,
      }),
    }).post().json()
  }
}
watchEffect(() => {
  if (activeKey.value === '2')
    handleMapDrawEdit()
  else
    handleMapExitDrawEdit()
})
</script>

<template>
  <a-tabs v-model:active-key="activeKey" type="card" size="large">
    <template #extra>
      <a-button type="text" @click="onTabCollapse">
        <template #icon>
          <icon-up v-if="!tabCollapse" />
          <icon-down v-else />
        </template>
        {{ tabCollapse ? '展开' : '收起' }}
      </a-button>
    </template>
    <a-tab-pane key="1" title="数据导入">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-geojson-file" />
            </template>
            默认数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载数据
            </a-doption>
            <a-doption>编辑数据</a-doption>
            <a-doption>重置数据</a-doption>
          </template>
        </a-dropdown>

        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-kml-file" />
            </template>
            KML数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载至本地
            </a-doption>
            <a-doption>
              加载至Studio
            </a-doption>
            <a-doption>
              KML转化Geojson
            </a-doption>
          </template>
        </a-dropdown>

        <a-dropdown>
          <TabPanelIconBtn class="mr-5" show-down>
            <template #icon>
              <div class="text-size-40px i-gis-shape-file" />
            </template>
            TIF数据
          </TabPanelIconBtn>

          <template #content>
            <a-doption>
              加载至Studio
            </a-doption>
          </template>
        </a-dropdown>

        <TabPanelIconBtn class="mr-5" @click="handleSendIssueUseEmail">
          <template #icon>
            <div class="text-size-40px i-carbon-mail-reply" />
          </template>
          发送邮件
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
    <a-tab-pane key="2" title="绘制/编辑">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_point')">
          <template #icon>
            <div class="text-size-40px i-gis-point" :class="{ 'bg-red': globalDrawMode === 'draw_point' }" />
          </template>
          点
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_line_string')">
          <template #icon>
            <div class="text-size-40px i-gis-polyline-pt" :class="{ 'bg-red': globalDrawMode === 'draw_line_string' }" />
          </template>
          线
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_polygon')">
          <template #icon>
            <div class="text-size-40px i-gis-polygon-pt" :class="{ 'bg-red': globalDrawMode === 'draw_polygon' }" />
          </template>
          面
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5" @click="handleSelectGlobalDrawMode('draw_radius')">
          <template #icon>
            <div class="text-size-40px i-gis-circle-o" :class="{ 'bg-red': globalDrawMode === 'draw_radius' }" />
          </template>
          圆
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
    <a-tab-pane key="3" title="帮助">
      <div v-show="!tabCollapse" class="mb-5 mx-5 flex">
        <TabPanelIconBtn class="mr-5">
          <template #icon>
            <div class="text-size-40px i-carbon-settings" />
          </template>
          设置
        </TabPanelIconBtn>

        <TabPanelIconBtn class="mr-5">
          <template #icon>
            <div class="text-size-40px i-carbon-rotate-360" />
          </template>
          刷新页面
        </TabPanelIconBtn>
        <TabPanelIconBtn class="mr-5" @click="() => toggleDark()">
          <template #icon>
            <div class="text-size-40px dark:i-carbon-moon i-carbon-sun" />
          </template>
          主题
        </TabPanelIconBtn>
        <TabPanelIconBtn class="mr-5">
          <template #icon>
            <div class="text-size-40px i-carbon-warning" />
          </template>
          关于
        </TabPanelIconBtn>
      </div>
    </a-tab-pane>
  </a-tabs>
</template>
