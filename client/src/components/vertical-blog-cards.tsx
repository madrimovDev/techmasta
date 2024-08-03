import { VerticalBlogCard } from '@/components/vertical-blog-card'
import classNames from 'classnames'

interface Props {
	blogs: {
		image: string
		title: string
		likes: number
		tag: string
	}[]
	displayCount?: number
}

export const VerticalBlogCards = ({ blogs, displayCount = 4 }: Props) => {
	const gridColsClass =
		{
			1: 'grid-cols-1',
			2: 'grid-cols-2',
			3: 'grid-cols-3',
			4: 'grid-cols-4'
		}[displayCount] || 'grid-cols-4'
	return (
		<div className={classNames('grid gap-8', gridColsClass)}>
			{blogs.splice(0, displayCount).map((blog) => {
				return (
					<VerticalBlogCard
						key={blog.title}
						blog={blog}
					/>
				)
			})}
		</div>
	)
}
