import {
	createContext,
	PropsWithChildren,
	useCallback,
	useEffect,
	useState
} from 'react'

interface IThemeContext {
	mode: 'dark' | 'light'
	toggleTheme: () => void
}

export const ThemeContext = createContext<IThemeContext | null>(null)

const ThemeProvider = ({ children }: PropsWithChildren) => {
	// Determine initial theme based on system preference
	const getSystemTheme = (): IThemeContext['mode'] => {
		if (
			window.matchMedia &&
			window.matchMedia('(prefers-color-scheme: dark)').matches
		) {
			return 'dark'
		}
		return 'light'
	}

	const [mode, setMode] = useState<IThemeContext['mode']>(getSystemTheme())

	const toggleTheme = useCallback(() => {
		setMode(prev => (prev === 'dark' ? 'light' : 'dark'))
	}, [])

	useEffect(() => {
		if (mode === 'light') {
			document.documentElement.className = 'light'
		} else {
			document.documentElement.className = 'dark'
		}
	}, [mode])

	return (
		<ThemeContext.Provider
			value={{
				mode,
				toggleTheme
			}}
		>
			{children}
		</ThemeContext.Provider>
	)
}

export default ThemeProvider
