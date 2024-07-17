import { createBrowserRouter } from 'react-router-dom'
import {
	AuthPage,
	CategoriesPage,
	PostPage,
	PostsPage,
	ProductsPage
} from './lazy.pages.ts'
import CheckAuthPage from '../../pages/auth/check-auth.page.tsx'
import { MainLayout } from '../../layouts'
import { SuspenseWithLoading } from '../../shared/ui'

type Router = ReturnType<typeof createBrowserRouter>

export const router: Router = createBrowserRouter([
	{
		path: '/auth',
		element: <CheckAuthPage checkFor={'auth'} />,
		children: [
			{
				index: true,
				element: <SuspenseWithLoading element={<AuthPage />} />
			}
		]
	},
	{
		path: '/',
		element: <CheckAuthPage checkFor={'main'} />,
		children: [
			{
				path: '',
				element: <MainLayout />,
				children: [
					{
						path: 'categories',
						element: <SuspenseWithLoading element={<CategoriesPage />} />
					},
					{
						path: 'products',
						element: <SuspenseWithLoading element={<ProductsPage />} />
					},
					{
						path: 'posts',
						element: <SuspenseWithLoading element={<PostsPage />} />
					},
					{
						path: 'posts/:id',
						element: <SuspenseWithLoading element={<PostPage />} />
					}
				]
			}
		]
	}
])
