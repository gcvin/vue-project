import { inputEmits, inputProps } from 'element-plus'
import { buildProp, isNumber } from 'element-plus/es/utils/index'
import { upperFirst } from 'lodash-es'

const emitsToProps = Object.keys(inputEmits).reduce(
  (acc, key) => {
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
  input: (value: number) => isNumber(value),
}

export const myInputProps = {
  ...inputProps,
  ...emitsToProps,
  size: buildProp({
    type: String,
    values: ['', 'default', 'small', 'large', 'mini'],
    required: false,
  } as const),
}
