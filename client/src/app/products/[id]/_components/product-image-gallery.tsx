'use client'
import { useState } from 'react'
import { Image } from '@nextui-org/image'
import NextImage from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Autoplay } from 'swiper/modules'
import { ScrollShadow } from '@nextui-org/react'
import { ProductImage } from '@/actions/products/products.action'

interface Props {
	image: string
	images: ProductImage[]
}

export const ProductImageGallery = ({ images, image }: Props) => {
	const [imgs, setImgs] = useState<string[]>([
		image,
		...images.map((i) => i.url)
	])
	const [activeImg, setActiveImg] = useState<string>(image)

	return (
		<div className='grid grid-cols-6 gap-2 h-[500px] sticky top-36'>
			<div className='col-span-1 flex gap-4 h-[500px]'>
				<ScrollShadow>
					<Swiper
						className='w-full h-full'
						slidesPerView={5}
						spaceBetween={8}
						autoplay={{ delay: 2500, disableOnInteraction: false }}
						loop
						direction='vertical'
						modules={[Autoplay]}
						style={{ height: '100%' }} // Ensure Swiper takes full height
					>
						{[...imgs, ...imgs].map((i) => (
							<SwiperSlide key={i}>
								<Image
									alt={i}
									onMouseEnter={() => setActiveImg(i)}
									as={NextImage}
									width={100}
									src={i.startsWith('http') ? i : 'http://localhost:3022/' + i}
									height={100}
									removeWrapper
									className='w-full h-full object-cover'
								/>
							</SwiperSlide>
						))}
					</Swiper>
				</ScrollShadow>
			</div>
			<Image
				as={NextImage}
				width={600}
				height={600}
				removeWrapper
				shadow='md'
				className='col-span-5 h-full aspect-square object-cover'
				src={
					activeImg.startsWith('http')
						? activeImg
						: 'http://localhost:3022/' + activeImg
				}
				alt={image}
			/>
		</div>
	)
}
