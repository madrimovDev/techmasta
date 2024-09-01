import { PropsWithChildren } from 'react'
import {
	dehydrate,
	HydrationBoundary,
	useQueryClient
} from '@tanstack/react-query'
import { getProduct } from '@/actions/products/products.action'
import { getQueryClient } from '@/app/get-query-client'

const Layout = async ({
	children,
	params
}: PropsWithChildren<{ params: { id: number } }>) => {
	const queryClient = getQueryClient()
	await queryClient.prefetchQuery({
		queryKey: ['product', params],
		queryFn: () => getProduct(params.id)
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<div className='my-10'>{children}</div>
		</HydrationBoundary>
	)
}

export default Layout
