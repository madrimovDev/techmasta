import { StyleProvider } from '@ant-design/cssinjs'
import RouterProvider from './router.provider.tsx'
import QueryProvider from './query.provider.tsx'
import ThemeProvider from './theme.provider.tsx'
import AntProvider from './ant.provider.tsx'

const RootProvider = () => {
	return (
		<ThemeProvider>
			<StyleProvider layer>
				<AntProvider>
					<QueryProvider>
						<RouterProvider />
					</QueryProvider>
				</AntProvider>
			</StyleProvider>
		</ThemeProvider>
	)
}

export default RootProvider
