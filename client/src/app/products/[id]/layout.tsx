import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	return <div className='my-10'>{children}</div>
}

export default Layout
