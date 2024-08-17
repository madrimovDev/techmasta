'use client'
import { BsCart } from 'react-icons/bs'
import NextLink from 'next/link'

export const CartButton = () => {
	return (
		<NextLink href='/cart'>
			<BsCart />
		</NextLink>
	)
}
