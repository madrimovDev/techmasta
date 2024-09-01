import { dehydrate, HydrationBoundary } from '@tanstack/react-query'
import { getQueryClient } from '@/app/get-query-client'
import { PropsWithChildren } from 'react'
import { Navbar } from '@/app/components'
import { productEndpoints } from '@/actions/constants'
import { getProducts } from '@/actions/products/products.action'

const Template = async ({ children }: PropsWithChildren) => {
	const queryClient = getQueryClient()

	await queryClient.prefetchQuery({
		queryFn: getProducts,
		queryKey: [productEndpoints.all]
	})
	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<Navbar />
			{children}
		</HydrationBoundary>
	)
}

export default Template
