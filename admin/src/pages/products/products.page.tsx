import ProductsTable from './ui/products-table'
import ProductModal from './ui/product-modal'
import ProductDrawer from './ui/product-drawer'
import { ProductCommentModal } from './ui/product-comment-modal.tsx'

const ProductsPage = () => {
	return (
		<div>
			<ProductsTable />
			<ProductModal />
			<ProductDrawer />
			<ProductCommentModal />
		</div>
	)
}

export default ProductsPage
