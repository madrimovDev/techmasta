'use client'
import { Button, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { loginAction } from '@/app/authorization/login/_utils/login-action'
import { FormEvent, useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface LoginActionErrors {
	error: string
	message: string | { property: string; messages: string[] }[]
}

const Page = () => {
	const [errors, setErrors] = useState<LoginActionErrors>()
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState<string | null>(null)
	const router = useRouter()
	useEffect(() => {
		const accessToken = localStorage.getItem('accessToken')
		if (accessToken) {
			router.push('/')
		}
	}, [])

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setSuccess(null)
		setErrors(undefined)

		const formData = new FormData(e.currentTarget)

		const result = await loginAction(formData)
		setIsLoading(false)
		window.localStorage.setItem('accessToken', result.accessToken)
		router.push('/')
		if (result.statusCode >= 400) {
			setErrors(result)
			console.log(result)
		} else {
			setSuccess('You have successfully logged in!')
			// Optionally, redirect to the dashboard or another page
			// router.push('/dashboard')
		}
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
					{success && <p className='text-green-500'>{success}</p>}
					{errors && (
						<p className='text-red-500'>
							{typeof errors.message === 'string'
								? errors.message
								: errors.error}
						</p>
					)}
					<Input
						label='Username'
						name='username'
						isInvalid={
							typeof errors?.message === 'object'
								? !!errors.message.find(
										(error) => error.property === 'username'
									)
								: undefined
						}
						errorMessage={
							typeof errors?.message === 'object'
								? errors.message
										.find((error) => error.property === 'username')
										?.messages.join(', ')
								: undefined
						}
					/>
					<Input
						label='Parol'
						name='password'
						type='password'
						isInvalid={
							typeof errors?.message === 'object'
								? !!errors.message.find(
										(error) => error.property === 'password'
									)
								: undefined
						}
						errorMessage={
							typeof errors?.message === 'object'
								? errors.message
										.find((error) => error.property === 'password')
										?.messages.join(', ')
								: undefined
						}
					/>
					<Button
						color='primary'
						type='submit'
						variant='shadow'
						isLoading={isLoading}
						isDisabled={isLoading}>
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
