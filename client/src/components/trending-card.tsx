import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import Link from 'next/link'

interface Props {
	image: string
	author: {
		name: string
		date: string
	}
	title: string
	slug: string
}

export const TrendingCard = ({ title, author, image, slug }: Props) => {
	return (
		<Link
			href={slug}
			className='w-full max-w-[400px] flex flex-col gap-2'>
			<Image
				as={NextImage}
				src={image}
				className='w-full'
				width='300'
				height='300'
				alt='Demo'
				isZoomed
			/>
			<div className='text-center flex gap-2 items-center justify-center'>
				<span>
					{new Intl.DateTimeFormat('ru').format(new Date(author.date))}
				</span>
			</div>
			<h3 className='text-center text-xl font-bold cursor-pointer'>{title}</h3>
		</Link>
	)
}
