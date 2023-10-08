import { Button, Input } from '@/components/ui'
import { ProductRow, Header, Basket } from './components'
import { useInventoryContext } from './hooks/useInventoryContext'

const Inventory = () => {
  const {
    isError,
    isLoading,
    showDialog,
    Dialog,
    addProductsToBasket,
    toggleSelectedProduct,
    addNewProduct,
    cancelDialog,
    totalCount,
    products,
    setNewProduct,
    newProduct,
    isProductSelected,
    isAddButtonDisabled,
  } = useInventoryContext()

  if (isError) return <div>please try again later</div>

  if (isLoading) return <div>loading...</div>

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        console.log('submitting')
      }}
    >
      <div className='py-6'>
        <div className='flex min-w-full md:flex-row flex-col'>
          <div className='border-4 flex  flex-col md:flex-[0_0_50%] mb-8 md:mb-0 md:border-r-0'>
            <Header>
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
            </Header>
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
          <Basket />
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
              onChange={(e) => setNewProduct(e.target.value)}
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
    </form>
  )
}

export default Inventory
