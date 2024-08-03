import { ProductCard } from '@/components'
import { fakeProducts } from '@/fake/fake-data'

export const Products = () => {
	return (
		<section className='section-spacing container'>
			<h2 className='section-title'>Mashxur Tavarlar</h2>
			<div className='grid grid-cols-4 gap-8'>
				{fakeProducts.splice(0, 8).map((product) => (
					<ProductCard
						product={product}
						key={product.id}
					/>
				))}
			</div>
		</section>
	)
}
