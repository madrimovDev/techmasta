import { fakeProducts } from '@/fake/fake-data'
import { ProductImageGallery } from '@/app/products/[id]/_components/product-image-gallery'
import { ProductInfo } from '@/app/products/[id]/_components/product-info'

const Page = ({ params }: { params: { id: string } }) => {
	const product = fakeProducts.find((product) => product.id === +params.id)
	if (!product) return null
	return (
		<div>
			<div className='grid grid-cols-12 gap-8'>
				<div className='col-span-5 relative'>
					<ProductImageGallery
						image={product.image}
						images={product.images}
					/>
				</div>
				<div className='col-span-7'>
					<ProductInfo product={product} />
				</div>
			</div>
		</div>
	)
}

export default Page
