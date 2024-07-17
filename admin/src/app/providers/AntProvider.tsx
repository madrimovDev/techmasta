import { ConfigProvider, theme } from 'antd'
import { PropsWithChildren, useContext } from 'react'
import { ThemeContext } from './theme.provider.tsx'

const AntProvider = ({ children }: PropsWithChildren) => {
	const contextValue = useContext(ThemeContext)

	return (
		<ConfigProvider
			theme={{
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
