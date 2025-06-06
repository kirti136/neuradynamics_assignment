import axios from 'axios'

const BASE_URL = 'https://fakestoreapi.com'

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const fetchProducts = async () => {
  try {
    const response = await api.get('/products')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch products')
  }
}

export const fetchProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch product with id: ${id}`)
  }
}

export const fetchCategories = async () => {
  try {
    const response = await api.get('/products/categories')
    return response.data
  } catch (error) {
    throw new Error('Failed to fetch categories')
  }
}

export const fetchProductsByCategory = async (category) => {
  try {
    const response = await api.get(`/products/category/${category}`)
    return response.data
  } catch (error) {
    throw new Error(`Failed to fetch products in category: ${category}`)
  }
}

export default api