'use client'
import {
	defaultShouldDehydrateQuery,
	MutationCache,
	QueryClient,
	QueryClientProvider
} from '@tanstack/react-query'
import { createContext, PropsWithChildren, useContext, useState } from 'react'
import { AppProgressBar } from 'next-nprogress-bar'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/app/get-query-client'

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(getQueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools />
			<AppProgressBar
				height='4px'
				color='#fffd00'
				options={{ showSpinner: false }}
				shallowRouting
			/>
		</QueryClientProvider>
	)
}
