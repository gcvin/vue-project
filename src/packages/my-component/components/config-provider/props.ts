import { configProviderProps } from 'element-plus'
import { buildProps } from 'element-plus/es/utils/index'
import type { ExtractPropTypes } from 'vue'

const customConfigProviderProps = buildProps({
  mySize: {
    type: String,
    values: ['', 'default', 'small', 'large', 'mini'],
  },
  a11y: {
    type: Boolean,
  },
  namespace: {
    type: String,
  },
  keyboardNavigation: {
    type: Boolean,
  },
} as const)

export const myConfigProviderProps = {
  ...configProviderProps,
  ...customConfigProviderProps,
}

export type MyConfigProviderProps = ExtractPropTypes<typeof myConfigProviderProps>
