import NextImage from 'next/image'
import { Image } from '@nextui-org/react'
import { BsCalendar, BsChat, BsHeart } from 'react-icons/bs'
import Link from 'next/link'

interface Props {
	blog: {
		image: string
		title: string
		likes: number
		tag: string
		date: string
	}
}

export const BlogCard = ({ blog }: Props) => {
	return (
		<Link
			href='/blogs'
			className='block cursor-pointer'>
			<Image
				as={NextImage}
				src={blog.image}
				width={400}
				height={400}
				alt={blog.title}
				isZoomed
				classNames={{
					wrapper: '!w-full !max-w-none'
				}}
				className='!w-full aspect-[16/6] object-cover object-center'
			/>
			<div className='flex justify-center items-center text-large gap-4 py-4 font-medium'>
				<div className='flex gap-2 items-center'>
					<BsCalendar />
					{new Intl.DateTimeFormat('ru').format(new Date(blog.date))}
				</div>
				<div className='flex gap-2 items-center'>
					<BsHeart />
					{blog.likes}
				</div>
				<div className='flex gap-2 items-center'>
					<BsChat />
					{blog.likes}
				</div>
			</div>
			<div>
				<h2 className='text-4xl text-center font-medium'>{blog.title}</h2>
			</div>
			<div className='text-center py-4 text-large font-medium text-primary'>
				<span>Davomini o&apos;qish</span>
			</div>
		</Link>
	)
}
