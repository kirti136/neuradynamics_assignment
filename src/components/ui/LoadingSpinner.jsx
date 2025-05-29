import { motion } from 'framer-motion'

function LoadingSpinner() {
  return (
    <div className="flex justify-center items-center py-16">
      <motion.div
        className="w-16 h-16 border-4 border-gray-600 border-t-primary-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  )
}

export default LoadingSpinner