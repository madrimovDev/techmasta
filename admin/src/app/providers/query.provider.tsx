import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '../query'
import { PropsWithChildren } from 'react'

const QueryProvider = ({ children }: PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
	)
}

export default QueryProvider
