import { Socials } from '@/app/components/header/socials'
import Link from 'next/link'
import { Profile } from '@/app/components/header/profile'

export const Header = () => {
	return (
		<header className='bg-black py-1 text-white hidden sm:block text-sm font-bold'>
			<div className='container flex justify-between items-center'>
				<Socials />
				<Profile />
			</div>
		</header>
	)
}
