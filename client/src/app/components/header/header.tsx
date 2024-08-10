import { Socials } from '@/app/components/header/socials'
import Link from 'next/link'

export const Header = () => {
	return (
		<header className='bg-black py-1 text-white hidden sm:block text-sm font-bold'>
			<div className='container flex justify-between items-center'>
				<Socials />
				<Link href='/authorization/login'>KIRISH</Link>
			</div>
		</header>
	)
}
