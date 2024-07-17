interface LocalStorage {
	// eslint-disable-next-line
	setItem: (key: string, value: any) => void
	getItem: <T>(key: string) => T | null
	removeItem: (key: string) => void
	clear: () => void
}

export const localStorage: LocalStorage = {
	setItem(key, value) {
		window.localStorage.setItem(key, JSON.stringify(value))
	},
	getItem(key: string) {
		const item = window.localStorage.getItem(key)
		return item ? JSON.parse(item) : null
	},
	removeItem(key: string) {
		window.localStorage.removeItem(key)
	},
	clear() {
		window.localStorage.clear()
	}
}
