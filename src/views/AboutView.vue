<template>
  <div class="about">
    <h1>This is about page</h1>
    <el-button @click="router.push('/about?a=' + new Date().getTime())">Click me</el-button>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
