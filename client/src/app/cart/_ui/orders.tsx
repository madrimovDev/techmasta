'use client'
import { useMutation, useSuspenseQuery } from '@tanstack/react-query'
import { getUserOrders, itemQuantity } from '@/actions/orders/orders.action'
import { orderEndpoints } from '@/actions/constants'
import { getQueryClient } from '@/app/get-query-client'
import { Divider } from '@nextui-org/react'
import { calculateTotalPrice } from '@/app/cart/_utils/calculateTotalPrice'
import { OrderItemCard } from '@/app/cart/_ui/order-item-card'
import { OrderSummary } from '@/app/cart/_ui/order-summary'
import { BsCart } from 'react-icons/bs'

export const Orders = () => {
	const queryClient = getQueryClient()
	const { data } = useSuspenseQuery({
		queryFn: getUserOrders,
		queryKey: [orderEndpoints.userOrder]
	})

	const quantityMutation = useMutation({
		mutationFn: itemQuantity,
		onSuccess: () => {
			void queryClient.invalidateQueries({
				queryKey: [orderEndpoints.userOrder]
			})
		}
	})

	const handleQuantityChange = (itemId: number, newQuantity: number) => {
		quantityMutation.mutate({ itemId, quantity: newQuantity })
	}

	const totalOrderSummary = data?.orderItem?.reduce(
		(acc, item) => {
			const { totalPrice, savings } = calculateTotalPrice(
				item.product.price,
				item.quantity,
				item.product.discount,
				item.product.discountAfterCount
			)
			acc.totalAmount += totalPrice
			acc.totalSavings += savings
			acc.totalItems += item.quantity
			return acc
		},
		{
			totalAmount: 0,
			totalSavings: 0,
			totalItems: 0
		}
	)

	if (!data) {
		return (
			<div className='text-center py-14'>
				<h1 className='text-4xl font-bold'>Savatingnizda maxsulot yo&apos;q</h1>
				<BsCart />
			</div>
		)
	}

	return (
		<div className='container py-8'>
			<h1 className='text-2xl'>Sizning savatingiz</h1>
			<Divider className='my-8' />
			<div className='grid grid-cols-12 gap-8'>
				<div className='col-span-9 flex flex-col gap-4'>
					{!data.orderItem.length && (
						<p className='text-center text-2xl font-bold opacity-50'>
							Sizning Savatingiz bo&apos;sh
						</p>
					)}
					{data?.orderItem?.map((item) => (
						<OrderItemCard
							key={item.id}
							item={item}
							handleQuantityChange={handleQuantityChange}
						/>
					))}
				</div>
				<div className='col-span-3'>
					<OrderSummary
						order={data}
						totalOrderSummary={totalOrderSummary}
					/>
				</div>
			</div>
		</div>
	)
}
