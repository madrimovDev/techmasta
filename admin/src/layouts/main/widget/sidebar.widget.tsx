import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { Link, useLocation } from 'react-router-dom'
import {
	ContainerOutlined,
	DeliveredProcedureOutlined,
	FlagOutlined,
	HomeOutlined,
	ProductOutlined
} from '@ant-design/icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../app/providers/theme.provider.tsx'

const menuItems: ItemType[] = [
	{
		key: '/',
		label: <Link to='/'>Dashboard</Link>,
		icon: <HomeOutlined />
	},
	{
		key: '/categories',
		label: <Link to='/categories'>Kategoriyalar</Link>,
		icon: <FlagOutlined />
	},
	{
		key: '/products',
		label: <Link to='/products'>Tavarlar</Link>,
		icon: <ProductOutlined />
	},
	{
		key: '/posts',
		label: <Link to='/posts'>Postlar</Link>,
		icon: <ContainerOutlined />
	},
	{
		key: '/shipping-services',
		label: <Link to='/shipping-services'>Pochtalar</Link>,
		icon: <DeliveredProcedureOutlined />
	}
]

const SidebarWidget = () => {
	const { pathname } = useLocation()
	const theme = useContext(ThemeContext)
	const key = pathname.split('/').at(1)
	return (
		<Layout.Sider collapsible>
			<Menu
				className='bg-transparent'
				items={menuItems}
				theme={theme?.mode}
				selectedKeys={[key ? `/${key}` : pathname]}
			/>
		</Layout.Sider>
	)
}

export default SidebarWidget
