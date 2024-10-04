import { Button, Flex, Table } from 'antd'
import {
	useDeleteDiscountRule,
	useDeleteManyDiscountRule,
	useGetDiscountRules
} from '../utils/discount-rule.query.ts'
import { DeleteButton, EditButton } from '../../../shared/ui'
import { useDiscountRuleModal } from '../utils/useDiscountRuleModal.ts'
import { useState } from 'react'

export const DiscountRuleTable = () => {
	const discountRules = useGetDiscountRules()
	const remove = useDeleteDiscountRule()
	const removeAll = useDeleteManyDiscountRule()
	const { onOpen } = useDiscountRuleModal()
	const [selectedIds, setSelectedIds] = useState<number[]>([])
	return (
		<Table
			dataSource={discountRules.data}
			rowSelection={{
				onChange: record => {
					setSelectedIds(record as number[])
				}
			}}
			rowKey='id'
			title={() => (
				<Flex justify='flex-end'>
					<Button
						danger
						type='primary'
						disabled={!selectedIds.length}
						onClick={() => {
							removeAll
								.mutateAsync({ id: selectedIds })
								.then(() => setSelectedIds([]))
						}}
					>
						Belgilanganlarni ochirish {selectedIds}
					</Button>
				</Flex>
			)}
			columns={[
				{
					key: '#',
					title: '#',
					render: (_, _record, index) => index + 1
				},
				{
					key: 'name',
					title: 'Nomi',
					dataIndex: 'name'
				},
				{
					key: 'description',
					title: 'Izoh',
					dataIndex: 'description'
				},
				{
					key: 'discount',
					title: 'Chegirma',
					dataIndex: 'discountValue'
				},
				{
					key: 'minimum',
					title: 'Minimal Tovar Soni',
					dataIndex: 'minimumQuantity'
				},
				{
					key: 'createdAt',
					title: "Qo'shilgan sana",
					dataIndex: 'createdAt',
					render: value => {
						return new Intl.DateTimeFormat('ru').format(new Date(value))
					}
				},
				{
					key: 'actions',
					render: (_, record) => {
						return (
							<Button.Group size='small'>
								<EditButton onClick={() => onOpen(record)} />
								<DeleteButton onConfirm={() => remove.mutate(record.id)} />
							</Button.Group>
						)
					}
				}
			]}
		/>
	)
}
