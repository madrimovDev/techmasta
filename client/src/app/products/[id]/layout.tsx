import { PropsWithChildren } from 'react'
import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getProduct } from '@/actions/products/products.action'
import { getQueryClient } from '@/app/get-query-client'
import { productEndpoints } from '@/actions/constants'

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { id: number } }>) => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryKey: [productEndpoints.one(params.id)],
		queryFn: () => getProduct(params.id)
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='my-10'>{children}</div>
		</HydrationBoundary>
	)
}

export default Layout
