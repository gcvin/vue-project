import { configProviderProps } from 'element-plus'
import { buildProps } from 'element-plus/es/utils/index'
import type { ExtractPropTypes } from 'vue'

export const myConfigProviderProps = buildProps({
  ...configProviderProps,
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

export type MyConfigProviderProps = ExtractPropTypes<typeof myConfigProviderProps>
