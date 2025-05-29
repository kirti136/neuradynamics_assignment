import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'
import productsReducer from '../features/products/productsSlice'
import favoritesReducer, { 
  addToFavorites,
  removeFromFavorites
} from '../features/favorites/favoritesSlice'
import filtersReducer from '../features/filters/filtersSlice'
import ProductCard from '../components/products/ProductCard'

// Mock product data
const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  description: 'This is a test product',
  category: 'test',
  image: 'https://fakestoreapi.com/img/test.jpg',
  rating: {
    rate: 4.5,
    count: 120
  }
}

// Setup test store
const createTestStore = (initialState = {}) => {
  return configureStore({
    reducer: {
      products: productsReducer,
      favorites: favoritesReducer,
      filters: filtersReducer
    },
    preloadedState: initialState
  })
}

describe('ProductCard Component', () => {
  let store
  
  beforeEach(() => {
    store = createTestStore()
  })

  it('renders product information correctly', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    )

    expect(screen.getByText('Test Product')).toBeInTheDocument()
    expect(screen.getByText('$99.99')).toBeInTheDocument()
    expect(screen.getByText('test')).toBeInTheDocument()
  })

  it('adds product to favorites when heart icon is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    )
    
    // Initially not in favorites
    const favoriteButton = screen.getByLabelText('Add to favorites')
    
    // Click to add to favorites
    fireEvent.click(favoriteButton)
    
    // Check if the product is now in favorites
    const state = store.getState()
    expect(state.favorites.items).toContainEqual(mockProduct)
  })

  it('removes product from favorites when already favorited', () => {
    // Create store with product already in favorites
    store = createTestStore({
      favorites: {
        items: [mockProduct]
      }
    })
    
    render(
      <Provider store={store}>
        <MemoryRouter>
          <ProductCard product={mockProduct} />
        </MemoryRouter>
      </Provider>
    )
    
    // Should be in favorites initially
    const favoriteButton = screen.getByLabelText('Remove from favorites')
    
    // Click to remove from favorites
    fireEvent.click(favoriteButton)
    
    // Check if the product was removed from favorites
    const state = store.getState()
    expect(state.favorites.items).toHaveLength(0)
  })
})