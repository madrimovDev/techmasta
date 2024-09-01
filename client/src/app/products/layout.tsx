import { PropsWithChildren } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { productEndpoints } from '@/actions/constants'
import { getProducts } from '@/actions/products/products.action'
import { getQueryClient } from '@/app/get-query-client'

const Layout = async ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryKey: [productEndpoints.all],
		queryFn: getProducts
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='container'>{children}</div>
		</HydrationBoundary>
	)
}

export default Layout
