<template>
  <el-input
    ref="inputRef"
    v-bind="restProps"
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
import { computed, onMounted, onUnmounted, useSlots, ref, type Ref } from 'vue'
import { ElInput, useGlobalConfig, type ConfigProviderProps } from 'element-plus'
import { debounce, omit } from 'lodash-es'
import { myInputEmits, myInputProps } from './props'
import hashiqi from '@/packages/my-component/assets/svgs/hashiqi.svg?component'
import mplusFont from '@/packages/my-component/assets/fonts/rounded-mplus-1mn-regular.ttf?url&no-inline'
import type { MyConfigProviderProps } from '../config-provider/props'

let fontStyleEl: HTMLStyleElement | null = null
onMounted(() => {
  if (mplusFont && !document.querySelector('style[data-mplus-font]')) {
    fontStyleEl = document.createElement('style')
    fontStyleEl.dataset.mplusFont = ''
    fontStyleEl.textContent = `@font-face{font-family:'mplus';src:url("${mplusFont}") format("truetype")}`
    document.head.appendChild(fontStyleEl)
  }
})
onUnmounted(() => {
  fontStyleEl?.remove()
  fontStyleEl = null
})

const slots = useSlots()
type MyGlobalConfig = Partial<ConfigProviderProps> & { mySize?: MyConfigProviderProps['mySize'] }
const config = useGlobalConfig() as Ref<MyGlobalConfig>
const cls = `${config.value?.namespace?.replace(/el$/, 'my') || 'my'}-input`
const size = computed(() => props.size || config.value?.mySize)

type Input = InstanceType<typeof ElInput>

const inputRef = ref<Input | null>(null)
const exposeKeys = [
  'focus',
  'blur',
  'select',
  'clear',
  'resizeTextarea',
  'input',
  'ref',
  'textarea',
  'textareaStyle',
  'isComposing',
] as const
const expose = {} as {
  [K in (typeof exposeKeys)[number]]: Input[K]
}
exposeKeys.forEach((key) =>
  Object.defineProperty(expose, key, {
    get: () => inputRef.value?.[key],
    set: (val) => inputRef.value && (inputRef.value[key] = val),
  }),
)

const props = defineProps(myInputProps)

const restProps = computed(() => {
  return omit(props, ['onInput'])
})

const emit = defineEmits(myInputEmits)

defineExpose(expose)

defineOptions({
  name: 'MyInput',
})

const onInput = debounce((value: string) => emit('input', Number.parseInt(value)), 300)
</script>

<style scoped lang="scss">
.my-input {
  --el-input-border-radius: 10px;
  font-family: mplus;
}

.my-input :deep(.el-input__inner) {
  font-family: inherit;
}
</style>
