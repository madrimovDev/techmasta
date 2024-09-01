import { NextUIProvider } from '@nextui-org/react'
import { PropsWithChildren } from 'react'

export const UiProvider = ({children}: PropsWithChildren) => {
	return (
		<NextUIProvider >
			{children}
		</NextUIProvider>
	)
}