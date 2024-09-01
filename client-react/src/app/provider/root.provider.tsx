import { UiProvider } from './ui.provider.tsx'
import { RouterProvider } from './router.provider.tsx'

export const RootProvider = () => {
	return (
		<UiProvider>
			<RouterProvider />
		</UiProvider>
	)
}