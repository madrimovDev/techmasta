import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, EffectFade, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/effect-fade'
import 'swiper/css/autoplay'

export const Hero = () => {
	return (
		<section className="h-[calc(100vh-10rem)]">
			<Swiper
				className="h-full"
				modules={[Pagination, EffectFade, Autoplay]}
				autoplay={{
					delay: 4000
				}}
				loop
				fadeEffect={{ crossFade: true }}
				effect="fade"
				pagination={{ clickable: true }}>
				<SwiperSlide className="bg-blue-400">Slide 1</SwiperSlide>
				<SwiperSlide className="bg-yellow-400">Slide 2</SwiperSlide>
				<SwiperSlide className="bg-purple-400">Slide 3</SwiperSlide>
				<SwiperSlide className="bg-red-400">Slide 4</SwiperSlide>
			</Swiper>
		</section>
	)
}
