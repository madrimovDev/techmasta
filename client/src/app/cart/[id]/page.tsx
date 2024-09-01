'use client'
import { useQuery } from '@tanstack/react-query'
import { orderEndpoints, shippingServiceEndpoints } from '@/actions/constants'
import { getOrder } from '@/actions/orders/orders.action'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { getShippingServices } from '@/actions/shipping-service/shipping-service.action'

const exludeKeys = [
	'createdAt',
	'password',
	'roleId',
	'updatedAt',
	'id',
	'role',
	'username'
]

const mapFieldName: Record<string, string> = {
	fullName: 'Ism Familya',
	phone: 'Telefon',
	address: 'Manzil'
}

const Page = ({ params }: { params: { id: string } }) => {
	const order = useQuery({
		queryKey: [orderEndpoints.one(+params.id), params.id],
		queryFn: async () => getOrder(+params.id)
	})
	const shippingServices = useQuery({
		queryKey: [shippingServiceEndpoints.all],
		queryFn: getShippingServices
	})

	if (order.isPending || !order.data) {
		return 'Loading'
	}

	return (
		<div className='container'>
			<h1 className='text-2xl font-bold'>Shaxsiy Ma&apos;lumotlar</h1>
			<form className='flex flex-col gap-4'>
				{Object.entries(order.data?.user ?? {}).map(([key, value]) => {
					if (exludeKeys.includes(key)) return
					return (
						<Input
							key={key}
							name={key}
							isRequired
							label={mapFieldName[key]}
							defaultValue={value}
						/>
					)
				})}
				<Select
					isRequired
					placeholder='Yetkazib berish xizmatini tanlang'
					label='Yetkazib berish xizmati'
					disallowEmptySelection
					name='shippingServiceId'
					isLoading={shippingServices.isLoading}
					defaultSelectedKeys={[order.data.shippingServiceId]}>
					{shippingServices.data?.map((service) => (
						<SelectItem
							key={service.id}
							value={service.id}
							description={service.description}>
							{service.name}
						</SelectItem>
					)) ?? []}
				</Select>
				<Button
					type='submit'
					color='primary'
					variant='shadow'>
					To&apos;lov qilish
				</Button>
			</form>
		</div>
	)
}

export default Page
