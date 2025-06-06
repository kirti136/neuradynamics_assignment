import { describe, it, expect } from 'vitest'
import favoritesReducer, { 
  addToFavorites, 
  removeFromFavorites,
  clearAllFavorites,
  selectFavorites,
  selectIsFavorite
} from '../features/favorites/favoritesSlice'

describe('Favorites Slice', () => {
  const initialState = { items: [] }
  const mockProduct = { id: 1, title: 'Test Product', price: 99.99 }
  
  it('should handle initial state', () => {
    expect(favoritesReducer(undefined, { type: undefined })).toEqual({ items: [] })
  })

  it('should handle addToFavorites', () => {
    const action = addToFavorites(mockProduct)
    const state = favoritesReducer(initialState, action)
    
    expect(state.items).toEqual([mockProduct])
  })

  it('should not add duplicate products to favorites', () => {
    const stateWithProduct = { items: [mockProduct] }
    const action = addToFavorites(mockProduct)
    const state = favoritesReducer(stateWithProduct, action)
    
    expect(state.items).toEqual([mockProduct])
    expect(state.items.length).toBe(1)
  })

  it('should handle removeFromFavorites', () => {
    const stateWithProduct = { items: [mockProduct] }
    const action = removeFromFavorites(1)
    const state = favoritesReducer(stateWithProduct, action)
    
    expect(state.items).toEqual([])
  })

  it('should handle clearAllFavorites', () => {
    const stateWithProducts = { 
      items: [
        mockProduct,
        { id: 2, title: 'Test Product 2', price: 29.99 }
      ] 
    }
    const action = clearAllFavorites()
    const state = favoritesReducer(stateWithProducts, action)
    
    expect(state.items).toEqual([])
  })

  it('should properly select favorites', () => {
    const state = { favorites: { items: [mockProduct] } }
    expect(selectFavorites(state)).toEqual([mockProduct])
  })

  it('should correctly determine if a product is a favorite', () => {
    const state = { favorites: { items: [mockProduct] } }
    expect(selectIsFavorite(state, 1)).toBe(true)
    expect(selectIsFavorite(state, 2)).toBe(false)
  })
})