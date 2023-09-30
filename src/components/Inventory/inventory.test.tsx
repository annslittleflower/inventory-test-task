import { ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Inventory from '.'

const testProducts = [
  {
    id: 1,
    title: 'title 1',
  },
  {
    id: 2,
    title: 'title 2',
  },
  {
    id: 3,
    title: 'title 3',
  },
]

// const expectation = nock('https://dummyjson.com')
//   .get('/products?limit=3')
//   .reply(200, {
//     products: testProducts,
//   })

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
})

const wrapper = ({ children }: { children: ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

describe('<Inventory />', () => {
  it('fetch data and render', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            products: testProducts,
          })
        ),
    }

    fetchSpy.mockReturnValue(mockResolveValue as any)

    render(<Inventory />, { wrapper })

    const allProductElements = await screen.findAllByTestId('product')

    expect(allProductElements).toHaveLength(3)
  })

  it('add items to backet', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            products: testProducts,
          })
        ),
    }

    fetchSpy.mockReturnValue(mockResolveValue as any)

    render(<Inventory />, { wrapper })

    const allProductElements = await screen.findAllByTestId('product')

    await userEvent.click(allProductElements[0])
    await userEvent.click(allProductElements[1])

    await userEvent.click(screen.getByText('add'))

    const allBasketElement = await screen.findAllByTestId('basket-product')
    expect(allBasketElement).toHaveLength(2)

    const total = screen.getByTestId('total')

    expect(total.textContent).toBe('Total: 2')
  })

  it('add new item', async () => {
    const fetchSpy = vi.spyOn(global, 'fetch')

    const mockResolveValue = {
      json: () =>
        new Promise((resolve) =>
          resolve({
            products: testProducts,
          })
        ),
    }

    fetchSpy.mockReturnValue(mockResolveValue as any)

    render(<Inventory />, { wrapper })

    // jsdom doesnot like dialog
    HTMLDialogElement.prototype.showModal = vi.fn()
    HTMLDialogElement.prototype.close = vi.fn()

    await userEvent.click(screen.getByText('new'))

    await screen.findByRole('textbox')

    await userEvent.type(screen.getByRole('textbox'), 'title 4')

    await userEvent.click(screen.getByText('save'))

    const allProductElements = await screen.findAllByTestId('product')

    expect(allProductElements).toHaveLength(4)
  })
})
