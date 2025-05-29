import { describe, it, expect, vi } from 'vitest'
import productsReducer, { 
  getProducts, 
  getProductById
} from '../features/products/productsSlice'

// Mock API responses
const mockProducts = [
  { id: 1, title: 'Product 1', price: 99.99 },
  { id: 2, title: 'Product 2', price: 19.99 }
]

const mockProduct = { id: 1, title: 'Product 1', price: 99.99 }

describe('Products Slice', () => {
  it('should handle initial state', () => {
    expect(productsReducer(undefined, { type: undefined })).toEqual({
      items: [],
      selectedProduct: null,
      categories: [],
      status: 'idle',
      error: null
    })
  })

  it('should handle getProducts.pending', () => {
    const action = { type: getProducts.pending.type }
    const state = productsReducer(undefined, action)
    expect(state.status).toEqual('loading')
  })

  it('should handle getProducts.fulfilled', () => {
    const action = { 
      type: getProducts.fulfilled.type, 
      payload: mockProducts
    }
    const state = productsReducer(undefined, action)
    
    expect(state.status).toEqual('succeeded')
    expect(state.items).toEqual(mockProducts)
  })

  it('should handle getProducts.rejected', () => {
    const action = { 
      type: getProducts.rejected.type,
      error: { message: 'Failed to fetch products' }
    }
    const state = productsReducer(undefined, action)
    
    expect(state.status).toEqual('failed')
    expect(state.error).toEqual('Failed to fetch products')
  })

  it('should handle getProductById.fulfilled', () => {
    const action = { 
      type: getProductById.fulfilled.type, 
      payload: mockProduct
    }
    const state = productsReducer(undefined, action)
    
    expect(state.status).toEqual('succeeded')
    expect(state.selectedProduct).toEqual(mockProduct)
  })
})