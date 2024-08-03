import { VerticalBlogCards } from '@/components'
import { faker } from '@faker-js/faker'
import { BlogCard } from '@/app/blogs/_components/blog-card/blog-card'

const blogs = Array.from({ length: 10 }).map(() => {
	return {
		image: faker.image.urlLoremFlickr({
			category: 'cars'
		}),
		title: faker.lorem.sentence(20),
		likes: faker.number.int({ min: 10, max: 100 }),
		tag: faker.word.words(),
		date: faker.date.past().toISOString()
	}
})
const Page = () => {
	return (
		<div>
			<VerticalBlogCards
				blogs={blogs}
				displayCount={3}
			/>
			<div className='space-y-14 section-spacing'>
				{blogs.map((blog) => {
					return (
						<BlogCard
							key={blog.title}
							blog={blog}
						/>
					)
				})}
			</div>
		</div>
	)
}

export default Page
