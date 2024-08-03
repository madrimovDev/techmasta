import { IProduct } from '@/fake/fake-data'
import { Button, ButtonGroup, Divider } from '@nextui-org/react'
import { BsBag, BsCartPlus, BsDash, BsPlus } from 'react-icons/bs'

interface Props {
	product: IProduct
}

export const ProductInfo = ({ product }: Props) => {
	return (
		<div>
			<h1 className='text-5xl font-bold'>{product.title}</h1>
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
		</div>
	)
}
