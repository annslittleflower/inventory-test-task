import { ComponentPropsWithoutRef } from 'react'

type InputProps = ComponentPropsWithoutRef<'input'>

const Input = ({ ...rest }: InputProps) => {
  return <input {...rest} />
}

export default Input
