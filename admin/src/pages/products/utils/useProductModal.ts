import { create } from 'zustand'

export const useProductModal = create<StoreType.ModalState<unknown>>(set => ({
	open: false,
	data: null,
	onOpen(data) {
		set({
			open: true,
			data: data
		})
	},
	onClose() {
		set({
			open: false,
			data: null
		})
	}
}))
