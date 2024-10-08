import { Form, Input, InputNumber } from 'antd'

const { Item } = Form

const rules = [{ required: true }]

export const ShippingServiceForm = () => {
	return (
		<>
			<Item
				label='Nomi'
				name='name'
				rules={rules}
			>
				<Input />
			</Item>
			<Item
				label='Izoh'
				name='description'
				rules={rules}
			>
				<Input.TextArea />
			</Item>
			<Item
				label='Birlik'
				name='unit'
				rules={rules}
			>
				<Input />
			</Item>
			<Item
				label='Baxosi'
				name='price'
				rules={rules}
			>
				<InputNumber
					className='w-full'
					formatter={value =>
						new Intl.NumberFormat('uz', {
							maximumFractionDigits: 0
						}).format(value as number)
					}
					inputMode='text'
					placeholder='10000'
					min={0}
				/>
			</Item>
		</>
	)
}
