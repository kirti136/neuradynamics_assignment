import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getProducts } from '../features/products/productsSlice'
import useFilteredProducts from '../hooks/useFilteredProducts'
import ProductFilters from '../components/products/ProductFilters'
import ProductGrid from '../components/products/ProductGrid'
import LoadingSpinner from '../components/ui/LoadingSpinner'

function ProductsPage() {
  const dispatch = useDispatch()
  const { filteredProducts, isLoading, isError } = useFilteredProducts()

  useEffect(() => {
    dispatch(getProducts())
  }, [dispatch])

  if (isError) {
    return (
      <div className="text-center py-16">
        <div className="text-5xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-gray-400 mb-6">
          We couldn't load the products. Please try again later.
        </p>
        <button 
          onClick={() => dispatch(getProducts())} 
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          Try Again
        </button>
      </div>
    )
  }

  return (
    <div className="w-full">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Products</h1>
        <p className="text-gray-400">
          Browse our collection of high-quality products
        </p>
      </div>

      <ProductFilters />
      
      {isLoading ? (
        <div className="flex justify-center py-12">
          <LoadingSpinner />
        </div>
      ) : (
        <ProductGrid 
          products={filteredProducts} 
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </div>
  )
}

export default ProductsPage