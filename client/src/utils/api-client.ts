import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie } from '@/utils/getCookie'

export class APIClient {
	private axiosInstance: AxiosInstance

	constructor(baseUrl: string) {
		this.axiosInstance = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true
		})

		this.axiosInstance.interceptors.request.use(
			async (config) => {
				let accessToken: string | null | undefined = null

				accessToken = await getCookie('accessToken')

				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`
				}

				return config
			},
			(error) => Promise.reject(error)
		)

		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => response.data,
			(error) => {
				const errorMessage =
					error.response?.data?.message ||
					error.message ||
					'Noma’lum xatolik yuz berdi'
				const status = error.response?.status || 500
				// if (error.response && error.response.data.statusCode === 401) {
				// 	if (!window.location.href.includes('/authorization'))
				// 		return (window.location.href = '/authorization/login')
				// }
				const errorData = {
					message: errorMessage,
					status,
					...(error.response?.data || {})
				}
				return Promise.reject(errorData)
			}
		)
	}

	public get<T>(url: string, config?: AxiosRequestConfig) {
		return this.axiosInstance.get<T>(url, config) as Promise<T>
	}

	public post<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
		return this.axiosInstance.post<T>(url, data, config) as Promise<T>
	}

	public put<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
		return this.axiosInstance.put<T>(url, data, config) as Promise<T>
	}

	public patch<T>(url: string, data: unknown, config?: AxiosRequestConfig) {
		return this.axiosInstance.patch<T>(url, data, config) as Promise<T>
	}

	public delete<T>(url: string, config?: AxiosRequestConfig) {
		return this.axiosInstance.delete<T>(url, config) as Promise<T>
	}
}

export const apiClient = new APIClient('http://localhost:3022/api/v1')
