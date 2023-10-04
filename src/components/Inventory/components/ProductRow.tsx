import { ReactNode, ComponentPropsWithoutRef } from 'react'
import { cn } from '@/lib/utils'

type ProductRowProps = ComponentPropsWithoutRef<'div'> & {
  children: ReactNode
  isSelected: boolean
  onClick: () => void
}

const ProductRow = ({
  children,
  isSelected,
  onClick,
  ...rest
}: ProductRowProps) => {
  return (
    <div
      className={cn(
        'p-4 border-b-2 last:border-b-0 hover:bg-gray-200 cursor-pointer',
        {
          'bg-gray-200': isSelected,
        }
      )}
      onClick={onClick}
      {...rest}
    >
      {children}
    </div>
  )
}

export default ProductRow
