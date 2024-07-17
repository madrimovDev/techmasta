import { create } from 'zustand'

export const usePostDrawer = create<StoreType.ModalState<any>>(set => ({
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