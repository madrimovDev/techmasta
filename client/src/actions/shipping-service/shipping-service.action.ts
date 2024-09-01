import { apiClient } from '@/utils'
import { shippingServiceEndpoints } from '@/actions/constants'

export interface ShippingService {
	id: number
	name: string
	description: string
	price: number
	unit: string
}

export const getShippingServices = async (): Promise<ShippingService[]> => {
	try {
		const response = await apiClient.get<ShippingService[]>(
			shippingServiceEndpoints.all
		)
		return response
	} catch (e) {
		return e as ShippingService []
	}
}
