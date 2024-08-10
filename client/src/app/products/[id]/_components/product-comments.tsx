'use client'
import { Product } from '@/app/products/[id]/_utils/fetch-product'
import { Button, Textarea } from '@nextui-org/react'
import { BsSend } from 'react-icons/bs'

interface Props {
	comments: Product['productComment']
}

export const ProductComments = ({ comments }: Props) => {
	return (
		<div className='my-8 space-y-8'>
			<h2 className='text-large font-bold'>Izohlar</h2>
			<form className='flex flex-col gap-4'>
				<Textarea placeholder='Izohingizni yozing' />
				<Button
					color='primary'
					className='self-end'
					startContent={<BsSend />}
					variant='shadow'>
					Yuborish
				</Button>
			</form>
			<div className='space-y-4'>
				{comments.map((comment) => (
					<div
						key={comment.id}
						className='p-4 bg-gray-50'>
						<p className='font-bold text-small'>{comment.user.fullName}</p>
						<p className='mt-2'>{comment.comment}</p>
					</div>
				))}
			</div>
		</div>
	)
}
