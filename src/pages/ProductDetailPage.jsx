import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  getProductById, 
  selectProductById, 
  selectProductsStatus, 
  selectProductsError 
} from '../features/products/productsSlice'
import ProductDetail from '../components/products/ProductDetail'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { FaArrowLeft } from 'react-icons/fa'

function ProductDetailPage() {
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(selectProductById)
  const status = useSelector(selectProductsStatus)
  const error = useSelector(selectProductsError)

  useEffect(() => {
    if (id) {
      dispatch(getProductById(id))
    }
  }, [dispatch, id])

  const isLoading = status === 'loading'
  const isError = status === 'failed'

  return (
    <div>
      <div className="mb-6">
        <Link to="/products" className="inline-flex items-center text-primary-400 hover:text-primary-300 transition-colors">
          <FaArrowLeft className="mr-2" />
          Back to Products
        </Link>
      </div>

      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="text-center py-12 bg-gray-800 rounded-lg">
          <div className="text-5xl mb-4">⚠️</div>
          <h2 className="text-2xl font-bold mb-2">Product Not Found</h2>
          <p className="text-gray-400 mb-6">
            {error || "We couldn't find the product you're looking for."}
          </p>
          <Link to="/products" className="btn-primary">
            Browse All Products
          </Link>
        </div>
      )}

      {!isLoading && !isError && product && (
        <ProductDetail product={product} />
      )}
    </div>
  )
}

export default ProductDetailPage