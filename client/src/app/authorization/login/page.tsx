'use client'
import { Button, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { FormEvent } from 'react'
import { useRouter } from 'next/navigation'
import { login } from '@/actions/auth/auth.action'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { authEndpoints } from '@/actions/constants'

const Page = () => {
	const router = useRouter()
	const queryClient = useQueryClient()
	const { isPending, mutateAsync } = useMutation({
		mutationFn: login,
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [authEndpoints.profile]
			})
			router.push('/')
		}
	})

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const $data = Object.fromEntries(formData.entries())
		await mutateAsync($data as any)
	}

	return (
		<div className='flex items-center justify-center'>
			<div className='max-w-sm w-full'>
				<form
					onSubmit={onSubmit}
					className='flex flex-col gap-6 px-4 py-8 rounded-medium shadow-medium max-w-sm w-full mt-20'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-2'>
						Tizimga kirish
					</h1>

					<Input
						label='Username'
						name='username'
					/>
					<Input
						label='Parol'
						name='password'
						type='password'
					/>
					<Button
						color='primary'
						type='submit'
						variant='shadow'
						isLoading={isPending}
						isDisabled={isPending}>
						Kirish
					</Button>
				</form>
				<p className='text-center mt-4 text-small'>
					Agar saytda ro&apos;yhatdan o&apos;tmagan bo&apos;lsangiz,
					<Link
						as={NextLink}
						className='font-bold'
						href='/authorization/register'>
						Bu yerda ro&apos;yhatdan o&apos;ting
					</Link>
				</p>
			</div>
		</div>
	)
}

export default Page
