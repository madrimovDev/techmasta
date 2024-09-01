import {
	Button,
	Card,
	CardBody,
	CardFooter,
	CardHeader
} from '@nextui-org/react'
import { OrderTotalInfo } from '@/app/cart/_ui/order-total-info'
import { formatCurrency } from '@/app/cart/_utils/formatCurrency'
import { Order } from '@/actions/orders/orders.action'
import NextLink from 'next/link'

interface OrderSummaryProps {
	totalOrderSummary: {
		totalItems: number
		totalAmount: number
		totalSavings: number
	}
	order?: Order
}

export const OrderSummary = ({
	totalOrderSummary,
	order
}: OrderSummaryProps) => {
	return (
		<Card shadow='none'>
			<CardHeader>Umumiy Summa</CardHeader>
			<CardBody className='text-large space-y-4'>
				<OrderTotalInfo
					label='Tovarlar soni'
					value={totalOrderSummary?.totalItems}
				/>
				<OrderTotalInfo
					label='Umumiy baxosi'
					value={formatCurrency(totalOrderSummary?.totalAmount)}
				/>
				<OrderTotalInfo
					label="To'lov"
					value={formatCurrency(
						totalOrderSummary?.totalAmount - totalOrderSummary?.totalSavings ?? 0
					)}
				/>
				<OrderTotalInfo
					label='Yetkazib berish'
					value={order?.shippingService.name ?? ''}
				/>
				<OrderTotalInfo
					label='Yetkazib berish baxosi'
					value={`${formatCurrency(order?.shippingService.price ?? 0)} / ${order?.shippingService.unit}`}
				/>
			</CardBody>
			<CardFooter>
				<Button
					as={NextLink}
					href={`cart/${order?.id}`}
					className='w-full'
					color='primary'>
					Buyurtma berish
				</Button>
			</CardFooter>
		</Card>
	)
}
