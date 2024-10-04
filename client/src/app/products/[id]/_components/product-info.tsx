'use client'
import { Button, Divider, Listbox, ListboxItem } from '@nextui-org/react'
import { BsCartPlus, BsStar, BsStarFill } from 'react-icons/bs'
import { addRating, Product } from '@/actions/products/products.action'
import { useMutation, useQuery } from '@tanstack/react-query'
import { orderEndpoints, productEndpoints } from '@/actions/constants'
import {
	addItemToOrder,
	createOrder,
	getUserOrders
} from '@/actions/orders/orders.action'
import { getQueryClient } from '@/app/get-query-client'
import { makeToast } from '@/utils/makeToast'

interface Props {
	product: Product
}

const calculateRating = (ratings: Product['productRating']) => {
	const sum = ratings.reduce((prev, current) => prev + current.star, 0)
	return Math.floor(sum / ratings.length)
}

export const ProductInfo = ({ product }: Props) => {
	const queryClient = getQueryClient()
	const { data: order } = useQuery({
		queryKey: [orderEndpoints.userOrder],
		queryFn: getUserOrders
	})

	const create = useMutation({
		mutationFn: createOrder,
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [orderEndpoints.userOrder]
			})
		}
	})
	const addItem = useMutation({
		mutationFn: addItemToOrder,
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [orderEndpoints.userOrder]
			})
			makeToast("Tovar savatchaga qo'shildi")
		}
	})

	const addStar = useMutation({
		mutationFn: addRating,
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [productEndpoints.one(product.id)]
			})
		}
	})

	const orderItem = order?.orderItem?.find(
		(item) => item.productId === product.id
	)
	const isExists = Boolean(orderItem)

	return (
		<div>
			<h1 className='text-5xl font-bold'>{product.name}</h1>
			<Divider className='my-4' />
			<p className='text-large'>{product.description}</p>

			<div className='my-4'>
				<p className='text-small font-bold mb-2'>Narxi:</p>
				<p className='text-primary text-2xl font-bold'>
					{new Intl.NumberFormat('uz-UZ', {
						style: 'currency',
						currency: 'UZS'
					}).format(
						orderItem ? orderItem.quantity * product.price : product.price
					)}
				</p>
			</div>
			<div className='flex gap-2 items-center text-4xl my-8'>
				<div className='flex gap-2 text-orange-500'>
					{Array.from({ length: 5 }).map((_, i) => (
						<span
							key={i}
							onClick={() =>
								addStar.mutate({
									productId: product.id,
									star: i + 1
								})
							}>
							{i < calculateRating(product.productRating) ? (
								<BsStarFill />
							) : (
								<BsStar className='hover:fill-orange-500' />
							)}
						</span>
					))}
				</div>
			</div>
			<div className='flex gap-4'>
				<Button
					size='lg'
					color={isExists ? 'success' : 'primary'}
					className='w-full text-white'
					variant='shadow'
					isDisabled={isExists}
					isLoading={create.isPending || addItem.isPending}
					onClick={() => {
						if (order) {
							return addItem.mutate({
								productId: product.id,
								orderId: order.id
							})
						}
						return create.mutate(product.id)
					}}
					startContent={<BsCartPlus size='1.4em' />}>
					{isExists ? "Savatchaga qo'shilgan" : "Savatchaga qo'shish"}
				</Button>
			</div>
			<Divider className='my-8' />
			<h2 className='text-large font-bold mb-4'>Tovar Ma&apos;lumotlar</h2>
			<Listbox>
				{product.information.map((info) => {
					return (
						<ListboxItem
							key={info.id}
							startContent={<b>{info.name}</b>}
							endContent={info.value}
						/>
					)
				})}
			</Listbox>
		</div>
	)
}
