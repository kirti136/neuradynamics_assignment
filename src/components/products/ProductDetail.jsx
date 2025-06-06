import PropTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import {
  addToFavorites,
  removeFromFavorites,
  selectIsFavorite,
} from "../../features/favorites/favoritesSlice";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaStarHalfAlt,
  FaRegStar,
} from "react-icons/fa";
import { motion } from "framer-motion";

function ProductDetail({ product }) {
  const dispatch = useDispatch();
  const isFavorite = useSelector((state) =>
    selectIsFavorite(state, product.id)
  );

  if (!product) return null;

  const handleToggleFavorite = () => {
    if (isFavorite) {
      dispatch(removeFromFavorites(product.id));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const renderRatingStars = () => {
    const stars = [];
    const rating = product.rating.rate;
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`full-${i}`} className="text-yellow-500" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalfAlt key="half" className="text-yellow-500" />);
    }

    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<FaRegStar key={`empty-${i}`} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-lg overflow-hidden shadow-xl"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="p-8 bg-gray-700 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.title}
            className="max-h-80 object-contain"
          />
        </div>

        <div className="p-8">
          <div className="flex justify-between items-start">
            <h1 className="text-2xl font-bold text-white mb-2">
              {product.title}
            </h1>
          </div>

          <div className="mb-4">
            <span className="text-sm px-3 py-1 bg-gray-700 rounded-full text-gray-300">
              {product.category}
            </span>
          </div>

          <div className="flex items-center mb-4">
            <div className="flex mr-2">{renderRatingStars()}</div>
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
            <button
              onClick={handleToggleFavorite}
              className={`btn-secondary flex items-center justify-center`}
            >
              {isFavorite ? (
                <>
                  <FaHeart className="mr-2 text-red-500" />
                  <h1>Added to Favourites</h1>
                </>
              ) : (
                <>
                  <FaRegHeart className="mr-2" />
                  <h1>Add to Favourites</h1>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

ProductDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ProductDetail;
