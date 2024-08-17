'use server'
import { APIClient } from '@/utils'
import { cookies } from 'next/headers'

const apiClient = new APIClient('http://localhost:3022/api/v1/auth')

export const loginAction = async (formData: FormData) => {
	try {
		const data = Object.fromEntries(formData.entries())
		const response = await apiClient.post<any>('/login', data)
		cookies().set('refreshToken', response.refreshToken, {
			httpOnly: true
		})
		cookies().set('accessToken', response.accessToken, {
			httpOnly: true
		})
		return response
	} catch (err) {
		return err
	}
}
