<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { MyConfigProvider } from '@gcvin/my-component'
import TabsView from '@/views/TabsView.vue'
import FabricView from '@/views/FabricView.vue'
import baimao from '@/assets/svgs/baimao.svg?component'
import '@gcvin/my-component/es/web-comp'

const isDark = useDark()
const toggleDark = useToggle(isDark)
</script>

<template>
  <MyConfigProvider my-size="mini">
    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
        <RouterLink to="/app-vue2">App Vue2</RouterLink>
        <RouterLink to="/app-vue3/">App Vue3</RouterLink>
        <RouterLink to="/app-vite3/">App Vite3</RouterLink>
      </nav>
      <my-switch :model-value="isDark" @change="(e: CustomEvent) => toggleDark(e.detail.checked)">
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <span slot="left">关</span>
        <!-- eslint-disable-next-line vue/no-deprecated-slot-attribute -->
        <span slot="right">开</span>
      </my-switch>
      <ElButton type="primary" :icon="baimao">Get Started</ElButton>
      <TabsView />
      <FabricView />
    </div>

    <RouterView />
    <div id="app-vue2"></div>
    <div id="app-vue3"></div>
    <div id="app-vite3"></div>
  </MyConfigProvider>
</template>

<style scoped>
nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}
</style>
