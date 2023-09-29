import { ComponentPropsWithoutRef, useId } from 'react'

import styles from './Checkbox.module.css'

type CheckboxProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  name: string
  onValueChange(name: string, value: boolean): void
}

const Checkbox = ({
  label,
  name,
  checked,
  onValueChange,
  ...rest
}: CheckboxProps) => {
  const id = useId()
  return (
    <div className={styles.inputWrapper}>
      <input
        type='checkbox'
        id={id}
        name={name}
        className={styles.checkbox}
        checked={checked}
        onChange={(e) => onValueChange(name, e.target.checked)}
        {...rest}
      />
      <label
        className={styles.label}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  )
}

export default Checkbox
