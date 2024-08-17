'use server'
import { APIClient } from '@/utils'

const apiClient = new APIClient('http://localhost:3022/api/v1/auth')

export const registerAction = async (formData: FormData) => {
	try {
		const data = Object.fromEntries(formData.entries())
		const response = await apiClient.post<any>('/register', { ...data, roleId: 2 })
		return response
	} catch (err) {
		return err
	}
}
