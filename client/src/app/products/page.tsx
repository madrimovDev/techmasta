import { fakeProducts } from '@/fake/fake-data'
import { ProductCard } from '@/components'
import { Filters } from '@/app/products/_components/filters'
import { getProducts } from '@/app/products/_utils/fetch-products'

const Page = async () => {
	const products = await getProducts()
	return (
		<div className='py-10'>
			<div className='grid grid-cols-12 gap-8'>
				<div className='col-span-2 relative'>
					<Filters />
				</div>
				<div className='col-span-10 grid grid-cols-4 gap-8'>
					{products.map((product) => (
						<ProductCard
							product={product}
							key={product.id}
						/>
					))}
				</div>
			</div>
		</div>
	)
}

export default Page
