import { fakeBlogs, fakeProducts } from '@/fake/fake-data'
import { MiniProductCard } from '@/components'
import { MiniBlogCard } from '@/components/mini-blog-card'

export const Sidebar = () => {
	return (
		<div>
			<div className='space-y-8'>
				<h2 className='text-large font-bold bg-gray-50 p-4 rounded-medium'>
					Mashxur bloglar
				</h2>
				{fakeBlogs.slice(0, 6).map((blog) => (
					<MiniBlogCard
						blog={blog}
						withImage={false}
						key={blog.id}
					/>
				))}
			</div>
			<div className='space-y-8'>
				<h2 className='text-large font-bold bg-gray-50 p-4 rounded-medium'>
					Top Tovarlar
				</h2>
				{fakeProducts.slice(0, 6).map((prod) => (
					<MiniProductCard
						product={prod}
						key={prod.id}
					/>
				))}
			</div>
		</div>
	)
}
