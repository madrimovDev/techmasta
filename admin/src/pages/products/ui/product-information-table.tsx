import { Button, Form, Input, Popover, Table, Typography } from 'antd'
import {
	ProductInformation,
	useAddInformation,
	useRemoveInformation,
	useUpdateInformation
} from '../utils/products.query'
import { PlusOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'
import { DeleteButton } from '../../../shared/ui'
import { ColumnsType } from 'antd/es/table'

interface Props {
	productId?: number
	information?: ProductInformation[]
}

interface AddInformationProps {
	productId?: number
	close: VoidFunction
}

const AddInformation = ({ close, productId }: AddInformationProps) => {
	const [form] = Form.useForm<Omit<ProductInformation, 'id'>>()
	const addInformation = useAddInformation()
	const onFinish = (data: Omit<ProductInformation, 'id'>) => {
		if (!productId) return
		addInformation
			.mutateAsync({
				id: productId,
				...data
			})
			.then(() => {
				close()
			})
	}
	useEffect(() => {
		return () => {
			form.resetFields()
		}
	}, [form])
	return (
		<Form
			className='w-[500px]'
			form={form}
			onFinish={onFinish}
			layout='vertical'
		>
			<Form.Item
				label='Nomi'
				name='name'
			>
				<Input />
			</Form.Item>
			<Form.Item
				label="Ma'lumot"
				name='value'
			>
				<Input />
			</Form.Item>
			<Form.Item>
				<Button
					htmlType='submit'
					type='primary'
				>
					Qo'shish
				</Button>
				<Button
					danger
					className='ml-2'
					onClick={close}
				>
					Bekor qilish
				</Button>
			</Form.Item>
		</Form>
	)
}

const ProductInformationTable = ({ productId, information }: Props) => {
	const [open, setOpen] = useState(false)
	const updateInformation = useUpdateInformation()
	const removeInformation = useRemoveInformation()
	const columns: ColumnsType<ProductInformation>[number][] = [
		{
			title: 'Nomi',
			dataIndex: 'name',
			render(value, data) {
				return (
					<Typography.Text
						className='w-full'
						editable={{
							triggerType: ['icon'],
							tooltip: "O'zgartirish uchun bosing",
							onChange(value) {
								if (!productId) return
								updateInformation.mutate({
									id: data.id,
									productId: productId,
									name: value
								})
							}
						}}
					>
						{value}
					</Typography.Text>
				)
			}
		},
		{
			title: "Ma'lumot",
			dataIndex: 'value',
			render(value, data) {
				return (
					<Typography.Text
						className='w-full'
						editable={{
							triggerType: ['icon'],
							tooltip: "O'zgartirish uchun bosing",
							onChange(value) {
								if (!productId) return

								updateInformation.mutate({
									id: data.id,
									value: value,
									productId: productId
								})
							}
						}}
					>
						{value}
					</Typography.Text>
				)
			}
		},
		{
			key: 'actions',
			title: '',
			render(_, data) {
				return (
					<Button.Group size='small'>
						<DeleteButton
							onConfirm={() => {
								if (!productId) return
								removeInformation.mutate({
									id: data.id,
									productId
								})
							}}
						/>
					</Button.Group>
				)
			}
		}
	]

	return (
		<Table
			size='small'
			rowClassName={() => 'editable-row'}
			bordered
			dataSource={information}
			columns={columns}
			rowKey='id'
			footer={() => (
				<Popover
					content={
						<AddInformation
							productId={productId}
							close={() => setOpen(false)}
						/>
					}
					title="Malumot Qo'shish"
					onOpenChange={setOpen}
					open={open}
					trigger='click'
					destroyTooltipOnHide
				>
					<Button
						block
						type='default'
						size='small'
						icon={<PlusOutlined />}
					>
						Ma'lumot qo'shish
					</Button>
				</Popover>
			)}
		/>
	)
}

export default ProductInformationTable
