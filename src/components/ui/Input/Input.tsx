import { ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type InputProps = ComponentPropsWithoutRef<'input'> & {
  allowEnterSubmit?: boolean
}

const Input = ({
  className,
  allowEnterSubmit = false,
  ...rest
}: InputProps) => {
  return (
    <input
      className={cn('p-2 my-2 border-2 border-black', className)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' && !allowEnterSubmit) {
          // Keeps form from submitting on hitting enter in text input
          e.preventDefault()
        }
      }}
      {...rest}
    />
  )
}

export default Input
