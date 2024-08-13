import { Breadcrumb } from 'antd'
import { Link, useLocation } from 'react-router-dom'

const mappedBreadcrumbs = {
	products: 'Tovarlar',
	posts: 'Postlar',
	categories: 'Kategoriyalar'
}

const BreadCrumbs = () => {
	const { pathname } = useLocation()
	const key = pathname.split('/').at(1) ?? pathname
	const mappedKey = mappedBreadcrumbs[key as keyof typeof mappedBreadcrumbs]
	return (
		<Breadcrumb
			items={[
				{
					key,
					title: <Link to={`/${key}`}>{mappedKey}</Link>,
					className: 'text-md font-bold capitalize'
				}
			]}
		/>
	)
}

export default BreadCrumbs
