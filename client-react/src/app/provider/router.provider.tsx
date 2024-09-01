import { RouterProvider as Provider } from 'react-router-dom'
import { router } from '../config/routers'

export const RouterProvider = () => {
	return (
		<Provider router={router} />
	)
}