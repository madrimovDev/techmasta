import { useProductDrawer } from '../utils/useProductDrawer.ts'
import { Button, Divider, Drawer, Typography, Upload } from 'antd'
import { useAddSoftToProduct, useGetProduct } from '../utils/products.query.ts'
import ProductInformationTable from './product-information-table.tsx'
import ProductImages from './product-images.tsx'
import ProductBaseInformation from './product-base-information.tsx'
import { FileFilled } from '@ant-design/icons'
import { endpoints } from '../../../app/http'

const ProductDrawer = () => {
	const { open, productId, onClose } = useProductDrawer()
	const { data: product } = useGetProduct(productId, open)
	const uploadSoft = useAddSoftToProduct()
	return (
		<Drawer
			open={open}
			destroyOnClose
			onClose={onClose}
			title="Tovar Ma'lumoti"
			width={800}
		>
			<ProductBaseInformation product={product} />
			{product?.productType === 'SOFTWARE' && (
				<>
					<Divider />
					<Typography.Title level={3}>Dastur</Typography.Title>
					{product.url ? (
						<a
							href={`${endpoints.BASE_URL}/${product.url}`}
							download={product.name}
							target='_blank'
							className='flex items-center gap-2'
						>
							<FileFilled className='text-lg' />
							{product.url.split(`\\`).at(-1)}
						</a>
					) : (
						<Upload
							beforeUpload={file => {
								uploadSoft.mutate({
									id: product.id,
									software: file
								})
								return false
							}}
						>
							<Button>Yuklash</Button>
						</Upload>
					)}
				</>
			)}

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
