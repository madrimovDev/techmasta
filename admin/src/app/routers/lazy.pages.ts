import { lazy } from 'react'

export const AuthPage = lazy(() => import('../../pages/auth/auth.page'))
export const CategoriesPage = lazy(
	() => import('../../pages/categories/categories.page.tsx')
)
export const ProductsPage = lazy(
	() => import('../../pages/products/products.page.tsx')
)
export const PostsPage = lazy(() => import('../../pages/posts/posts.page'))
export const PostPage = lazy(() => import('../../pages/posts/post.page'))
