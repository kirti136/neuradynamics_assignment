import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { 
  selectAllProducts, 
  selectProductsStatus
} from '../features/products/productsSlice'
import { 
  selectSearchTerm, 
  selectCategory, 
  selectSortBy 
} from '../features/filters/filtersSlice'

export default function useFilteredProducts() {
  const products = useSelector(selectAllProducts)
  const status = useSelector(selectProductsStatus)
  const searchTerm = useSelector(selectSearchTerm)
  const category = useSelector(selectCategory)
  const sortBy = useSelector(selectSortBy)

  const filteredProducts = useMemo(() => {
    if (status !== 'succeeded') return []

    return products
      // Filter by search term
      .filter(product => 
        searchTerm === '' || 
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      // Filter by category
      .filter(product => 
        category === '' || 
        product.category === category
      )
      // Sort by price
      .sort((a, b) => {
        if (sortBy === 'price_asc') {
          return a.price - b.price
        }
        if (sortBy === 'price_desc') {
          return b.price - a.price
        }
        // Default sorting (by id or any other default)
        return a.id - b.id
      })
  }, [products, searchTerm, category, sortBy, status])

  return {
    filteredProducts,
    isLoading: status === 'loading',
    isError: status === 'failed',
  }
}