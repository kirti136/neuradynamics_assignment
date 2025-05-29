import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectFavorites } from '../../features/favorites/favoritesSlice'
import { FaStore, FaHeart } from 'react-icons/fa'
import { motion } from 'framer-motion'

function Navbar() {
  const location = useLocation()
  const favorites = useSelector(selectFavorites)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const navbarClass = isScrolled
    ? 'bg-gray-900 shadow-lg'
    : 'bg-gray-900/80 backdrop-blur-md'

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 w-full ${navbarClass}`}>
      <div className="container-width px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and brand */}
          <Link to="/" className="flex items-center space-x-2">
            <FaStore className="text-primary-500 text-2xl" />
            <span className="text-xl font-bold text-white">Shopify!</span>
          </Link>

          {/* Desktop navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                `text-gray-300 hover:text-white transition-colors ${isActive ? 'text-primary-400 font-medium' : ''}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink 
              to="/products" 
              className={({ isActive }) => 
                `text-gray-300 hover:text-white transition-colors ${isActive ? 'text-primary-400 font-medium' : ''}`
              }
            >
              Products
            </NavLink>
            <NavLink 
              to="/favorites" 
              className={({ isActive }) => 
                `relative text-gray-300 hover:text-white transition-colors ${isActive ? 'text-primary-400 font-medium' : ''}`
              }
            >
              <div className="flex items-center">
                <FaHeart className="mr-1" />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <motion.div 
                    className="absolute -top-2 -right-2 bg-primary-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  >
                    {favorites.length}
                  </motion.div>
                )}
              </div>
            </NavLink>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              className="text-gray-300 hover:text-white focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${isMobileMenuOpen ? 'max-h-60' : 'max-h-0 overflow-hidden'}`}>
          <div className="px-2 pt-2 pb-4 space-y-1">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-base ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/products"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-base ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              Products
            </NavLink>
            <NavLink
              to="/favorites"
              className={({ isActive }) =>
                `block py-2 px-3 rounded-md text-base ${isActive ? 'bg-gray-800 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white'}`
              }
            >
              <div className="flex items-center">
                <FaHeart className="mr-3" />
                <span>Favorites</span>
                {favorites.length > 0 && (
                  <span className="ml-auto bg-primary-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {favorites.length}
                  </span>
                )}
              </div>
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar