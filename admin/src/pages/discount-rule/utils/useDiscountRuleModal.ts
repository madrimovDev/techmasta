import { create } from 'zustand'
import { DiscountRule } from './discount-rule.query.ts'

interface State {
	open: boolean
	data: DiscountRule | undefined
	onOpen: (data?: DiscountRule) => void
	onClose: () => void
}

export const useDiscountRuleModal = create<State>(set => ({
	open: false,
	data: undefined,
	onOpen: data => set({ open: true, data }),
	onClose: () => set({ open: false, data: undefined })
}))
