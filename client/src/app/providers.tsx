'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { PropsWithChildren, useState } from 'react'
import { AppProgressBar } from 'next-nprogress-bar'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { getQueryClient } from '@/app/get-query-client'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

export default function Providers({ children }: PropsWithChildren) {
	const [queryClient] = useState(getQueryClient())
	return (
		<QueryClientProvider client={queryClient}>
			<ToastContainer
				position='top-right'
				hideProgressBar
				theme={'light'}
				pauseOnHover
			/>
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
