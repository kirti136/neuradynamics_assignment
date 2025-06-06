import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  searchTerm: '',
  category: '',
  sortBy: 'default',
}

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload
    },
    setCategory: (state, action) => {
      state.category = action.payload
    },
    setSortBy: (state, action) => {
      state.sortBy = action.payload
    },
    resetFilters: (state) => {
      state.searchTerm = ''
      state.category = ''
      state.sortBy = 'default'
    },
  },
})

export const {
  setSearchTerm,
  setCategory,
  setSortBy,
  resetFilters,
} = filtersSlice.actions

export const selectSearchTerm = (state) => state.filters.searchTerm
export const selectCategory = (state) => state.filters.category
export const selectSortBy = (state) => state.filters.sortBy

export default filtersSlice.reducer