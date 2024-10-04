import { DeleteButton, EditButton, TableHeader } from '../../../shared/ui'
import { Button, Table, Tag, Tooltip } from 'antd'
import {
	useDeleteShippingService,
	useGetShippingServices
} from '../utils/shipping-service.query.ts'
import { useShippingServiceModal } from '../utils/useShippingServiceModal.ts'
import { Soato } from '../../../app/query'

export const ShippingServicesTable = () => {
	const shippingServices = useGetShippingServices()
	const onOpen = useShippingServiceModal(s => s.onOpen)
	const deleteShippingService = useDeleteShippingService()
	return (
		<>
			<TableHeader
				buttonText={"Pochta qo'shish"}
				title={'Pochtalar'}
				buttonClick={() => onOpen()}
			/>
			<Table
				dataSource={shippingServices.data}
				columns={[
					{
						key: '#',
						title: '#',
						render: (_, _data, index) => index + 1
					},
					{
						key: 'name',
						title: 'Nomi',
						dataIndex: 'name'
					},
					{
						key: 'desc',
						title: 'Izoh',
						dataIndex: 'description'
					},
					{
						key: 'unit',
						title: 'Birlik',
						dataIndex: 'unit'
					},
					{
						key: 'price',
						title: 'Baxosi',
						dataIndex: 'price'
					},
					{
						key: 'soato',
						title: 'Filiallar',
						dataIndex: 'soato',
						width: 400,
						render(soato: Soato[]) {
							return (
								<Tooltip
									title={
										<div className='flex flex-wrap gap-1'>
											{soato.map(s => (
												<Tag
													key={s.code}
													className='mr-0'
												>
													{s.name}
												</Tag>
											))}
										</div>
									}
								>
									<div className='line-clamp-2'>
										{soato.map(s => `${s.name}, `)}
									</div>
								</Tooltip>
							)
						}
					},
					{
						key: 'actions',
						title: '',
						render: (_, data) => {
							return (
								<Button.Group size='small'>
									<EditButton onClick={() => onOpen(data)} />
									<DeleteButton
										onConfirm={() => deleteShippingService.mutate(data.id)}
									/>
								</Button.Group>
							)
						}
					}
				]}
			/>
		</>
	)
}
