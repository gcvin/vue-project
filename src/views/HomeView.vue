<template>
  <div class="home">
    <h1>This is home page</h1>
    <el-button @click="router.push('/?a=' + new Date().getTime())">Click me</el-button>
  </div>
</template>

<script setup lang="ts">
import { onActivated, onDeactivated, onMounted, watch, type WatchHandle } from 'vue'
import { stringifyQuery, useRoute, useRouter } from 'vue-router'
const router = useRouter()
const route = useRoute()
let unwatch: WatchHandle | null = null

onMounted(() => {
  // console.log('HomeView mounted')
})

onActivated(() => {
  // console.log('HomeView activated')
  const curPath = route.path
  unwatch = watch(
    () => stringifyQuery(route.query),
    (newQuery) => {
      if (route.path !== curPath) return
      console.log('Query changed:', newQuery)
    },
  )
})

onDeactivated(() => {
  // console.log('HomeView deactivated')
  unwatch?.()
})
</script>

<style scoped>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
