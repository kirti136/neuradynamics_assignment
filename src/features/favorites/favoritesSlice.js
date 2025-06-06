import { createSlice } from '@reduxjs/toolkit'

// Try to load favorites from localStorage
const loadFavorites = () => {
  try {
    const storedFavorites = localStorage.getItem('favorites')
    return storedFavorites ? JSON.parse(storedFavorites) : []
  } catch (error) {
    console.error('Could not load favorites from localStorage', error)
    return []
  }
}

const initialState = {
  items: loadFavorites(),
}

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action) => {
      const exists = state.items.some(item => item.id === action.payload.id)
      if (!exists) {
        state.items.push(action.payload)
        // Save to localStorage
        localStorage.setItem('favorites', JSON.stringify(state.items))
      }
    },
    removeFromFavorites: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload)
      // Save to localStorage
      localStorage.setItem('favorites', JSON.stringify(state.items))
    },
    clearAllFavorites: (state) => {
      state.items = []
      // Clear localStorage
      localStorage.setItem('favorites', JSON.stringify([]))
    },
  },
})

// Actions
export const { addToFavorites, removeFromFavorites, clearAllFavorites } = favoritesSlice.actions

// Selectors
export const selectFavorites = (state) => state.favorites.items
export const selectIsFavorite = (state, productId) => 
  state.favorites.items.some(item => item.id === productId)

export default favoritesSlice.reducer