import ProductCard from './ProductCard'
import { motion } from 'framer-motion'

function ProductGrid({ products, isLoading, isError }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="card animate-pulse">
            <div className="bg-gray-700 w-full pt-[100%] rounded-md mb-4"></div>
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-5 bg-gray-700 rounded w-1/4"></div>
          </div>
        ))}
      </div>
    )
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="text-3xl text-error-500 mb-4">⚠️</div>
        <h2 className="text-2xl font-bold mb-2">Error loading products</h2>
        <p className="text-gray-400">
          There was a problem loading the products. Please try again later.
        </p>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <motion.div 
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="text-5xl mb-4"
        >
          🔍
        </motion.div>
        <h2 className="text-2xl font-bold mb-2">No products found</h2>
        <p className="text-gray-400">
          Try adjusting your search or filter criteria.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}

export default ProductGrid