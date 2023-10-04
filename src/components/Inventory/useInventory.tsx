import { useState, useEffect } from 'react'
import useProducts, { Product } from './query'
import { getRandomInt } from '@/lib/utils'
import { useDialog } from '@/components/ui'

type BasketProducts = {
  [key: Product['id']]: number
}

const useInventory = () => {
  const { isError, isLoading, products: productsFromQuery } = useProducts()

  const [products, setProducts] = useState<Product[]>([])
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([])

  const [basketProducts, setBasketProducts] = useState<BasketProducts>({})
  const [selectedBasketKeys, setSelectedBasketKeys] = useState<Product['id'][]>(
    []
  )

  const [newProduct, setNewProduct] = useState('')

  const { showDialog, closeDialog, Dialog } = useDialog()

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

  const deleteProductsFromBasket = () => {
    const tempBP = { ...basketProducts }

    selectedBasketKeys.forEach((i) => delete tempBP[i])
    setBasketProducts(tempBP)
    setSelectedBasketKeys([])
  }

  const toggleSelectedProduct = (product: Product) => {
    setSelectedProducts((prev) =>
      prev.find((p) => p.id === product.id)
        ? prev.filter((p) => p.id !== product.id)
        : [product, ...prev]
    )
  }

  const toggleBasket = (product: Product) => {
    setSelectedBasketKeys((prev) =>
      prev.includes(product.id)
        ? prev.filter((el) => el !== product.id)
        : [...prev, product.id]
    )
  }

  const addNewProduct = () => {
    setProducts((prev) => [{ id: getRandomInt(), title: newProduct }, ...prev])
    setNewProduct('')
    closeDialog()
  }

  const cancelDialog = () => {
    setNewProduct('')
    closeDialog()
  }

  const productsInBasket = products.filter((p) => basketProducts[p.id])

  const totalCount = Object.values(basketProducts).reduce(
    (acc, v) => acc + v,
    0
  )

  const isProductSelected = (p: Product) =>
    !!selectedProducts.find((k) => k.id === p.id)

  const isRemoveButtonDisabled = !selectedBasketKeys.length

  const isAddButtonDisabled = !selectedProducts.length

  const isBasketItemSelected = (p: Product) =>
    !!selectedBasketKeys.find((k) => k === p.id)

  return {
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
  }
}

export default useInventory
