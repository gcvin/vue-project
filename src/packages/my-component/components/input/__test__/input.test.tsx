import { describe, it, expect, beforeEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import Input from '../Input.vue'

describe('Input', () => {
  let wrapper: VueWrapper

  beforeEach(() => {
    wrapper = mount(Input, {
      props: {
        size: 'mini',
        modelValue: 'My Component',
      },
    })
  })

  it('props correctly', () => {
    expect(wrapper.find<HTMLInputElement>('.el-input--small .el-input__inner').element.value).toBe(
      'My Component',
    )
  })
})
