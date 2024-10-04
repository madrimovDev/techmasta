'use client'
import { ProductCard } from '@/components'
import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/actions/products/products.action'
import { productEndpoints } from '@/actions/constants'

export const Products = () => {
	const { data: products } = useQuery({
		queryKey: [productEndpoints.all],
		queryFn: getProducts
	})
	return (
		<section className='section-spacing container'>
			<h2 className='section-title'>Mashxur Tovarlar</h2>
			<div className='grid grid-cols-4 gap-8'>
				{products?.slice(0, 8).map((product) => (
					<ProductCard
						product={product}
						key={product.id}
					/>
				))}
			</div>
		</section>
	)
}
