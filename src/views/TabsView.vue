<template>
  <div class="tabs-wrapper">
    <baimao />
    <heimao />
    <ElTabs v-model="tab" :before-leave="onBeforeLeave" @tab-change="onTabChange">
      <ElTabPane v-for="n in 12" :key="n" :label="`Tab ${n}`" :name="n - 1">
        <div>Content of Tab {{ n }}</div>
      </ElTabPane>
    </ElTabs>
    <ElForm ref="formRef" :model="form[tab]">
      <ElFormItem
        v-for="(item, index) in form[tab]?.input"
        :key="index"
        :prop="`input.${index}.name`"
        required
      >
        <MyInput
          ref="inputRef"
          v-model="item.name"
          placeholder="Enter your name"
          @input="(val: number) => console.log(val)"
          @change="(val: string) => console.log(val)"
        >
          <template #prepend>
            <span>Prefix</span>
          </template>
          <template #append>
            <span>Suffix</span>
          </template>
        </MyInput>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue'
import { ElForm } from 'element-plus'
import { MyInput } from '@gcvin/my-component'
import baimao from '@/assets/svgs/baimao.svg?component'
import heimao from '@/assets/svgs/heimao.svg?component'

const tab = ref(0)
const form = ref(Array.from({ length: 12 }, () => ({ input: [{ name: '' }, { name: '' }] })))
const inputRef = ref<InstanceType<typeof MyInput>[]>([])
const formRef = ref<InstanceType<typeof ElForm> | null>(null)

const onBeforeLeave = async () => {
  return await formRef.value?.validate()
}

const onTabChange = async () => {
  await nextTick()
  await nextTick()
  formRef.value?.clearValidate()
}

onMounted(() => {
  console.log(inputRef.value?.[0]?.isComposing)
})
</script>

<style scoped>
:deep(.el-tabs__nav-next),
:deep(.el-tabs__nav-prev) {
  opacity: 0;
}

.tabs-wrapper {
  width: 400px;
  position: relative;

  svg {
    width: 20px;
    height: 40px;
    position: absolute;
    top: 0;
    display: none;
  }

  svg:nth-of-type(1):has(~ .el-tabs .el-tabs__nav-prev),
  svg:nth-of-type(2):has(~ .el-tabs .el-tabs__nav-next) {
    display: block;
  }

  svg:nth-of-type(1):has(~ .el-tabs .el-tabs__nav-prev.is-disabled),
  svg:nth-of-type(2):has(~ .el-tabs .el-tabs__nav-next.is-disabled) {
    cursor: not-allowed;
    z-index: 1;
  }

  svg:nth-of-type(1) {
    left: 0;
  }

  svg:nth-of-type(2) {
    right: 0;
  }
}
</style>
