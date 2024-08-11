import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'

export interface ShippingService {
	id: number
	name: string
	description: string
	price: number
	unit: string
}

export const useGetShippingServices = () => {
	return useQuery({
		queryKey: [endpoints.shippingServices.all],
		queryFn: async () => {
			return http.get<ShippingService[]>(endpoints.shippingServices.all)
		},
		select(res) {
			return res.data
		}
	})
}

export const useCreateShippingService = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Omit<ShippingService, 'id'>) => {
			return http.post(endpoints.shippingServices.all, data)
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.shippingServices.all]
			})
		}
	})
}

export const useUpdateShippingService = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, ...data }: ShippingService) => {
			return http.put(endpoints.shippingServices.one(id), data)
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.shippingServices.all]
			})
		}
	})
}

export const useDeleteShippingService = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return http.delete(endpoints.shippingServices.one(id))
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.shippingServices.all]
			})
		}
	})
}
