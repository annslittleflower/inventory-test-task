import { ComponentPropsWithoutRef } from 'react'

import styles from './RangeInput.module.css'

type RangeInputProps = ComponentPropsWithoutRef<'input'> & {
  onValueChange: (value: number) => void
}

const RangeInput = ({
  min = 10, // lets do at least 10 characters by default
  onValueChange,
  ...rest
}: RangeInputProps) => {
  return (
    <input
      type='range'
      className={styles.rangeInput}
      onChange={(e) => onValueChange(+e.target.value)}
      min={min}
      {...rest}
    />
  )
}

export default RangeInput
