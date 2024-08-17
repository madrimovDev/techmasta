'use server'
import { apiClient } from '@/utils'
import { cookies } from 'next/headers'
import { revalidateTag } from 'next/cache'

export interface User {
	id: number
	fullName: string
	username: string
	password: string
	phone: string
	address: any
	roleId: number
	createdAt: string
	updatedAt: string
	role: Role
}

export interface Role {
	id: number
	name: string
}

export const getProfileAction = async () => {
	try {
		const accessToken = cookies().get('accessToken')
		if (!accessToken) throw { status: 401, message: 'Token has expired' }
		const response = await apiClient.get<User>('/auth/profile', {
			headers: {
				Authorization: `Bearer ${accessToken.value}`
			}
		})
		return response
	} catch (e) {
		const error = e as unknown as {
			statusCode: number
			message: string
		}

		if (error.statusCode === 401 && error.message === 'Token has expired') {
			const refreshToken = cookies().get('refreshToken')

			const response = await apiClient.post<any>('/auth/refresh', {
				headers: {
					Authorization: `Bearer ${refreshToken?.value}`
				}
			})
			cookies().set('accessToken', response.data.accessToken, {
				httpOnly: true
			})
			console.log(response)
			revalidateTag('/auth/profile')
		}
	}
}
