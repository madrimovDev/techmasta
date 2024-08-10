'use client'
import {
	Button,
	ButtonGroup,
	Divider,
	Listbox,
	ListboxItem
} from '@nextui-org/react'
import {
	BsBag,
	BsCartPlus,
	BsDash,
	BsPlus,
	BsStar,
	BsStarFill
} from 'react-icons/bs'
import { Product } from '@/app/products/[id]/_utils/fetch-product'

interface Props {
	product: Product
}

const calculateRating = (ratings: Product['productRating']) => {
	const sum = ratings.reduce((prev, current) => prev + current.star, 0)
	return Math.floor(sum / ratings.length)
}

export const ProductInfo = ({ product }: Props) => {
	return (
		<div>
			<h1 className='text-5xl font-bold'>{product.name}</h1>
			<Divider className='my-4' />
			<p className='text-large'>{product.description}</p>
			<div className='my-4'>
				<p className='text-small font-bold mb-2'>Miqdor:</p>
				<ButtonGroup
					isIconOnly
					variant='solid'
					className='border rounded-medium'>
					<Button className='bg-white'>
						<BsDash />
					</Button>
					<Button className='bg-white'>1</Button>
					<Button className='bg-white'>
						<BsPlus />
					</Button>
				</ButtonGroup>
			</div>
			<div className='my-4'>
				<p className='text-small font-bold mb-2'>Narxi:</p>
				<p className='text-primary text-2xl font-bold'>
					{new Intl.NumberFormat('uz-UZ', {
						style: 'currency',
						currency: 'UZS'
					}).format(product.price)}
				</p>
			</div>
			<div className='flex gap-2 items-center text-4xl my-8'>
				<div className='flex gap-2 text-orange-500'>
					{Array.from({ length: 5 }).map((_, i) => (
						<span key={i}>
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
					color='primary'
					className='w-full'
					variant='shadow'
					startContent={<BsCartPlus size='1.4em' />}>
					Savatchaga qo&apos;shish
				</Button>
				<Button
					size='lg'
					className='w-full'
					color='primary'
					variant='bordered'
					startContent={<BsBag size='1.4em' />}>
					Sotib Olish
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
