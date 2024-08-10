import { APIClient } from '@/utils'

const apiClient = new APIClient('http://localhost:3022/api/v1/products/')

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
	images: Image[]
	productRating: ProductRating[]
	productComment: ProductComment[]
	information: Information[]
}

interface ProductRating {
	id: number
	userId: number
	star: number
}

export interface Image {
	id: number
	url: string
	productId: number
	createdAt: string
}

export interface Information {
	id: number
	name: string
	value: string
	productId: number
	createdAt: string
}

export interface ProductComment {
	id: number
	productId: number
	userId: number
	repliedId: any
	comment: string
	createdAt: string
	updatedAt: string
	user: User
}

export interface User {
	id: number
	fullName: string
	username: string
	password: string
	phone: any
	address: any
	roleId: number
	createdAt: string
	updatedAt: string
}

export const getProduct = async (productId: string) => {
	const product = await apiClient.get<Product>(productId, {
		cache: 'no-store',
		next: {
			tags: ['product']
		}
	})
	return product
}
