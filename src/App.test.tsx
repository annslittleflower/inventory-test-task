import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'

import App from './App'

describe('App', () => {
  it('smoke test', () => {
    render(<App />)

    const t = screen.getByTestId('appd')

    expect(t).toBeInTheDocument()
  })
})
