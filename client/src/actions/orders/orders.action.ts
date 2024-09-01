import { apiClient } from '@/utils/api-client'
import { orderEndpoints } from '@/actions/constants'
import { Category } from '@/actions/products/products.action'
import { User } from '@/actions/auth/auth.action'

export interface Order {
	id: number
	userId: number
	paymentStatus: string
	shippingServiceId: number
	deliveryStatus: string
	createdAt: string
	updatedAt: string
	orderItem: OrderItem[]
	user: User
	shippingService: ShippingService
}

export interface OrderItem {
	id: number
	productId: number
	orderId: number
	quantity: number
	product: Product
}

export interface Product {
	id: number
	name: string
	description: string
	price: number
	discount: number
	discountAfterCount: number
	url: any
	poster: string
	productType: string
	postId: any
	categoryId: number
	createdAt: string
	category: Category
}

export interface ShippingService {
	id: number
	name: string
	description: string
	price: number
	unit: string
}

export const getUserOrders = async () => {
	try {
		const response = await apiClient.get<Order>(orderEndpoints.userOrder)
		return response
	} catch (e) {
		return e as Order
	}
}

export const itemQuantity = async ({
	itemId,
	quantity
}: {
	itemId: number
	quantity: number
}) => {
	try {
		const response = await apiClient.patch<Order>(
			orderEndpoints.itemQuantity(itemId),
			{ quantity }
		)
		return response
	} catch (e) {
		return e
	}
}

export interface AddItemToOrder {
	orderId: number
	productId: number
}

export const addItemToOrder = async ({
	orderId,
	productId
}: AddItemToOrder) => {
	try {
		const response = await apiClient.post(orderEndpoints.item(orderId), {
			productId,
			quantity: 1
		})
		return response
	} catch (e) {
		return e
	}
}

export const removeItemFromOrder = async (itemId: number) => {
	try {
		const response = await apiClient.delete(orderEndpoints.itemQuantity(itemId))
		return response
	} catch (e) {
		return e
	}
}

export const getOrder = async (id: number) => {
	try {
		const response = await apiClient.get<Order>(orderEndpoints.one(id))
		return response
	} catch (e) {
		return e as Order
	}
}
