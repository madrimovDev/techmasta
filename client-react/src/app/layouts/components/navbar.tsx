import { useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
	Link,
	Navbar as Nav,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu, NavbarMenuItem,
	NavbarMenuToggle
} from '@nextui-org/react'
import { BsSearch } from 'react-icons/bs'

const menuItems = [
	{
		label: 'Bosh sahifa',
		slug: '/'
	},
	{
		label: 'Bloglar',
		slug: '/blogs'
	},
	{
		label: 'Tovarlar',
		slug: '/products'
	}
]

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const pathname = useLocation().pathname
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
					<p className="font-bold text-inherit">TechMasta</p>
				</NavbarBrand>
			</NavbarContent>

			<NavbarContent
				className="hidden sm:flex gap-4"
				justify="center">
				{menuItems.map((menuItem, i) => {
					const isActive = pathname === menuItem.slug
					return (
						<NavbarItem
							key={i}
							isActive={isActive}>
							<Link
								color={isActive ? 'primary' : 'foreground'}
								as={NavLink}
								aria-current={isActive ? 'page' : undefined}
								to={menuItem.slug}>
								{menuItem.label}
							</Link>
						</NavbarItem>
					)
				})}
			</NavbarContent>
			<NavbarContent justify="end">
				<NavLink to="/">
					<BsSearch />
				</NavLink>
				<NavbarMenuToggle
					aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
					className="sm:hidden"
				/>
			</NavbarContent>
			<NavbarMenu>
				{menuItems.map((item, index) => {
					const isActive = pathname === item.slug
					return (
						<NavbarMenuItem key={`${item.slug}-${index}`}>
							<Link
								color={isActive ? 'primary' : 'foreground'}
								className="w-full"
								as={NavLink}
								to="#"
								size="lg">
								{item.label}
							</Link>
						</NavbarMenuItem>
					)
				})}
			</NavbarMenu>
		</Nav>
	)
}