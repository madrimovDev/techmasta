import { create } from 'zustand'

interface State {
	productId: number
	open: boolean
	onOpen: (productId: number) => void
	onClose: VoidFunction
}

export const useProductDrawer = create<State>(set => ({
	open: false,
	productId: -1,
	onOpen: (productId: number) => set({ open: true, productId }),
	onClose: () => set({ open: false })
}))
