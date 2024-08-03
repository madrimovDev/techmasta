'use client'
import { TrendingCard } from '@/components'
import { faker } from '@faker-js/faker'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

const fakeTrands = Array.from({ length: 6 }).map((_, i) => {
	return {
		image: faker.image.urlLoremFlickr({
			category: ''
		}),
		author: {
			name: faker.person.fullName(),
			date: faker.date.recent().toISOString()
		},
		slug: '/',
		title: faker.commerce.productName()
	}
})

export const TrendingCards = () => {
	return (
		<div className='container'>
			<Swiper
				className='h-[380px]'
				modules={[Pagination, Autoplay]}
				pagination={{
					clickable: true
				}}
				spaceBetween={16}
				slidesPerView={1}
				breakpoints={{
					640: {
						slidesPerView: 2,
						spaceBetween: 20
					},
					768: {
						slidesPerView: 3,
						spaceBetween: 40
					},
					1024: {
						slidesPerView: 4,
						spaceBetween: 50
					}
				}}
				autoplay={{
					delay: 5000
				}}
				loop>
				{fakeTrands.map((t) => (
					<SwiperSlide key={t.title}>
						<TrendingCard
							image={t.image}
							author={t.author}
							title={t.title}
							slug={t.slug}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	)
}
