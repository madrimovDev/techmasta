'use client'
import {
	Avatar,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownSection,
	DropdownTrigger
} from '@nextui-org/react'
import NextLink from 'next/link'
import { useQuery } from '@tanstack/react-query'
import { authEndpoints } from '@/actions/constants'
import { logout, profile } from '@/actions/auth/auth.action'
import { useMemo } from 'react'
import { getQueryClient } from '@/app/get-query-client'

export const ProfileDropdown = () => {
	const queryClient = getQueryClient()
	const { data } = useQuery({
		queryKey: [authEndpoints.profile],
		queryFn: profile
	})

	const menuItem: any[] = useMemo(() => {
		const items = []

		if (data) {
			items.push(
				{
					key: '/settings',
					title: 'Sozlamalar'
				},
				{
					key: '/authorization',
					title: 'Chiqish',
					color: 'danger'
				}
			)
		} else {
			items.push({
				key: '/authorization',
				title: 'Kirish',
				color: 'primary'
			})
		}
		return items
	}, [data])
	return (
		<Dropdown>
			<DropdownTrigger>
				<Avatar size='sm' />
			</DropdownTrigger>
			<DropdownMenu>
				<DropdownSection title={data?.fullName ?? ''}>
					{menuItem.map((item) => (
						<DropdownItem
							as={NextLink}
							onClick={() => {
								if (item.key === '/authorization') {
									logout()
									void queryClient.invalidateQueries({
										queryKey: [authEndpoints.profile]
									})
								}
							}}
							key={item.key}
							href={item.key}
							color={item.color}>
							{item.title}
						</DropdownItem>
					))}
				</DropdownSection>
			</DropdownMenu>
		</Dropdown>
	)
}
