import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaShoppingBag, FaHeart, FaStar } from 'react-icons/fa'

function HomePage() {
  return (
    <div>
      <motion.section 
        className="py-12 md:py-20 rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 mb-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <motion.h1 
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Welcome to Shopify!
          </motion.h1>
          <motion.p 
            className="text-xl text-gray-300 max-w-2xl mx-auto mb-8"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            Explore our curated collection of products with our sleek and intuitive dashboard
          </motion.p>
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Link to="/products" className="btn-primary text-lg py-3 px-8">
              Browse Products
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaShoppingBag className="text-primary-500 text-4xl mb-4" />,
              title: "Product Browsing",
              description: "Browse our extensive catalog with advanced filtering options. Search, sort, and filter to find exactly what you're looking for."
            },
            {
              icon: <FaHeart className="text-red-500 text-4xl mb-4" />,
              title: "Favorites",
              description: "Save your favorite products for later. Add and remove products from your favorites list with a single click."
            },
            {
              icon: <FaStar className="text-yellow-500 text-4xl mb-4" />,
              title: "Product Details",
              description: "View detailed information about each product, including descriptions, ratings, and pricing information."
            }
          ].map((feature, index) => (
            <motion.div 
              key={index}
              className="card text-center p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + (index * 0.1) }}
            >
              <div className="flex justify-center">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="py-12 rounded-lg bg-gray-800 text-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-4">Ready to start exploring?</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-6">
          Discover our wide range of products and add your favorites to your collection.
        </p>
        <Link to="/products" className="btn-primary text-lg py-3 px-8">
          View All Products
        </Link>
      </motion.section>
    </div>
  )
}

export default HomePage