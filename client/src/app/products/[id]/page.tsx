'use client'
import { ProductImageGallery } from '@/app/products/[id]/_components/product-image-gallery'
import { ProductInfo } from '@/app/products/[id]/_components/product-info'
import { ProductComments } from '@/app/products/[id]/_components/product-comments'
import { useQuery } from '@tanstack/react-query'
import { getProduct } from '@/actions/products/products.action'
import { productEndpoints } from '@/actions/constants'

const Page = ({ params }: { params: { id: string } }) => {
	const { data: product, isLoading } = useQuery({
		queryKey: [productEndpoints.one(+params.id)],
		queryFn: () => getProduct(+params.id)
	})

	if (isLoading || !product) return null

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
