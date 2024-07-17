import { Category } from './category.query.tsx'
import { create } from 'zustand'

export const useCategoryModal = create<StoreType.ModalState<Category>>(set => ({
	data: null,
	open: false,
	onOpen(data) {
		set({
			open: true,
			data
		})
	},
	onClose() {
		set({
			data: null,
			open: false
		})
	}
}))
