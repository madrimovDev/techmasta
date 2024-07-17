import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'

export interface Category {
	id: number
	name: string
	description: string
}

export const useGetCategories = () => {
	return useQuery({
		queryKey: [endpoints.categories.all],
		queryFn: async () => {
			const response = await http.get<Category[]>(endpoints.categories.all)
			return response.data
		}
	})
}

export const useCreateCategory = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Omit<Category, 'id'>) => {
			return http.post(endpoints.categories.all, data)
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.categories.all]
			})
		}
	})
}

export const useUpdateCategory = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, ...data }: Category) => {
			return http.put(endpoints.categories.one(id), data)
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.categories.all]
			})
		}
	})
}

export const useDeleteCategory = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return http.delete(endpoints.categories.one(id))
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.categories.all]
			})
		}
	})
}
