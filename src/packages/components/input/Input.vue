<template>
  <el-input ref="inputRef" v-bind="attrs" class="my-input" :prefix-icon="hashiqi" @input="onInput">
    <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { ref, useAttrs, useSlots } from 'vue'
import { ElInput } from 'element-plus'
import { debounce } from 'lodash-es'
import hashiqi from '@/packages/assets/svgs/hashiqi.svg?component'

const attrs = useAttrs()
const slots = useSlots()

type Input = InstanceType<typeof ElInput>

const inputRef = ref<Input | null>(null)
const expose: Pick<Input, 'focus' | 'blur' | 'select' | 'clear'> = {
  focus: () => {
    inputRef.value?.focus()
  },
  blur: () => {
    inputRef.value?.blur()
  },
  select: () => {
    inputRef.value?.select()
  },
  clear: () => {
    inputRef.value?.clear()
  },
}

const emits = defineEmits(['input'])

defineExpose(expose)

defineOptions({
  name: 'MyInput',
})

const onInput = debounce((value: string) => emits('input', value), 300)
</script>

<style scoped lang="scss">
.my-input {
  --el-input-border-radius: 10px;
}
</style>
