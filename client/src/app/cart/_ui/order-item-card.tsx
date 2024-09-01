import { Image } from '@nextui-org/react'
import NextImage from 'next/image'
import { calculateTotalPrice } from '../_utils/calculateTotalPrice'
import { QuantityButtons } from '@/app/cart/_ui/quantity-buttons'
import { formatCurrency } from '@/app/cart/_utils/formatCurrency'
import { OrderItem } from '@/actions/orders/orders.action'
import { OrderTotalInfo } from '@/app/cart/_ui/order-total-info'

interface OrderItemCardProps {
	item: OrderItem
	handleQuantityChange: (itemId: number, newQuantity: number) => void
}

export const OrderItemCard = ({
	item,
	handleQuantityChange
}: OrderItemCardProps) => {
	const { product, quantity } = item
	const { price, name, category, discount, discountAfterCount, poster } =
		product

	const totalPriceData = calculateTotalPrice(
		price,
		quantity,
		discount,
		discountAfterCount
	)

	return (
		<div className='flex gap-4 border p-4 rounded-medium'>
			<Image
				as={NextImage}
				width={140}
				height={140}
				alt={name}
				className='h-full border p-1'
				classNames={{ img: 'object-contain' }}
				src={
					poster.startsWith('http') ? poster : `http://localhost:3022/${poster}`
				}
			/>
			<div className='grid grid-cols-3 gap-4 w-full'>
				<div>
					<h2 className='font-bold'>{name}</h2>
					<p className='font-bold'>{category.name}</p>
				</div>
				<div className=''>
					{Boolean(discount) && Boolean(discountAfterCount) && (
						<>
							<p className=''>Chegirma: {discount}%</p>
							<p className=''>
								Chegirma {discountAfterCount} ta tovardan keyin
							</p>
						</>
					)}
				</div>
				<div className='flex flex-col items-end gap-2'>
					<QuantityButtons
						itemId={item.id}
						quantity={quantity}
						handleQuantityChange={handleQuantityChange}
					/>
					<p className='flex flex-col items-end gap-2 w-full max-w-fit'>
						<OrderTotalInfo
							label='Baxosi'
							value={formatCurrency(price)}
						/>
						<OrderTotalInfo
							label='Umumiy:'
							value={formatCurrency(totalPriceData.totalPrice)}
						/>

						{Boolean(totalPriceData.savings) && (
							<>
								<OrderTotalInfo
									label='Tejalgan:'
									value={formatCurrency(totalPriceData.savings)}
								/>
							</>
						)}
					</p>
				</div>
			</div>
		</div>
	)
}
