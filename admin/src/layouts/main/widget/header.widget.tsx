import { Layout } from 'antd'
import { Link } from 'react-router-dom'
import NavigationButtons from '../ui/navigation-buttons.tsx'
import BreadCrumbs from '../ui/bread-crumbs.tsx'
import SettingsButton from '../ui/settings-button.tsx'

const HeaderWidget = () => {
	return (
		<Layout.Header className='bg-white dark:bg-[#141414]'>
			<div className='h-full flex items-center gap-4'>
				<Link
					to='/'
					className='font-bold text-lg'
				>
					TechMasta
				</Link>
				<NavigationButtons />
				<BreadCrumbs />
				<div className='flex-1 flex justify-end'>
					<SettingsButton />
				</div>
			</div>
		</Layout.Header>
	)
}

export default HeaderWidget
