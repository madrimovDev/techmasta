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
import { BsCartCheck, BsCartPlus, BsHeart } from 'react-icons/bs'
import { IProduct } from '@/fake/fake-data'
import NextLink from 'next/link'

interface Props {
	product: IProduct
}

export const ProductCard = ({ product }: Props) => {
	return (
		<Card isHoverable>
			<CardBody
				as={NextLink}
				href={`/products/${product.id}`}>
				<div className='relative h-[200px]'>
					<div className='absolute inset-0 flex flex-col gap-2 items-end justify-start z-10 p-2'>
						<Chip className=''>{product.category.name}</Chip>
						<Chip
							color='danger'
							variant='faded'
							startContent={<BsHeart />}>
							{product.likes}
						</Chip>
					</div>
					<Image
						alt={product.title}
						removeWrapper
						className='w-full h-full object-cover z-0'
						as={NextImage}
						src={product.image}
						width={300}
						height={400}
					/>
				</div>
				<div className='mt-4 space-y-2'>
					<h3 className='text-large font-medium'>{product.title}</h3>
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
					{product.id % 2 === 0 ? (
						<Button
							variant='solid'
							color='primary'
							size='sm'
							className='w-full'>
							<BsCartPlus size='1.3em' />
							Sotib Olish
						</Button>
					) : (
						<Button
							variant='solid'
							color='success'
							size='sm'
							className='w-full text-white'>
							<BsCartCheck size='1.3em' />
						</Button>
					)}
				</div>
			</CardFooter>
		</Card>
	)
}
