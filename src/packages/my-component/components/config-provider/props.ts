import { configProviderProps } from 'element-plus'
import { buildProps } from 'element-plus/es/utils/index'
import type { ExtractPropTypes } from 'vue'

export const myConfigProviderProps = buildProps({
  ...configProviderProps,
  mySize: {
    type: String,
    values: ['', 'default', 'small', 'large', 'mini'],
  },
} as const)

export type MyConfigProviderProps = ExtractPropTypes<typeof myConfigProviderProps>
