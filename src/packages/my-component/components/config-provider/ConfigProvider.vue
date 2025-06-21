<template>
  <slot :config="config"></slot>
</template>

<script lang="ts" setup>
import { provideGlobalConfig } from 'element-plus'
import { myConfigProviderProps } from './props'

const props = defineProps(myConfigProviderProps)
const config = provideGlobalConfig(props)
</script>

<style scoped>
/* Add any specific styles for your config provider here */
</style>
