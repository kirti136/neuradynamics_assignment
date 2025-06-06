import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { fetchProducts, fetchProductById, fetchCategories } from '../../services/api'

export const getProducts = createAsyncThunk('products/getProducts', async () => {
  return await fetchProducts()
})

export const getProductById = createAsyncThunk('products/getProductById', async (id) => {
  return await fetchProductById(id)
})

export const getCategories = createAsyncThunk('products/getCategories', async () => {
  return await fetchCategories()
})

const initialState = {
  items: [],
  selectedProduct: null,
  categories: [],
  status: 'idle', // idle, loading, succeeded, failed
  error: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getProductById.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(getProductById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.selectedProduct = action.payload
      })
      .addCase(getProductById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(getCategories.fulfilled, (state, action) => {
        state.categories = action.payload
      })
  },
})

// Selectors
export const selectAllProducts = (state) => state.products.items
export const selectProductById = (state) => state.products.selectedProduct
export const selectCategories = (state) => state.products.categories
export const selectProductsStatus = (state) => state.products.status
export const selectProductsError = (state) => state.products.error

export default productsSlice.reducer