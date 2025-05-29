import { Link } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'
import { motion } from 'framer-motion'

function NotFoundPage() {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center py-16 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      >
        <div className="text-9xl font-bold bg-gradient-to-r from-primary-400 to-accent-400 text-transparent bg-clip-text">
          404
        </div>
      </motion.div>
      
      <h1 className="text-3xl font-bold mt-6 mb-4">Page Not Found</h1>
      
      <p className="text-gray-400 mb-8 max-w-md">
        The page you are looking for might have been removed, had its name changed,
        or is temporarily unavailable.
      </p>
      
      <Link to="/" className="btn-primary inline-flex items-center">
        <FaHome className="mr-2" />
        Return Home
      </Link>
    </motion.div>
  )
}

export default NotFoundPage