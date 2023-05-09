<script lang="ts" setup>
const { isFetching, error, data } = useFetch('/xuyun-data/json/allSessions.json').get().json()
</script>
<template>
  <div v-for="item in data" :key="item.id">{{ item.title }}</div>
</template>
