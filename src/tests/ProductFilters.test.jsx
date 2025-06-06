import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import productsReducer from '../features/products/productsSlice'
import favoritesReducer from '../features/favorites/favoritesSlice'
import filtersReducer from '../features/filters/filtersSlice'
import ProductFilters from '../components/products/ProductFilters'

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

// Mock the API call for categories
vi.mock('../services/api', () => ({
  fetchCategories: vi.fn().mockResolvedValue(['electronics', 'clothing'])
}))

describe('ProductFilters Component', () => {
  let store
  
  beforeEach(() => {
    store = createTestStore({
      products: {
        categories: ['electronics', 'clothing'],
        status: 'succeeded',
        items: [],
        selectedProduct: null,
        error: null
      },
      filters: {
        searchTerm: '',
        category: '',
        sortBy: 'default'
      }
    })
  })

  it('renders search input and filters correctly', () => {
    render(
      <Provider store={store}>
        <ProductFilters />
      </Provider>
    )

    expect(screen.getByPlaceholderText('Search products...')).toBeInTheDocument()
    expect(screen.getByText('All Categories')).toBeInTheDocument()
    expect(screen.getByText('Default Sorting')).toBeInTheDocument()
  })

  it('updates search term when input changes', () => {
    render(
      <Provider store={store}>
        <ProductFilters />
      </Provider>
    )
    
    const searchInput = screen.getByPlaceholderText('Search products...')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    
    const state = store.getState()
    expect(state.filters.searchTerm).toBe('test')
  })

  it('updates category when selection changes', () => {
    render(
      <Provider store={store}>
        <ProductFilters />
      </Provider>
    )
    
    const categorySelect = screen.getByText('All Categories').closest('select')
    fireEvent.change(categorySelect, { target: { value: 'electronics' } })
    
    const state = store.getState()
    expect(state.filters.category).toBe('electronics')
  })

  it('updates sort by when selection changes', () => {
    render(
      <Provider store={store}>
        <ProductFilters />
      </Provider>
    )
    
    const sortSelect = screen.getByText('Default Sorting').closest('select')
    fireEvent.change(sortSelect, { target: { value: 'price_asc' } })
    
    const state = store.getState()
    expect(state.filters.sortBy).toBe('price_asc')
  })

  it('shows reset button when filters are active and resets when clicked', () => {
    // Store with active filters
    store = createTestStore({
      products: {
        categories: ['electronics', 'clothing'],
        status: 'succeeded',
        items: [],
        selectedProduct: null,
        error: null
      },
      filters: {
        searchTerm: 'test',
        category: 'electronics',
        sortBy: 'price_asc'
      }
    })
    
    render(
      <Provider store={store}>
        <ProductFilters />
      </Provider>
    )
    
    // Check that reset button exists
    const resetButton = screen.getByText('Reset Filters')
    expect(resetButton).toBeInTheDocument()
    
    // Click reset button
    fireEvent.click(resetButton)
    
    // Check that filters are reset
    const state = store.getState()
    expect(state.filters.searchTerm).toBe('')
    expect(state.filters.category).toBe('')
    expect(state.filters.sortBy).toBe('default')
  })
})