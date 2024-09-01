'use client'
import { Button, ButtonGroup } from '@nextui-org/react'
import { BsChevronLeft, BsChevronRight, BsTrash } from 'react-icons/bs'
import { useMutation } from '@tanstack/react-query'
import { removeItemFromOrder } from '@/actions/orders/orders.action'
import { getQueryClient } from '@/app/get-query-client'
import { orderEndpoints } from '@/actions/constants'

interface QuantityButtonsProps {
	itemId: number
	quantity: number
	handleQuantityChange: (itemId: number, newQuantity: number) => void
}

export const QuantityButtons = ({
	itemId,
	quantity,
	handleQuantityChange
}: QuantityButtonsProps) => {
	const queryClient = getQueryClient()
	const removeItem = useMutation({
		mutationFn: removeItemFromOrder,
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [orderEndpoints.userOrder]
			})
		}
	})
	return (
		<div className='flex gap-2'>
			<ButtonGroup
				size='sm'
				variant='flat'>
				<Button
					isIconOnly
					onClick={() =>
						handleQuantityChange(itemId, Math.max(1, quantity - 1))
					}>
					<BsChevronLeft />
				</Button>
				<Button isIconOnly>{quantity}</Button>
				<Button
					isIconOnly
					onClick={() => handleQuantityChange(itemId, quantity + 1)}>
					<BsChevronRight />
				</Button>
			</ButtonGroup>
			<Button
				isIconOnly
				size='sm'
				color='danger'
				onClick={() => removeItem.mutate(itemId)}
				variant='bordered'>
				<BsTrash />
			</Button>
		</div>
	)
}
