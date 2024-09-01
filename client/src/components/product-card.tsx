'use client'
import {
	Button,
	Card,
	CardBody,
	CardFooter,
	Chip,
	Image,
	Tooltip
} from '@nextui-org/react'
import NextImage from 'next/image'
import { BsCartPlus, BsHeart } from 'react-icons/bs'
import NextLink from 'next/link'
import { Product } from '@/actions/products/products.action'

interface Props {
	product: Product
}

export const ProductCard = ({ product }: Props) => {
	return (
		<Card
			isHoverable
			as={NextLink}
			href={`/products/${product.id}`}>
			<CardBody>
				<div className='relative h-[200px]'>
					<div className='absolute inset-0 flex flex-col gap-2 items-end justify-start z-10 p-2'>
						<Chip className=''>{product.category.name}</Chip>
						<Chip
							color='danger'
							variant='faded'
							startContent={<BsHeart />}>
							{product.productRating.length}
						</Chip>
					</div>
					<Image
						alt={product.name}
						removeWrapper
						className='w-full h-full object-cover z-0'
						as={NextImage}
						src={
							product.poster.startsWith('http')
								? product.poster
								: 'http://localhost:3022/' + product.poster
						}
						width={300}
						height={400}
					/>
				</div>
				<div className='mt-4 space-y-2'>
					<h3 className='text-large font-medium'>{product.name}</h3>
					<Tooltip
						content={product.description}
						className='max-w-sm'>
						<p className='text-small  overflow-hidden text-ellipsis line-clamp-2'>
							{product.description}
						</p>
					</Tooltip>
				</div>
			</CardBody>
			<CardFooter>
				<div className='w-full grid grid-cols-2 gap-4'>
					<p className='text-medium font-medium text-primary'>
						{new Intl.NumberFormat('uz', {
							currency: 'UZS',
							style: 'currency',
							maximumFractionDigits: 0
						}).format(+product.price)}
					</p>
					<Button
						variant='solid'
						color='primary'
						size='sm'
						className='w-full'>
						<BsCartPlus size='1.3em' />
						Sotib Olish
					</Button>
				</div>
			</CardFooter>
		</Card>
	)
}
