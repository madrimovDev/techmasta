import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren, useContext } from 'react'
import { ThemeContext } from './theme.provider.tsx'

const AntProvider = ({ children }: PropsWithChildren) => {
	const contextValue = useContext(ThemeContext)

	return (
		<ConfigProvider
			theme={{
				token: {
					borderRadius: 16,
					colorPrimary: '#088395',
					borderRadiusLG: 24
				},
				components: {
					Table: {
						colorBgContainer:
							contextValue?.mode === 'dark' ? '#14141490' : '#ffffff90'
					},
					Layout: {
						siderBg: contextValue?.mode === 'dark' ? '#0E0E0F90' : '#ffffff90',
						bodyBg: contextValue?.mode === 'dark' ? '#0b0b0b70' : '#f1f1f170',
						headerBg: contextValue?.mode === 'dark' ? '#0E0E0FC4' : '#ffffffC4',
						footerBg: contextValue?.mode === 'dark' ? '#0E0E0F30' : '#ffffff30',
						triggerBg: 'transparent',
						triggerColor: contextValue?.mode === 'dark' ? 'white' : 'black',
						algorithm: true
					}
				},
				algorithm:
					contextValue?.mode === 'dark'
						? theme.darkAlgorithm
						: theme.defaultAlgorithm
			}}
		>
			{children}
		</ConfigProvider>
	)
}

export default AntProvider
