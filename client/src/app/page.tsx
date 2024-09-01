import { Blogs, Hero, Products, Trending } from '@/app/components'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { authEndpoints, productEndpoints } from '@/actions/constants'
import { profile } from '@/actions/auth/auth.action'
import { getProducts } from '@/actions/products/products.action'
import { getQueryClient } from '@/app/get-query-client'

const Page = async () => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryFn: getProducts,
		queryKey: [productEndpoints.all]
	})

	await queryClient.prefetchQuery({
		queryFn: profile,
		queryKey: [authEndpoints.profile]
	})

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Hero />
			<Trending />
			<Blogs />
			<Products />
		</HydrationBoundary>
	)
}

export default Page
