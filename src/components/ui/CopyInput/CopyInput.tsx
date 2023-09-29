import { ComponentPropsWithoutRef } from 'react'

import styles from './CopyInput.module.css'

import imgUrl from '/images/copyIcon.svg'

type CopyInputProps = ComponentPropsWithoutRef<'input'> & {
  value: string
}

const CopyInput = ({ value, onChange = () => {}, ...rest }: CopyInputProps) => {
  const copyToClipboard = () => {
    if (!value) return null
    navigator.clipboard.writeText(value)
  }

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.copyInput}
        value={value}
        onChange={onChange}
        {...rest}
      />
      {value ? (
        <img
          src={imgUrl}
          className={styles.copyIcon}
          onClick={copyToClipboard}
          title='copy'
        />
      ) : null}
    </div>
  )
}

export default CopyInput
