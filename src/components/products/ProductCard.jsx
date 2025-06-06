import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../features/favorites/favoritesSlice'
import { FaHeart, FaRegHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductCard({ product }) {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state) => selectIsFavorite(state, product.id))

  const handleToggleFavorite = (e) => {
    e.preventDefault() // Prevent navigation
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id))
    } else {
      dispatch(addToFavorites(product))
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="card h-full group hover:shadow-xl hover:scale-[1.02] transform transition">
          <div className="relative pt-[100%] mb-4 bg-gray-700 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.title}
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
            />
            <button
              onClick={handleToggleFavorite}
              className="absolute top-2 right-2 p-2 bg-gray-900/80 rounded-full 
              hover:bg-gray-800 transition-colors"
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-lg" />
              ) : (
                <FaRegHeart className="text-white text-lg group-hover:text-red-400" />
              )}
            </button>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-start">
              <h3 className="font-medium text-md line-clamp-2 text-white group-hover:text-primary-300 transition-colors">
                {product.title}
              </h3>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-accent-400">${product.price.toFixed(2)}</span>
              <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-gray-300">
                {product.category}
              </span>
            </div>
            
            <div className="flex items-center">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className={`text-sm ${i < Math.round(product.rating.rate) ? 'text-yellow-500' : 'text-gray-600'}`}>
                    ★
                  </span>
                ))}
              </div>
              <span className="text-gray-400 text-xs ml-1">({product.rating.count})</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default ProductCard