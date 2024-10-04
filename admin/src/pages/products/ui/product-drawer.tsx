import { useProductDrawer } from '../utils/useProductDrawer.ts'
import { Divider, Drawer, Typography } from 'antd'
import { useGetProduct } from '../utils/products.query.ts'
import ProductInformationTable from './product-information-table.tsx'
import ProductImages from './product-images.tsx'
import ProductBaseInformation from './product-base-information.tsx'

const ProductDrawer = () => {
	const { open, productId, onClose } = useProductDrawer()
	const { data: product } = useGetProduct(productId, open)
	return (
		<Drawer
			open={open}
			destroyOnClose
			onClose={onClose}
			title="Tovar Ma'lumoti"
			width={800}
		>
			<ProductBaseInformation product={product} />
			<Divider />
			<Typography.Title level={3}>Tovar Ma'lumotlari</Typography.Title>
			<ProductInformationTable
				productId={product?.id}
				information={product?.information}
			/>
			<Divider />
			<Typography.Title level={3}>Tovar Rasmlari</Typography.Title>
			<ProductImages
				productId={product?.id}
				images={product?.images}
			/>
		</Drawer>
	)
}

export default ProductDrawer
