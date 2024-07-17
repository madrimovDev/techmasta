import { ReactNode, Suspense } from 'react'
import { Spin } from 'antd'

interface Props {
	element: ReactNode
}

const Loading = () => {
	return (
		<div className='absolute inset-0 bg-white/50 grid place-items-center'>
			<Spin size='large' />
		</div>
	)
}

const SuspenseWithLoading = ({ element }: Props) => {
	return <Suspense fallback={<Loading />}>{element}</Suspense>
}

export default SuspenseWithLoading
