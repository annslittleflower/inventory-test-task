import { useQuery } from '@tanstack/react-query'

export type Product = {
  id: number
  title: string
}

const getProductsDto = (products: []): Product[] => {
  return products.map(({ id, title }) => ({
    id,
    title,
  }))
}

const useProducts = (limit: number = 5) => {
  const {
    data: products = [],
    isError,
    isLoading,
    isSuccess,
  } = useQuery(
    ['products'],
    async () => {
      const req = await fetch(`https://dummyjson.com/products?limit=${limit}`)
      const json = await req.json()

      return getProductsDto(json.products)
    },
    {
      refetchOnWindowFocus: false,
      cacheTime: 0, // use it just to get data
    }
  )

  return {
    products,
    isError,
    isLoading,
    isSuccess,
  }
}

export default useProducts
