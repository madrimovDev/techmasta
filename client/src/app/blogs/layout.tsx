import { PropsWithChildren } from 'react'
import { Sidebar } from '@/app/blogs/_components'
import { Tags } from '@/app/blogs/_components/tags/tags'

const Layout = ({ children }: PropsWithChildren) => {
	return (
		<>
			<div className='container relative'>
				<Tags />
				<div className='grid grid-cols-12 gap-8 relative pb-10'>
					<div className='col-span-9'>{children}</div>
					<div className='col-span-3 h-auto'>
						<Sidebar />
					</div>
				</div>
			</div>
		</>
	)
}

export default Layout
