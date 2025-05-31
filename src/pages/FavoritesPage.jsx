import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  selectFavorites,
  clearAllFavorites,
} from "../features/favorites/favoritesSlice";
import ProductGrid from "../components/products/ProductGrid";
import { FaShoppingBag, FaHeart, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";

function FavoritesPage() {
  const dispatch = useDispatch();
  const favorites = useSelector(selectFavorites);

  const handleClearAll = () => {
    if (window.confirm("Are you sure you want to clear all favorites?")) {
      dispatch(clearAllFavorites());
    }
  };

  if (favorites.length === 0) {
    return (
      <div className="text-center py-16">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="text-6xl mb-6"
        >
          <FaHeart className="mx-auto text-gray-500" />
        </motion.div>
        <h1 className="text-3xl font-bold mb-4">
          Your favorites list is empty
        </h1>

        <Link
          to="/products"
          className="inline-flex items-center bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg font-medium transition-colors"
        >
          <FaShoppingBag className="mr-2" />
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Your Favorites</h1>
          <p className="text-gray-400">
            {favorites.length} {favorites.length === 1 ? "product" : "products"}{" "}
            in your favorites list
          </p>
        </div>
        <button
          onClick={handleClearAll}
          className="flex items-center bg-gray-800 hover:bg-red-900/30 text-red-400 hover:text-red-300 px-4 py-2 rounded-lg font-medium transition-colors self-start md:self-auto"
        >
          <FaTrash className="mr-2" />
          Clear All
        </button>
      </div>

      <ProductGrid products={favorites} isLoading={false} isError={false} />
    </div>
  );
}

export default FavoritesPage;
