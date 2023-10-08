import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ButtonProps = ComponentPropsWithoutRef<'button'>

// For most browsers the default type of button is submit, but we rarely need this

const Button = ({
  children,
  className,
  type = 'button',
  ...rest
}: ButtonProps) => {
  return (
    <button
      className={cn(
        'p-2  border-2 border-black cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed disabled:hover:bg-gray-200',
        className
      )}
      type={type}
      {...rest}
    >
      {children}
    </button>
  )
}

export default Button
