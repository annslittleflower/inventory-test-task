import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ComponentPropsWithoutRef<'button'>

const Button = ({ children, className, ...rest }: ButtonProps) => {
  return (
    <button
      className={cn(
        'p-2  border-2 border-black cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-gray-200',
        className
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
