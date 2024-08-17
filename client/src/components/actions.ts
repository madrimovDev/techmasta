'use server'
import { apiClient } from '@/utils'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

export const addOrderItem = async (productId: number) => {
	const accessToken = cookies().get('accessToken')
	if (!accessToken) {
		return revalidateTag('/auth/refresh')
	}
	await apiClient.post(
		'/order',
		{
			shippingServiceId: 1,
			items: [
				{
					productId: productId,
					quantity: 1
				}
			]
		},
		{
			headers: {
				Authorization: `Bearer ${accessToken.value}`
			}
		}
	)
}
