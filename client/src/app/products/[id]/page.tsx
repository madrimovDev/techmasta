import { ProductImageGallery } from '@/app/products/[id]/_components/product-image-gallery'
import { ProductInfo } from '@/app/products/[id]/_components/product-info'
import { getProduct } from '@/app/products/[id]/_utils/fetch-product'
import { ProductComments } from '@/app/products/[id]/_components/product-comments'

const Page = async ({ params }: { params: { id: string } }) => {
	const product = await getProduct(params.id)
	if (!product) return null
	return (
		<div>
			<div className='grid grid-cols-12 gap-8'>
				<div className='col-span-5 relative'>
					<ProductImageGallery
						image={product.poster}
						images={product.images}
					/>
				</div>
				<div className='col-span-7'>
					<ProductInfo product={product} />
				</div>
			</div>
			<div>
				<ProductComments comments={product.productComment} />
			</div>
		</div>
	)
}

export default Page
