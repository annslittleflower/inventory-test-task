import { ComponentPropsWithoutRef } from 'react'

type HeaderProps = ComponentPropsWithoutRef<'div'>

const Header = ({ children }: HeaderProps) => {
  return (
    <div className='flex justify-between items-center border-b-2 p-4'>
      {children}
    </div>
  )
}

export default Header
