import { useMutation } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'
import { useNavigate } from 'react-router-dom'
import { localStorage } from '../../../shared/utils'

export interface AuthData {
	username: string
	password: string
}

export const useLogin = () => {
	const navigate = useNavigate()
	return useMutation({
		mutationFn: (data: AuthData) => {
			return http.post(endpoints.auth.login, data)
		},
		onSuccess(data) {
			localStorage.setItem('accessToken', data.data.accessToken)
			localStorage.setItem('refreshToken', data.data.refreshToken)
			navigate('/', {
				replace: true
			})
		}
	})
}
