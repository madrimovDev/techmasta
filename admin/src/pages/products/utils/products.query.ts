import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'
import { Category } from '../../categories/utils/category.query.tsx'

export interface CreateProduct {
	name: string
	description: string
	price: number
	categoryId: number
	productType: 'SOFTWARE' | 'HARDWARE'
	poster: File
}

export interface ProductImage {
	id: number
	url: string
	productId: number
}

export interface ProductInformation {
	id: number
	name: string
	value: string
}

export interface ProductComment {
	id: number
	userId: number
	productId: number
	comment: string
	repliedId?: string
	user: {
		fullName: string
		id: number
	}
}

export interface Product {
	id: number
	name: string
	description: string
	price: number
	categoryId: number
	category: Category
	postId: number | null
	url: string | null
	poster: string
	productType: 'SOFTWARE' | 'HARDWARE'
	productRating: { star: number }[]
	productComment: ProductComment[]
}

export interface ProductWithDetail extends Product {
	information: ProductInformation[]
	images: ProductImage[]
}

export interface AddImage {
	productId: number
	image: File
}

export const useCreateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: CreateProduct) => {
			return http.post(endpoints.products.all, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.all]
			})
		}
	})
}

export const useGetProducts = () => {
	return useQuery({
		queryKey: [endpoints.products.all],
		queryFn: () => http.get<Product[]>(endpoints.products.all),
		select(data) {
			return data.data
		}
	})
}

export const useGetProduct = (id: number, enable = false) => {
	return useQuery({
		queryKey: [endpoints.products.one(id)],
		queryFn: () => http.get<ProductWithDetail>(endpoints.products.one(id)),
		select: data => data.data,
		enabled: enable && id > 0
	})
}

export const useUpdateProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: Partial<CreateProduct> & { id: number }) => {
			return http.put(endpoints.products.one(data.id), data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
		},
		onSuccess: (_, args) => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.id)]
			})

			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.all]
			})
		}
	})
}

export const useRemoveProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return http.delete(endpoints.products.one(id))
		},
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.all]
			})
		}
	})
}

export const useAddImage = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (data: AddImage) => {
			return http.post(endpoints.products.image, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				}
			})
		},
		onSuccess(_, args) {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.productId)]
			})
		}
	})
}

export const useRemoveImage = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number; productId: number }) => {
			return http.delete(endpoints.products.imageOne(id))
		},
		onSuccess(_, args) {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.productId)]
			})
		}
	})
}

export const useAddInformation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, ...data }: ProductInformation) => {
			return http.post(endpoints.products.informationOne(id), data)
		},
		onSuccess: (_, args) => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.id)]
			})
		}
	})
}

export const useUpdateInformation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({
			id,
			...data
		}: Partial<ProductInformation> & { id: number; productId: number }) => {
			return http.put(endpoints.products.informationOne(id), data)
		},
		onSuccess: (_, args) => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.productId)]
			})
		}
	})
}

export const useRemoveInformation = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id }: { id: number; productId: number }) => {
			return http.delete(endpoints.products.informationOne(id))
		},
		onSuccess: (_, args) => {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(args.productId)]
			})
		}
	})
}

export const useAddSoftToProduct = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async ({ id, software }: { id: number; software: File }) => {
			return http.post(
				endpoints.products.addSoft(id),
				{
					software
				},
				{
					headers: {
						'Content-Type': 'multipart/form-data'
					}
				}
			)
		},
		onSuccess(_, arg) {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.one(arg.id)]
			})
			void queryClient.invalidateQueries({
				queryKey: [endpoints.products.all]
			})
		}
	})
}

export const useGetProductComments = (id: number) => {
	return useQuery({
		queryKey: [endpoints.products.allComments(id)],
		queryFn: async () => {
			return http.get<ProductComment[]>(endpoints.products.allComments(id))
		},
		select(res) {
			return res.data
		},
		enabled: id > 0
	})
}
