'use client'
import { useEffect, useInsertionEffect, useState } from 'react'
import {
	getProfileAction,
	User
} from '@/app/components/header/_utils/get-profile-action'
import Link from 'next/link'
import {
	Button,
	Dropdown,
	DropdownItem,
	DropdownMenu,
	DropdownTrigger
} from '@nextui-org/react'

export const Profile = () => {
	const [profile, setProfile] = useState<User | undefined>()

	useEffect(() => {
		const getProfile = async () => {
			const profile = await getProfileAction()
			console.log(profile)
			setProfile(profile)
		}
		getProfile()
	}, [])

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
