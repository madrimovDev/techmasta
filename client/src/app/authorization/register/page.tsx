'use client'
import { Button, Input, Link } from '@nextui-org/react'
import NextLink from 'next/link'
import { registerAction } from '@/app/authorization/register/_utils/register-action'
import { FormEvent, useState } from 'react'

interface RegisterActionErrors {
	error: string
	message: string | { property: string; messages: string[] }[]
}

const Page = () => {
	const [errors, setErrors] = useState<RegisterActionErrors>()
	const [isLoading, setIsLoading] = useState(false)
	const [success, setSuccess] = useState<string | null>(null)

	const validateForm = (formData: FormData) => {
		// Client-side validation logic
		const fullName = formData.get('fullName') as string
		const phone = formData.get('phone') as string
		const username = formData.get('username') as string
		const password = formData.get('password') as string

		if (!fullName || !phone || !username || !password) {
			return 'All fields are required'
		}

		return null
	}

	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		setIsLoading(true)
		setSuccess(null)
		setErrors(undefined)

		const formData = new FormData(e.currentTarget)
		const validationError = validateForm(formData)

		if (validationError) {
			setErrors({ error: 'Validation Error', message: validationError })
			setIsLoading(false)
			return
		}

		const result = await registerAction(formData)
		setIsLoading(false)

		if (result.statusCode >= 400) {
			setErrors(result)
		} else {
			setSuccess('You have successfully registered!')
			// Optionally, redirect to the login page or another page
			// router.push('/authorization/login')
		}
	}

	return (
		<div className='flex items-center justify-center'>
			<div className='max-w-sm w-full'>
				<form
					onSubmit={onSubmit}
					className='flex flex-col gap-6 px-4 py-8 rounded-medium shadow-medium max-w-sm w-full mt-16'>
					<h1 className='text-2xl font-semibold text-gray-900 mb-2'>
						Ro&apos;yhatdan o&apos;tish
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
						label='Ism va familiya'
						name='fullName'
						isInvalid={
							typeof errors?.message === 'object'
								? !!errors.message.find(
										(error) => error.property === 'fullName'
									)
								: undefined
						}
						errorMessage={
							typeof errors?.message === 'object'
								? errors.message
										.find((error) => error.property === 'fullName')
										?.messages.join(', ')
								: undefined
						}
					/>
					<Input
						label='Telefon'
						name='phone'
						isInvalid={
							typeof errors?.message === 'object'
								? !!errors.message.find((error) => error.property === 'phone')
								: undefined
						}
						errorMessage={
							typeof errors?.message === 'object'
								? errors.message
										.find((error) => error.property === 'phone')
										?.messages.join(', ')
								: undefined
						}
					/>
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
						isLoading={isLoading}
						type='submit'
						variant='shadow'
						disabled={isLoading}>
						Ro&apos;yhatdan o&apos;tish
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
