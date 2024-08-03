import { faker } from '@faker-js/faker'
import { VerticalBlogCard } from '@/components'
import { MiniBlogCard } from '@/components/mini-blog-card'

const blogs = Array.from({ length: 4 }).map(() => {
	return {
		image: faker.image.urlLoremFlickr({
			category: 'cars'
		}),
		title: faker.lorem.sentence(20),
		likes: faker.number.int({ min: 10, max: 100 }),
		tag: faker.word.words()
	}
})

export const Blogs = () => {
	return (
		<section className='container'>
			<h2 className='section-title'>Bloglar</h2>
			<div className='grid grid-cols-4 gap-8'>
				{blogs.map((blog) => {
					return (
						<VerticalBlogCard
							key={blog.title}
							blog={blog}
						/>
					)
				})}
			</div>
			<div className='grid grid-cols-2 gap-8 mt-10'>
				{blogs.map((blog) => {
					return (
						<MiniBlogCard
							key={blog.title}
							blog={blog}
						/>
					)
				})}
			</div>
		</section>
	)
}
