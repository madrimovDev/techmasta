'use client'
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger,
	Link,
	Navbar as Nav,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuItem,
	NavbarMenuToggle,
	User
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useMemo, useState } from 'react'
import { BsSearch } from 'react-icons/bs'
import { menuItems } from '@/app/components/navbar/menu-items'
import { usePathname, useRouter } from 'next/navigation'
import { CartButton } from '@/app/components/navbar/cart-button'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { authEndpoints } from '@/actions/constants'
import { logout, profile } from '@/actions/auth/auth.action'
import { getQueryClient } from '@/app/get-query-client'
import { ProfileDropdown } from '@/app/components/navbar/profile-dropdown'

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = usePathname()


	return (
		<Nav
			onMenuOpenChange={setIsMenuOpen}
			height={'100px'}
			isBordered
			classNames={{
				wrapper: 'max-w-none !container'
			}}>
			<NavbarContent>
				<NavbarBrand>
					<p className='font-bold text-inherit'>TechMasta</p>
				</NavbarBrand>
			</NavbarContent>
			<NavbarContent
				className='hidden sm:flex gap-4'
				justify='center'>
				{menuItems.map((menuItem, i) => {
					const isActive = pathname === menuItem.slug
					return (
						<NavbarItem
							key={i}
							isActive={isActive}>
							<Link
								color={isActive ? 'primary' : 'foreground'}
								as={NextLink}
								aria-current={isActive ? 'page' : undefined}
								href={menuItem.slug}>
								{menuItem.label}
							</Link>
						</NavbarItem>
					)
				})}
			</NavbarContent>
			<NavbarContent justify='end'>
				<NextLink href='/'>
					<BsSearch />
				</NextLink>
				<CartButton />
				<ProfileDropdown />
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className='sm:hidden'
				/>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => {
					const isActive = pathname === item.slug
					return (
						<NavbarMenuItem key={`${item.slug}-${index}`}>
							<Link
								color={isActive ? 'primary' : 'foreground'}
								className='w-full'
								href='#'
								size='lg'>
								{item.label}
							</Link>
						</NavbarMenuItem>
					)
				})}
			</NavbarMenu>
		</Nav>
	)
}
