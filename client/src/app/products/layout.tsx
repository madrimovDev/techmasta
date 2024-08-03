import { PropsWithChildren } from 'react'

const Layout = ({ children }: PropsWithChildren) => {
	return <div className='container'>{children}</div>
}

export default Layout
