import { Blogs, Hero, Products, Trending } from '@/app/components'

const Page = () => {
	return (
		<div>
			<Hero />
			<Trending />
			<Blogs />
			<Products />
		</div>
	)
}

export default Page
