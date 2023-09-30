import { useState, useEffect } from 'react'
import useProducts, { Product } from './query'

import { Button, Input, useDialog } from '@/components/ui'

import { cn, getRandomInt } from '@/lib/utils'

type BasketProducts = {
  [key: Product['id']]: number
}

const Inventory = () => {
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

  const productsInBasket = products.filter((p) => basketProducts[p.id])

  const totalCount = Object.values(basketProducts).reduce(
    (acc, v) => acc + v,
    0
  )

  if (isError) return <div>please try again later</div>

  if (isLoading) return <div>loading...</div>

  return (
    <div className='py-6'>
      <div className='flex min-w-full md:flex-row flex-col'>
        <div className='border-4 flex  flex-col md:flex-[0_0_50%] mb-8 md:mb-0 md:border-r-0'>
          <div className='flex justify-between items-center border-b-2 p-4'>
            Inventory
            <div>
              <Button
                className='p-2 mr-3 border-2 border-black cursor-pointer hover:bg-pink-600'
                onClick={showDialog}
              >
                new
              </Button>
              <Button
                onClick={() => addProductsToBasket()}
                disabled={!selectedProducts.length}
                className='p-2 border-2 border-black cursor-pointer hover:bg-pink-600 disabled:opacity-75 disabled:cursor-not-allowed'
              >
                add
              </Button>
            </div>
          </div>
          {products.map((p) => {
            return (
              <div
                key={p.id}
                data-testid='product'
                onClick={() => setSelectedProducts((prev) => [p, ...prev])}
                className={cn(
                  'p-4 border-b-2 last:border-b-0 hover:bg-gray-200 cursor-pointer',
                  {
                    'bg-gray-200': selectedProducts.find(
                      (pr) => pr.id === p.id
                    ),
                  }
                )}
              >
                {p.title}
              </div>
            )
          })}
        </div>
        <div className='border-4 flex flex-col md:flex-[0_0_50%]'>
          <div className='flex justify-between items-center border-b-2 p-4'>
            basket
            <Button
              className='p-2 border-2 border-black cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:bg-pink-600'
              disabled={!selectedBasketKeys.length}
              onClick={() => deleteProductsFromBasket()}
            >
              remove
            </Button>
          </div>
          {productsInBasket.map((p) => {
            return (
              <div
                key={p.id}
                data-testid='basket-product'
                onClick={() => {
                  setSelectedBasketKeys((prev) =>
                    prev.includes(p.id)
                      ? prev.filter((el) => el !== p.id)
                      : [...prev, p.id]
                  )
                }}
                className={cn(
                  'p-4 border-b-2 last:border-b-0 hover:bg-gray-200 cursor-pointer',
                  {
                    'bg-gray-200': selectedBasketKeys.find((k) => k === p.id),
                  }
                )}
              >
                {p.title}
              </div>
            )
          })}
        </div>
      </div>
      <div
        data-testid='total'
        className='border-4 mt-8 md:mt-0 md:border-t-0 p-4 text-right'
      >
        Total: {totalCount}
      </div>
      <Dialog>
        <div className='border-4 border-black p-2'>
          <h3>Add new product</h3>
          <Input
            value={newProduct}
            autoFocus
            onChange={(e) => {
              e.preventDefault()
              setNewProduct(e.target.value)
            }}
            className='p-2 my-2 border-2 border-black'
          />
          <div className='text-right'>
            <Button
              className='p-2 border-2 mr-3 border-black cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:bg-pink-600'
              onClick={() => {
                setNewProduct('')
                closeDialog()
              }}
            >
              close
            </Button>
            <Button
              disabled={!newProduct}
              className='p-2 border-2 border-black cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed hover:bg-pink-600'
              onClick={() => {
                setProducts((prev) => [
                  { id: getRandomInt(), title: newProduct },
                  ...prev,
                ])
                setNewProduct('')
                closeDialog()
              }}
            >
              save
            </Button>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Inventory
