import { create } from 'zustand'

interface State {
	open: boolean
	productId: number
	onOpen: (id: number) => void
	onClose: VoidFunction
}

export const useProductCommentStore = create<State>(set => ({
	productId: 0,
	open: false,
	onClose: () => set({ open: false }),
	onOpen: id => set({ open: true, productId: id })
}))
