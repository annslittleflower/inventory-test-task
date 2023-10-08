import { ComponentPropsWithRef, useRef, useState } from 'react'

export type DialogProps = ComponentPropsWithRef<'dialog'>

export const useDialog = () => {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [isOpened, setIsOpened] = useState<boolean>(false)

  const showDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.showModal()
      setIsOpened(true)
    }
  }

  const closeDialog = () => {
    if (dialogRef.current) {
      dialogRef.current.close()
      setIsOpened(false)
    }
  }

  const DialogComp = ({ children, ...rest }: DialogProps) => {
    // has interesting bug, if change input text - dialog hides
    // probably related to rerender
    // but `open` prop fixes this unwanted behavior
    // also without `open` prop dialog has backdrop element
    return (
      <dialog
        open={isOpened}
        ref={dialogRef}
        className='fixed inset-y-1/2'
        {...rest}
      >
        {children}
      </dialog>
    )
  }

  return {
    showDialog,
    closeDialog,
    Dialog: DialogComp,
  }
}
