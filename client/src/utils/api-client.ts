import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { getCookie, setCookie } from '@/utils/getCookie' // accessToken bilan ishlash

export class APIClient {
	private axiosInstance: AxiosInstance
	private isRefreshing = false
	private refreshSubscribers: Array<(token: string) => void> = []

	constructor(baseUrl: string) {
		this.axiosInstance = axios.create({
			baseURL: baseUrl,
			headers: {
				'Content-Type': 'application/json'
			},
			withCredentials: true // Credentialsni yuborish (cookie)
		})

		this.axiosInstance.interceptors.request.use(
			async (config) => {
				const accessToken = await getCookie('accessToken')

				if (accessToken) {
					config.headers.Authorization = `Bearer ${accessToken}`
				}
				return config
			},
			(error) => Promise.reject(error)
		)

		this.axiosInstance.interceptors.response.use(
			(response: AxiosResponse) => response.data,
			async (error) => {
				const originalRequest = error.config

				// Token expired (status 401 and message "token has expired")
				if (
					error.response?.status === 401 &&
					error.response?.data?.message === 'Token has expired'
				) {
					if (!this.isRefreshing) {
						this.isRefreshing = true

						try {
							const refreshedToken = await this.refreshToken() // Refresh tokenni olish (cookie orqali)
							this.isRefreshing = false
							this.onRefreshed(refreshedToken)

							// Asl so'rovni yangilangan access token bilan yuborish
							originalRequest.headers.Authorization = `Bearer ${refreshedToken}`
							return this.axiosInstance(originalRequest)
						} catch (refreshError) {
							this.isRefreshing = false
							return Promise.reject(refreshError)
						}
					}

					return new Promise((resolve, reject) => {
						this.subscribeTokenRefresh((token) => {
							originalRequest.headers.Authorization = `Bearer ${token}`
							resolve(this.axiosInstance(originalRequest))
						})
					})
				}

				const errorMessage =
					error.response?.data?.message ||
					error.message ||
					'Noma’lum xatolik yuz berdi'
				const status = error.response?.status || 500
				const errorData = {
					message: errorMessage,
					status,
					...(error.response?.data || {})
				}
				return Promise.reject(errorData)
			}
		)
	}

	// Refresh token olish (cookie orqali yuboriladi)
	private async refreshToken(): Promise<string> {
		try {
			// Backend refresh tokenni cookie orqali yuboradi va yangilangan access token qaytaradi
			const response = await this.axiosInstance.get<{ accessToken: string }>(
				'/auth/refresh'
			)

			const newAccessToken = response.data.accessToken
			await setCookie('accessToken', newAccessToken) // Yangilangan tokenni saqlash
			return newAccessToken
		} catch (error) {
			throw new Error('Failed to refresh token')
		}
	}

	// Asl so'rovlarni yangilangan token bilan davom ettirish
	private subscribeTokenRefresh(callback: (token: string) => void) {
		this.refreshSubscribers.push(callback)
	}

	private onRefreshed(token: string) {
		this.refreshSubscribers.forEach((callback) => callback(token))
		this.refreshSubscribers = []
	}

	// CRUD funksiyalari
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
