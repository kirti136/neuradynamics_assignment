import { describe, it, expect } from 'vitest'
import filtersReducer, { 
  setSearchTerm, 
  setCategory, 
  setSortBy, 
  resetFilters 
} from '../features/filters/filtersSlice'

describe('Filters Slice', () => {
  const initialState = {
    searchTerm: '',
    category: '',
    sortBy: 'default',
  }
  
  it('should handle initial state', () => {
    expect(filtersReducer(undefined, { type: undefined })).toEqual(initialState)
  })

  it('should handle setSearchTerm', () => {
    const action = setSearchTerm('test')
    const state = filtersReducer(initialState, action)
    
    expect(state.searchTerm).toEqual('test')
  })

  it('should handle setCategory', () => {
    const action = setCategory('electronics')
    const state = filtersReducer(initialState, action)
    
    expect(state.category).toEqual('electronics')
  })

  it('should handle setSortBy', () => {
    const action = setSortBy('price_asc')
    const state = filtersReducer(initialState, action)
    
    expect(state.sortBy).toEqual('price_asc')
  })

  it('should handle resetFilters', () => {
    const modifiedState = {
      searchTerm: 'test',
      category: 'electronics',
      sortBy: 'price_desc',
    }
    
    const action = resetFilters()
    const state = filtersReducer(modifiedState, action)
    
    expect(state).toEqual(initialState)
  })
})