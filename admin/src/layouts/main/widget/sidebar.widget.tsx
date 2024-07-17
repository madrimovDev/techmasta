import { Layout, Menu } from 'antd'
import { ItemType } from 'antd/es/menu/interface'
import { Link, useLocation } from 'react-router-dom'
import {
	ContainerOutlined,
	FlagOutlined,
	HomeOutlined,
	ProductOutlined
} from '@ant-design/icons'

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
	}
]

const SidebarWidget = () => {
	const { pathname } = useLocation()
	const key = pathname.split('/').at(1)
	return (
		<Layout.Sider
			theme='light'
			collapsible
		>
			<Menu
				items={menuItems}
				selectedKeys={[key ? `/${key}` : pathname]}
			/>
		</Layout.Sider>
	)
}

export default SidebarWidget
