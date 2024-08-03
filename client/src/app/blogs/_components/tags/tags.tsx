import { fakeCategories } from '@/fake/fake-data'

export const Tags = () => {
	return (
		<div className='flex gap-4 py-10 '>
			{fakeCategories.map((category) => (
				<p
					key={category.id}
					className='py-2 px-6 border-2 rounded-full hover:bg-primary-50 cursor-pointer transition-all text-large font-bold'>
					#{category.name}
				</p>
			))}
		</div>
	)
}
