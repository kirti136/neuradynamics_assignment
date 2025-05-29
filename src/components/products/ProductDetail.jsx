import { useDispatch, useSelector } from 'react-redux'
import { addToFavorites, removeFromFavorites, selectIsFavorite } from '../../features/favorites/favoritesSlice'
import { FaHeart, FaRegHeart, FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'
import { motion } from 'framer-motion'

function ProductDetail({ product }) {
  const dispatch = useDispatch()
  const isFavorite = useSelector((state) => selectIsFavorite(state, product.id))

  if (!product) return null

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id))
    } else {
      dispatch(addToFavorites(product))
    }
  }

  // Create rating stars
  const renderRatingStars = () => {
    const stars = []
    const rating = product.rating.rate
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    
    // Add full stars
    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />)
    }
    
    // Add half star if needed
    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half\" className="text-yellow-500" />)
    }
    
    // Add empty stars
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />)
    }
    
    return stars
  }

  return (
    <motion.div 
      className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="p-8 bg-gray-700 flex items-center justify-center">
          <img 
            src={product.image} 
            alt={product.title} 
            className="max-h-80 object-contain"
          />
        </div>
        
        {/* Product Info */}
        <div className="p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-white mb-2">{product.title}</h1>
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full ${isFavorite ? 'bg-red-500/20' : 'bg-gray-700'}`}
              aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
            >
              {isFavorite ? (
                <FaHeart className="text-red-500 text-xl" />
              ) : (
                <FaRegHeart className="text-white text-xl" />
              )}
            </motion.button>
          </div>
          
          <div className="mb-4">
            <span className="text-sm px-3 py-1 bg-gray-700 rounded-full text-gray-300">
              {product.category}
            </span>
          </div>
          
          <div className="flex items-center mb-4">
            <div className="flex mr-2">
              {renderRatingStars()}
            </div>
            <span className="text-gray-400 text-sm">
              {product.rating.rate} ({product.rating.count} reviews)
            </span>
          </div>
          
          <div className="text-3xl font-bold text-accent-400 mb-4">
            ${product.price.toFixed(2)}
          </div>
          
          <p className="text-gray-300 mb-6 leading-relaxed">
            {product.description}
          </p>
          
          <div className="flex space-x-4">
            <button className="btn-primary flex-1">Add to Cart</button>
            <button
              onClick={handleToggleFavorite}
              className={`btn-secondary flex items-center justify-center ${isFavorite ? 'bg-red-500/20 hover:bg-red-500/30' : ''}`}
            >
              {isFavorite ? (
                <>
                  <FaHeart className="mr-2 text-red-500" />
                  <span>Favorited</span>
                </>
              ) : (
                <>
                  <FaRegHeart className="mr-2" />
                  <span>Favorite</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default ProductDetail