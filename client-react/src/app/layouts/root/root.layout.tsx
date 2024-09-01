import { Outlet } from 'react-router-dom'
import { Navbar } from '~/app/layouts/components/navbar.tsx'

export const RootLayout = () => {
	return (
		<div>
			<Navbar />
			<Outlet />
		</div>
	)
}