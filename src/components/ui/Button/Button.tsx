import { ComponentPropsWithoutRef } from 'react'

import styles from './Button.module.css'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({ children, ...rest }: ButtonProps) => {
  return (
    <button
      className={styles.button}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
