<template>
  <el-input
    ref="inputRef"
    v-bind="props"
    :class="cls"
    :size="size === 'mini' ? 'small' : size"
    :prefix-icon="hashiqi"
    @input="onInput"
  >
    <template v-for="(_, slot) in slots" :key="slot" v-slot:[slot]="scope">
      <slot :name="slot" v-bind="scope" />
    </template>
  </el-input>
</template>

<script lang="ts" setup>
import { computed, ref, useSlots, type Ref } from 'vue'
import { ElInput, useGlobalConfig } from 'element-plus'
import { debounce } from 'lodash-es'
import { myInputEmits, myInputProps } from './props'
import hashiqi from '@/packages/my-component/assets/svgs/hashiqi.svg?component'
import type { MyConfigProviderProps } from '../config-provider/props'

const slots = useSlots()
const config: Ref<MyConfigProviderProps> = useGlobalConfig()
const cls = `${config.value.namespace?.replace(/el$/, 'my') || 'my'}-input`
const size = computed(() => props.size || config.value.mySize)

type Input = InstanceType<typeof ElInput>

const inputRef = ref<Input | null>(null)
const expose: Pick<Input, 'focus' | 'blur' | 'select' | 'clear'> = {
  focus: () => inputRef.value?.focus(),
  blur: () => inputRef.value?.blur(),
  select: () => inputRef.value?.select(),
  clear: () => inputRef.value?.clear(),
}

const props = defineProps(myInputProps)

const emit = defineEmits(myInputEmits)

defineExpose(expose)

defineOptions({
  name: 'MyInput',
})

const onInput = debounce((value: string) => emit('input', Number.parseInt(value)), 300)
</script>

<style scoped lang="scss">
@font-face {
  font-family: 'mplus';
  src: url('@/packages/my-component/assets/fonts/rounded-mplus-1mn-regular.ttf') format('truetype');
}

.my-input {
  --el-input-border-radius: 10px;
  font-family: mplus;
}

.my-input :deep(.el-input__inner) {
  font-family: inherit;
}
</style>
