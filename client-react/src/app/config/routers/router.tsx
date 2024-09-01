import { createBrowserRouter } from 'react-router-dom'
import { RootLayout } from '~/app/layouts/root/root.layout.tsx'
import { Suspense } from 'react'
import { HomePage } from '~/app/config/routers/lazy-pages.tsx'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{
				path: '/',
				element: (
					<Suspense fallback='Loading'>
						<HomePage />
					</Suspense>
				)
			}
		]
	}
])
