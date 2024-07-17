import { Button, Dropdown } from 'antd'
import { LogoutOutlined, SettingOutlined, SunOutlined } from '@ant-design/icons'
import { useContext } from 'react'
import { ThemeContext } from '../../../app/providers/theme.provider.tsx'

const SettingsButton = () => {
	const contextValue = useContext(ThemeContext)
	return (
		<Dropdown
			trigger={['click']}
			menu={{
				items: [
					{
						key: 'theme',
						onClick: () => {
							contextValue?.toggleTheme()
						},
						icon: <SunOutlined />,
						label: 'Rejim'
					},
					{
						key: 'logout',
						icon: <LogoutOutlined />,
						danger: true,
						label: 'Chiqish'
					}
				]
			}}
		>
			<Button type='text'>
				<SettingOutlined />
			</Button>
		</Dropdown>
	)
}

export default SettingsButton
