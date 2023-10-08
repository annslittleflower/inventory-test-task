import { memo } from 'react'
import { Header, ProductRow } from '.'
import { Button } from '@/components/ui'
import { useInventoryContext } from '../hooks/useInventoryContext'

const Basket = () => {
  const {
    deleteProductsFromBasket,
    toggleBasket,
    productsInBasket,
    isRemoveButtonDisabled,
    isBasketItemSelected,
  } = useInventoryContext()
  console.log('rendered')
  console.log('productsInBasket', productsInBasket)

  return (
    <div className='border-4 flex flex-col md:flex-[0_0_50%]'>
      <Header>
        basket
        <Button
          className=' hover:bg-pink-600'
          disabled={isRemoveButtonDisabled}
          onClick={deleteProductsFromBasket}
        >
          remove
        </Button>
      </Header>
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
  )
}

const MemoBasket = memo(Basket)

export default MemoBasket
