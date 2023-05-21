import { Message } from '@arco-design/web-vue'
import queryString from 'query-string'

export function handleComputeDistance() {
  //
  const pointList = globalComputedFilterMapFeatures.value.filter(item => item.geometry.type === 'Point')
  const lastPointId = pointList[0].id
  const lastIdx = globalGeojson.value?.features.findIndex(item => item.id === lastPointId)
  if (!lastIdx) {
    //
    console.warn('lastIdx', lastIdx)
    return
  }
  console.warn('lastIdx', lastIdx)
  console.warn('globalGeojson', globalGeojson.value?.features.length)
  const startPoint = globalGeojson.value?.features[lastIdx - 1]
  if (!startPoint) {
    console.warn('startPoint', startPoint)
    return
  }
  console.warn('startPoint', startPoint)
  const points = [startPoint, ...globalComputedFilterMapFeatures.value].filter(item => item.geometry.type === 'Point').map(item => item.geometry.coordinates.reverse().join())
  // console.log(points)
  const pointStrArr = points.map((item) => {
    return encodeURIComponent(item)
  })
  // console.log(pointStrArr)
  const query = queryString.stringify({
    point: pointStrArr,
  })
  const url = `https://graphhopper.com/maps/?${query}&profile=car&layer=OpenStreetMap`
  open(url)
}

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
    globalModalDrawDataUploadVisible.value = true
  }
}

export function handleMultipleMarker() {
  globalModalDataMultipleMarkerVisible.value = true
}
