'use client'
import { Button, Input, Link, Select, SelectItem } from '@nextui-org/react'
import NextLink from 'next/link'
import { FormEvent, useMemo, useState } from 'react'
import { useMutation, useQuery } from '@tanstack/react-query'
import { register, RegisterRequest } from '@/actions/auth/auth.action'
import { useRouter } from 'next/navigation'
import { soatoEndpoints } from '@/actions/constants'
import { getSoato } from '@/actions/soato/soato-actions'

interface RegisterActionErrors {
	error: string
	message: string | { property: string; messages: string[] }[]
}

const Page = () => {
	const router = useRouter()
	const [regionCode, setRegionCode] = useState<string>('')
	const soato = useQuery({
		queryKey: [soatoEndpoints.region],
		queryFn: getSoato
	})
	const district = useMemo(() => {
		return soato.data?.find((s) => s.code === regionCode)?.children ?? []
	}, [regionCode, soato])
	const {
		mutateAsync,
		error: errors,
		isPending: isLoading
	} = useMutation<
		string,
		{
			message: { property: string; messages: string[] }[] | string
		},
		RegisterRequest
	>({
		mutationFn: register,
		onSuccess() {
			router.push('/')
		}
	})
	const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())
		await mutateAsync(data as any)
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
					{errors && typeof errors.message === 'string' && (
						<div className='bg-danger text-white p-2 rounded-small'>
							{errors.message}
						</div>
					)}
					<Input
						isRequired
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
					<Select
						label='Viloyat'
						onSelectionChange={(selection) => {
							const set = new Set(selection)
							const code = Array.from(set)?.at(0)
							setRegionCode(code as string)
						}}>
						{soato.data?.map((s) => {
							return <SelectItem key={s.code}>{s.name}</SelectItem>
						}) ?? []}
					</Select>
					<Select
						label='Tuman / Shahar'
						name='soatoCode'>
						{district.map((s) => {
							return <SelectItem key={s.code}>{s.name}</SelectItem>
						})}
					</Select>
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
