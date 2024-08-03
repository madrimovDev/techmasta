import { Card, CardBody, Chip, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import { BsChat, BsHeart } from 'react-icons/bs'
import Link from 'next/link'
import classNames from 'classnames'
import { IBlog } from '@/fake/fake-data'

interface Props {
	withImage?: boolean
	blog: IBlog
}

export const MiniBlogCard = ({ blog, withImage = true }: Props) => {
	return (
		<Card
			isHoverable
			shadow={withImage ? 'md' : 'none'}
			as={Link}
			href='/'>
			<CardBody className='grid grid-cols-4 gap-4'>
				{withImage && (
					<div className='col-span-1 aspect-square'>
						<Image
							className='w-full h-full object-cover'
							removeWrapper
							as={NextImage}
							src={blog.image}
							alt={blog.title}
							width={200}
							height={200}
						/>
					</div>
				)}
				<div
					className={classNames('h-full flex flex-col gap-2 justify-end', {
						'col-span-3': withImage,
						'col-span-4': !withImage
					})}>
					<Chip variant='faded'>{blog.tag}</Chip>
					<h3
						className={classNames(
							'text-large leading-normal line-clamp-2 font-medium overflow-hidden'
						)}>
						{blog.title}
					</h3>
					{!withImage && <p className='line-clamp-2'>{blog.description}</p>}
					<div className='flex gap-4 items-center'>
						<div className='flex items-center gap-2'>
							<BsHeart /> <span>{blog.likes}</span>
						</div>
						<div className='flex items-center gap-2'>
							<BsChat /> <span>{blog.comments}</span>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	)
}
