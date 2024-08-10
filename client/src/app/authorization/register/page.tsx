import { Button, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'

const Page = () => {
	return (
		<div className='flex items-center justify-center'>
			<div className='max-w-sm w-full'>
				<form className='flex flex-col gap-6 px-4 py-8 rounded-medium shadow-medium max-w-sm w-full mt-16'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-2'>
						Ro&apos;yhatdan o&apos;tish
					</h1>
					<Input label='Ism va familiya' />
					<Input label='Telefon' />
					<Input label='Username' />
					<Input label='Parol' />
					<Button
						color='primary'
						variant='shadow'>
						Kirish
					</Button>
				</form>
				<p className='text-center mt-4 text-small'>
					Agar saytda ro&apos;yhatdan o&apos;tgan bo&apos;lsangiz,
					<Link
						as={NextLink}
						className='font-bold'
						href='/authorization/login'>
						Bu yerda kirishingiz mumkin
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Page
