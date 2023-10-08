import {
  useContext,
  createContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react'
import useProducts, { Product } from './query'
import { getRandomInt } from '@/lib/utils'
import { Dialog as DialogComp } from '@/components/ui'

type BasketProducts = {
  [key: Product['id']]: number
}

type InventoryContextType = {
  isError: boolean
  isLoading: boolean
  showDialog: () => void
  Dialog: (props: DialogComp.DialogProps) => JSX.Element

  addProductsToBasket: () => void
  toggleSelectedProduct: (product: Product) => void
  addNewProduct: () => void
  cancelDialog: () => void
  totalCount: number
  products: Product[]
  selectedProducts: Product[]
  setNewProduct: React.Dispatch<React.SetStateAction<string>>
  newProduct: string
  isProductSelected: (p: Product) => boolean
  isAddButtonDisabled: boolean
  deleteProductsFromBasket: () => void
  toggleBasket: (product: Product) => void
  productsInBasket: Product[]
  isRemoveButtonDisabled: boolean
  isBasketItemSelected: (p: Product) => boolean
  selectedBasketKeys: Product['id'][]
}

export const InventoryContext = createContext<InventoryContextType | null>(null)

const InventoryContextProvider = ({ children }: { children: ReactNode }) => {
  const { isError, isLoading, products: productsFromQuery } = useProducts()

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const [basketProducts, setBasketProducts] = useState<BasketProducts>({})
  const [selectedBasketKeys, setSelectedBasketKeys] = useState<Product['id'][]>(
    []
  )

  const [newProduct, setNewProduct] = useState('')

  const { showDialog, closeDialog, Dialog } = DialogComp.useDialog()

  useEffect(() => {
    if (productsFromQuery.length) {
      setProducts(productsFromQuery)
    }
  }, [productsFromQuery])

  const addProductsToBasket = () => {
    const tempBP = { ...basketProducts }
    selectedProducts.forEach((i) =>
      tempBP[i.id] ? (tempBP[i.id] += 1) : (tempBP[i.id] = 1)
    )

    setBasketProducts(tempBP)
    setSelectedProducts([])
  }

  const deleteProductsFromBasket = useCallback(() => {
    const tempBP = { ...basketProducts }

    selectedBasketKeys.forEach((i) => delete tempBP[i])
    setBasketProducts(tempBP)
    setSelectedBasketKeys([])
  }, [basketProducts, selectedBasketKeys])

  const toggleSelectedProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [product, ...prev]
    )
  }

  const toggleBasket = useCallback((product: Product) => {
    setSelectedBasketKeys((prev) =>
      prev.includes(product.id)
        ? prev.filter((el) => el !== product.id)
        : [...prev, product.id]
    )
  }, [])

  const addNewProduct = () => {
    setProducts((prev) => [{ id: getRandomInt(), title: newProduct }, ...prev])
    setNewProduct('')
    closeDialog()
  }

  const cancelDialog = () => {
    setNewProduct('')
    closeDialog()
  }

  const productsInBasket = useMemo(
    () => products.filter((p) => basketProducts[p.id]),
    [products, basketProducts]
  )

  const totalCount = Object.values(basketProducts).reduce(
    (acc, v) => acc + v,
    0
  )

  const isProductSelected = (p: Product) =>
    !!selectedProducts.find((k) => k.id === p.id)

  const isRemoveButtonDisabled = !selectedBasketKeys.length

  const isAddButtonDisabled = !selectedProducts.length

  const isBasketItemSelected = useCallback(
    (p: Product) => !!selectedBasketKeys.find((k) => k === p.id),
    [selectedBasketKeys]
  )

  return (
    <InventoryContext.Provider
      value={{
        isError,
        isLoading,
        showDialog,
        Dialog,
        addProductsToBasket,
        deleteProductsFromBasket,
        toggleSelectedProduct,
        toggleBasket,
        addNewProduct,
        cancelDialog,
        productsInBasket,
        totalCount,
        selectedProducts,
        selectedBasketKeys,
        products,
        newProduct,
        setNewProduct,
        isProductSelected,
        isRemoveButtonDisabled,
        isAddButtonDisabled,
        isBasketItemSelected,
      }}
    >
      {children}
    </InventoryContext.Provider>
  )
}

export const useInventoryContext = () => {
  const context = useContext(InventoryContext)

  if (!context) {
    throw new Error('Context must be inside a provider')
  }

  return context
}

export default InventoryContextProvider
