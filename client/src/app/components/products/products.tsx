import { ProductCard } from '@/components'
import { getProducts } from '@/app/products/_utils/fetch-products'

export const Products = async () => {
	const products = await getProducts()
	return (
		<section className='section-spacing container'>
			<h2 className='section-title'>Mashxur Tovarlar</h2>
			<div className='grid grid-cols-4 gap-8'>
				{products.splice(0, 8).map((product) => (
					<ProductCard
						product={product}
						key={product.id}
					/>
				))}
			</div>
		</section>
	)
}
