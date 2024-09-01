import { apiClient } from '@/utils'
import { authEndpoints } from '@/actions/constants'
import Cookies from 'js-cookie'

export interface LoginRequest {
	username: string
	password: string
}

export interface RegisterRequest extends LoginRequest {
	fullName: string
	phone: string
}

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

export const login = async (data: LoginRequest): Promise<string> => {
	try {
		const response = await apiClient.post<string>(authEndpoints.login, data)
		Cookies.set('accessToken', response)
		return response
	} catch (e) {
		return e as string
	}
}

export const register = async (data: RegisterRequest): Promise<string> => {
	try {
		const response = await apiClient.post<string>(authEndpoints.register, {
			...data,
			roleId: 2
		})
		Cookies.set('accessToken', response)
		return response
	} catch (e) {
		return e as string
	}
}

export const logout = () => {
	window.location.reload()
	Cookies.remove('accessToken')
	Cookies.remove('refreshToken')
}

export const profile = async (): Promise<User> => {
	try {
		const response = await apiClient.get<User>(authEndpoints.profile)
		return response
	} catch (e) {
		return e as User
	}
}
