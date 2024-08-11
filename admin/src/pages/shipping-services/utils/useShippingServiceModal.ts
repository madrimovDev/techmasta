import { create } from 'zustand'
import { ShippingService } from './shipping-service.query.ts'

interface Stete {
	open: boolean
	data?: ShippingService
	onOpen: (data?: ShippingService) => void
	onClose: VoidFunction
}

const initialState = {
	open: false
}

export const useShippingServiceModal = create<Stete>(set => ({
	open: false,
	onClose: () => set(initialState),
	onOpen: data => set({ open: true, data })
}))
