declare namespace StoreType {
	interface ModalState<T> {
		open: boolean
		data: T | null
		onOpen: (data?: T) => void
		onClose: VoidFunction
	}
}
