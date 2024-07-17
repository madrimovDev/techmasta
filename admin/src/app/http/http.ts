import axios from 'axios'
import { localStorage } from '../../shared/utils'
import { endpoints } from './constants'

// create an axios instance
const http = axios.create({
	baseURL: import.meta.env.VITE_APP_BASE_URL
})

// request interceptor to add the authorization header
http.interceptors.request.use(
	config => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			config.headers.Authorization = `Bearer ${accessToken}`
		}
		return config
	},
	error => {
		console.log(error)
		return Promise.reject(error)
	}
)

// response interceptor to handle 401 status and token refreshing
http.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config
		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._isRetry
		) {
			originalRequest._isRetry = true
			const refreshToken = localStorage.getItem('refreshToken')
			if (!refreshToken) {
				// If there's no refresh token, remove any tokens and redirect to auth page
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/auth' // Use this if you are not using react-router-dom
				return Promise.reject(error)
			}

			try {
				const response = await axios.post(endpoints.auth.refresh, {
					refreshToken: refreshToken
				})

				const newAccessToken = response.data.accessToken
				localStorage.setItem('accessToken', newAccessToken)

				// Update the Authorization header in the original request
				originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`

				// Retry the original request with the new token
				return axios(originalRequest)
			} catch (refreshError) {
				// If the refresh token fails, log out the user or handle accordingly
				console.error('Token refresh failed:', refreshError)
				localStorage.removeItem('accessToken')
				localStorage.removeItem('refreshToken')
				window.location.href = '/auth' // Use this if you are not using react-router-dom
				return Promise.reject(refreshError)
			}
		}

		return Promise.reject(error)
	}
)

export default http
