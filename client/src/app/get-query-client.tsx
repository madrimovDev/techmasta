import {
	defaultShouldDehydrateQuery,
	isServer,
	MutationCache,
	QueryClient
} from '@tanstack/react-query'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 60 * 1000,
				select(data: any) {
					if (data.statusCode && data.statusCode >= 400) {
						throw data
					}
					return data
				}
			},
			dehydrate: {
				shouldDehydrateQuery: (query) =>
					defaultShouldDehydrateQuery(query) || query.state.status === 'pending'
			}
		},
		mutationCache: new MutationCache({
			onSuccess(data: any) {
				if (data.statusCode && data.statusCode >= 400) {
					throw data
				}
			}
		})
	})
}

let browserQueryClient: QueryClient | undefined = undefined

export function getQueryClient() {
	if (isServer) {
		return makeQueryClient()
	} else {
		if (!browserQueryClient) browserQueryClient = makeQueryClient()
		return browserQueryClient
	}
}
