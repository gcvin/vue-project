<template>
  <el-input v-bind="attrs" class="my-input" :prefix-icon="hashiqi">
    <template v-for="slot in slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
    <template v-slot=""></template>
  </el-input>
</template>

<script lang="ts" setup>
import { useAttrs, useSlots } from 'vue'
import { ElInput } from 'element-plus'
import hashiqi from '@/assets/svgs/hashiqi.svg?component'

const attrs = useAttrs()
const slots = useSlots()
</script>

<style scoped lang="scss">
.my-input {
  --el-input-border-radius: 10px;
}
</style>
