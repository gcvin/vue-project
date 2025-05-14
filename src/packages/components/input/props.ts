import { inputEmits, inputProps } from 'element-plus'
import { buildProp, isNumber } from 'element-plus/es/utils/index'
import { upperFirst } from 'lodash-es'

const customInputEmits = {
  input: (value: number) => isNumber(value),
}

const customInputProps = {
  size: buildProp({
    type: String,
    values: ['', 'default', 'small', 'large', 'mini'],
    required: false,
  } as const),
}

const emitsToProps = Object.keys(inputEmits).reduce(
  (acc, key) => {
    if (key in customInputEmits) return acc
    acc['on' + upperFirst(key)] = {
      type: Function,
      required: false,
    }
    return acc
  },
  {} as Record<string, unknown>,
)

export const myInputEmits = {
  ...inputEmits,
  ...customInputEmits,
}

export const myInputProps = {
  ...inputProps,
  ...emitsToProps,
  ...customInputProps,
}
