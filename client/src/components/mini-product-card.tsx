import { IProduct } from '@/fake/fake-data'
import { Button, Card, CardFooter, Image, Tooltip } from '@nextui-org/react'
import NextImage from 'next/image'
import { BsCart, BsEye } from 'react-icons/bs'

interface Props {
	product: IProduct
}

export const MiniProductCard = ({ product }: Props) => {
	return (
		<Card
			className='h-[350px]'
			isFooterBlurred
			classNames={{ footer: 'bg-black/50 text-white' }}>
			<Image
				as={NextImage}
				src={product.image}
				width={200}
				height={200}
				alt={product.title}
				removeWrapper
				className='w-full h-full object-cover object-center z-0'
			/>
			<CardFooter className='absolute bottom-0 inset-x-0 z-10 py-4'>
				<div className='flex flex-col  gap-2'>
					<Tooltip content={product.title}>
						<h4 className='font-bold text-large line-clamp-1 pr-8'>
							{product.title}
						</h4>
					</Tooltip>
					<Tooltip
						content={product.description}
						placement='bottom'
						className='max-w-sm'>
						<p className='line-clamp-2 font-medium opacity-80'>
							{product.description}
						</p>
					</Tooltip>
					<p className='text-xl font-bold'>
						{new Intl.NumberFormat('uz', {
							currency: 'UZS',
							style: 'currency',
							maximumFractionDigits: 0
						}).format(product.price)}
					</p>
					<div className='flex gap-2 '>
						<Button
							size='sm'
							color='primary'
							className='w-full'>
							<BsEye />
						</Button>
						<Button
							size='sm'
							color='warning'
							className='w-full'>
							<BsCart />
						</Button>
					</div>
				</div>
			</CardFooter>
		</Card>
	)
}
