import { Button, Input } from '@/components/ui'

import ProductRow from './components/ProductRow'
import useInventory from './useInventory'

const Inventory = () => {
  const {
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
    products,
    setNewProduct,
    newProduct,
    isProductSelected,
    isRemoveButtonDisabled,
    isAddButtonDisabled,
    isBasketItemSelected,
  } = useInventory()

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
                className=' mr-3 hover:bg-pink-600'
                onClick={showDialog}
              >
                new
              </Button>
              <Button
                onClick={addProductsToBasket}
                disabled={isAddButtonDisabled}
                className=' hover:bg-pink-600 '
              >
                add
              </Button>
            </div>
          </div>
          {products.map((p) => (
            <ProductRow
              key={p.id}
              data-testid='product'
              onClick={() => toggleSelectedProduct(p)}
              isSelected={isProductSelected(p)}
            >
              {p.title}
            </ProductRow>
          ))}
        </div>
        <div className='border-4 flex flex-col md:flex-[0_0_50%]'>
          <div className='flex justify-between items-center border-b-2 p-4'>
            basket
            <Button
              className=' hover:bg-pink-600'
              disabled={isRemoveButtonDisabled}
              onClick={deleteProductsFromBasket}
            >
              remove
            </Button>
          </div>
          {productsInBasket.map((p) => (
            <ProductRow
              key={p.id}
              data-testid='basket-product'
              onClick={() => toggleBasket(p)}
              isSelected={isBasketItemSelected(p)}
            >
              {p.title}
            </ProductRow>
          ))}
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
              setNewProduct(e.target.value)
            }}
          />
          <div className='text-right'>
            <Button
              className='mr-3 hover:bg-gray-200'
              onClick={cancelDialog}
            >
              close
            </Button>
            <Button
              disabled={!newProduct}
              className='hover:bg-pink-600'
              onClick={addNewProduct}
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
