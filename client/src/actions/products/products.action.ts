'use server'

import { apiClient } from '@/utils'
import { User } from '@/actions/auth/auth.action'
import { productEndpoints } from '@/actions/constants'

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
	images: ProductImage[]
	productRating: ProductRating[]
	productComment: ProductComment[]
	information: ProductInformation[]
}

export interface ProductInformation {
	id: number
	name: string
	value: string
	productId: number
	createdAt: string
}

export interface ProductImage {
	id: number
	url: string
	productId: number
	createdAt: string
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
	user: User
}

export const getProducts = async () => {
	const response = await apiClient.get<Product[]>(productEndpoints.all)
	return response
}

export const getProduct = async (id: number) => {
	const response = await apiClient.get<Product>(productEndpoints.one(id))
	return response
}

export const addRating = async ({
	productId,
	star
}: {
	productId: number
	star: number
}) => {
	try {
		const response = await apiClient.post(productEndpoints.rating(productId), {
			star
		})
		return response
	} catch (e) {
		return e
	}
}
