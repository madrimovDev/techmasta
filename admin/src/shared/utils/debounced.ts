type DebouncedFunction<T extends (...args: any[]) => void> = (
	...args: Parameters<T>
) => void

export const debounce = <T extends (...args: any[]) => void>(
	func: T,
	wait: number
): DebouncedFunction<T> => {
	let timeout: ReturnType<typeof setTimeout> | null = null

	return (...args: Parameters<T>): void => {
		if (timeout !== null) {
			clearTimeout(timeout)
		}
		timeout = setTimeout(() => {
			func(...args)
		}, wait)
	}
}
