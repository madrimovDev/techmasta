import { Form, Input, InputNumber } from 'antd'

const { Item } = Form
const rules = [{ required: true }]
export const DiscountRuleForm = () => {
	return (
		<>
			<Item
				name='name'
				label='Nomi'
				rules={rules}
			>
				<Input />
			</Item>
			<Item
				name='description'
				label='Izoh'
			>
				<Input.TextArea />
			</Item>
			<Item
				name='discountValue'
				label='Chegirma'
				rules={rules}
			>
				<InputNumber className='w-full' />
			</Item>
			<Item
				name='minimumQuantity'
				label='Minimum Tovar soni'
				rules={rules}
			>
				<InputNumber
					className='w-full'
					min={1}
				/>
			</Item>
		</>
	)
}
