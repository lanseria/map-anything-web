import { Message, Modal } from '@arco-design/web-vue'
import dayjs from 'dayjs'

export function handleSendIssueUseEmail() {
  const mapData = MAP_DATA_LIST.find(item => item.value === globalMapDataValue.value)
  const filterMapDrawFeatures = storeMapDrawFeatures.value.filter(item => item.properties?.sessionId === globalSessionId.value && item.properties?.videoId === globalVideoId.value)
  if (!mapData) {
    Message.warning('未选择数据,无法发送邮件')
    return
  }
  if (globalAllSessions.value) {
    if (!globalSessionId.value) {
      Message.warning('未选择路线,无法发送邮件')
      return
    }
    if (globalVideoId.value === -1) {
      Message.warning('未选择视频,无法发送邮件')
      return
    }
    if (filterMapDrawFeatures.length === 0) {
      Message.warning('未画图(当前路线),无法发送邮件')
      return
    }
    Modal.info({
      title: '提示',
      width: '800px',
      content: () => h('div', { class: 'overflow-auto h-500px' }, [
        h('dev', '确定提交此数据嘛？'),
        h('pre', JSON.stringify(filterMapDrawFeatures, null, 2)),
      ]),
      onOk() {
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
            text: filterMapDrawFeatures,
            issue: mapData.issue,
          }),
        }).post().json()
        Message.success('发送成功')
      },
    })
  }
}
