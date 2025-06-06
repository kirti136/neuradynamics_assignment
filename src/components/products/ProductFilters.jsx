import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useDebounce } from 'use-debounce'
import { 
  setSearchTerm, 
  setCategory, 
  setSortBy, 
  resetFilters,
  selectSearchTerm,
  selectCategory,
  selectSortBy
} from '../../features/filters/filtersSlice'
import { 
  selectCategories, 
  getCategories 
} from '../../features/products/productsSlice'
import { FaSearch, FaTimes } from 'react-icons/fa'

function ProductFilters() {
  const dispatch = useDispatch()
  const searchTerm = useSelector(selectSearchTerm)
  const category = useSelector(selectCategory)
  const sortBy = useSelector(selectSortBy)
  const categories = useSelector(selectCategories)
  
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300)

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  // We don't need to do anything with the debounced value here
  // It's already in the Redux store and will be used by our filtered products hook

  const handleReset = () => {
    dispatch(resetFilters())
  }

  const hasActiveFilters = searchTerm || category || sortBy !== 'default'

  return (
    <div className="bg-gray-800 p-4 rounded-lg mb-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Search input */}
        <div className="relative flex-grow max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            className="input-field pl-10 pr-8"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
          />
          {searchTerm && (
            <button
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => dispatch(setSearchTerm(''))}
              aria-label="Clear search"
            >
              <FaTimes className="text-gray-500 hover:text-gray-300" />
            </button>
          )}
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* Category filter */}
          <div className="flex-grow">
            <select
              className="input-field cursor-pointer"
              value={category}
              onChange={(e) => dispatch(setCategory(e.target.value))}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Sort by filter */}
          <div className="flex-grow">
            <select
              className="input-field cursor-pointer"
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value))}
            >
              <option value="default">Default Sorting</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Reset filters button */}
        {hasActiveFilters && (
          <button
            onClick={handleReset}
            className="btn-secondary whitespace-nowrap"
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  )
}

export default ProductFilters