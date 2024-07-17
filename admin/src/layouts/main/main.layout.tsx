import { Layout } from 'antd'
import HeaderWidget from './widget/header.widget.tsx'
import SidebarWidget from './widget/sidebar.widget.tsx'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
	return (
		<Layout className='h-screen overflow-hidden'>
			<HeaderWidget />
			<Layout>
				<SidebarWidget />
				<Layout.Content className='p-4 relative h-full overflow-y-auto'>
					<Outlet />
				</Layout.Content>
			</Layout>
		</Layout>
	)
}

export default MainLayout
