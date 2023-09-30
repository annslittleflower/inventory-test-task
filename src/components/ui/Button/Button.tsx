import { ComponentPropsWithoutRef } from 'react'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({ children, ...rest }: ButtonProps) => {
  return <button {...rest}>{children}</button>
}

export default Button
