import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'

export interface DiscountRule {
	id: number
	name: string
	description: string
	discountValue: number
	minimumQuantity: number
	createdAt: string
	updatedAt: string
}

export const useGetDiscountRules = () => {
	return useQuery({
		queryKey: [endpoints.discountRule.all],
		queryFn: async () => {
			return http.get<DiscountRule[]>(endpoints.discountRule.all)
		},
		select(res) {
			return res.data
		}
	})
}

export interface CreateDiscountRule {
	name: string
	description: string
	minimumQuantity: number
	discountValue: number
}

export const useCreateDiscountRule = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: CreateDiscountRule) => {
			return http.post(endpoints.discountRule.all, data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [endpoints.discountRule.all]
			})
		}
	})
}

export const useUpdateDiscountRule = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			id,
			...data
		}: CreateDiscountRule & { id: number }) => {
			return http.put(endpoints.discountRule.one(id), data)
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [endpoints.discountRule.all]
			})
		}
	})
}

export const useDeleteDiscountRule = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return http.delete(endpoints.discountRule.one(id))
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [endpoints.discountRule.all]
			})
		}
	})
}

export const useDeleteManyDiscountRule = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: { id: number[] }) => {
			return http.delete(endpoints.discountRule.all, { data })
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: [endpoints.discountRule.all]
			})
		}
	})
}
