import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query'
import { PropsWithChildren } from 'react'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const QueryProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			{import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
			{children}
		</QueryClientProvider>
	)
}

export default QueryProvider
