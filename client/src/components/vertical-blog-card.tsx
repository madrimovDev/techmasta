import { Button, Card, CardFooter, Chip, Image } from '@nextui-org/react'
import NextImage from 'next/image'
import { BsHeart } from 'react-icons/bs'
import Link from 'next/link'

interface Props {
	blog: {
		image: string
		title: string
		likes: number
		tag: string
	}
}

export const VerticalBlogCard = ({ blog }: Props) => {
	return (
		<Card
			as={Link}
			href='/'
			className='h-[500px] group'
			isFooterBlurred
			isHoverable>
			<Image
				alt={blog.title}
				as={NextImage}
				src={blog.image}
				width={300}
				height={400}
				removeWrapper
				className='z-0 w-full h-full object-cover group-hover:scale-110'
			/>
			<CardFooter className='absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100'>
				<div className='flex flex-grow gap-2 items-center'>
					<div className='flex flex-col gap-2 py-2'>
						<Chip size='sm'>{blog.tag}</Chip>
						<h3 className='text-white text-large font-medium overflow-hidden line-clamp-2'>
							{blog.title}
						</h3>
					</div>
				</div>
				<div className='flex items-center gap-2 ml-2'>
					<Button
						radius='full'
						isIconOnly
						variant='shadow'
						color={blog.likes % 2 === 0 ? 'danger' : 'default'}
						size='sm'>
						<BsHeart />
					</Button>
					<span className='text-tiny block w-full text-center text-white'>
						{blog.likes}
					</span>
				</div>
			</CardFooter>
		</Card>
	)
}
