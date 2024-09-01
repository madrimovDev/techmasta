'use client'
import Link from 'next/link'
import {
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'
import { useQuery } from '@tanstack/react-query'
import { profile as getProfile } from '@/actions/auth/auth.action'
import { authEndpoints } from '@/actions/constants'

export const Profile = () => {
	const { data: profile, error } = useQuery({
		queryFn: getProfile,
		queryKey: [authEndpoints.profile]
	})
	if (profile) {
		return (
			<Dropdown>
				<DropdownTrigger className='cursor-pointer'>
					{profile.fullName}
				</DropdownTrigger>
				<DropdownMenu aria-label='Static Actions'>
					<DropdownItem key='new'>New file</DropdownItem>
					<DropdownItem key='copy'>Copy link</DropdownItem>
					<DropdownItem key='edit'>Edit file</DropdownItem>
					<DropdownItem
						key='delete'
						className='text-danger'
						color='danger'>
						Chiqish
					</DropdownItem>
				</DropdownMenu>
			</Dropdown>
		)
	}
	return <Link href='/authorization/login'>KIRISH</Link>
}
