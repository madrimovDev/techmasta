import { APIClient } from '@/utils'

const apiClient = new APIClient('http://localhost:3022/api/v1/products')

export interface Product {
	id: number
	name: string
	description: string
	price: number
	discount: any
	discountAfterCount: any
	url: any
	poster: string
	productType: string
	postId: any
	categoryId: number
	createdAt: string
	category: Category
	post: any
	productRating: ProductRating[]
	productComment: ProductComment[]
}

export interface Category {
	id: number
	name: string
	description: string
}

export interface ProductRating {
	id: number
	productId: number
	userId: number
	star: number
}

export interface ProductComment {
	id: number
	productId: number
	userId: number
	repliedId: any
	comment: string
	createdAt: string
	updatedAt: string
}

export const getProducts = async () => {
	const response = await apiClient.get<Product[]>('/')
	return response
}
