import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = ComponentPropsWithoutRef<'input'>

const Input = ({ className, ...rest }: InputProps) => {
  return (
    <input
      className={cn('p-2 my-2 border-2 border-black', className)}
      {...rest}
    />
  )
}

export default Input
