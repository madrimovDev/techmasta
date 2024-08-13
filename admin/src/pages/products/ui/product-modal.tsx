import {
	Button,
	Flex,
	Form,
	Input,
	InputNumber,
	Modal,
	Select,
	Upload
} from 'antd'
import { useProductModal } from '../utils/useProductModal.ts'
import { CreateProduct, useCreateProduct } from '../utils/products.query.ts'
import { useGetCategories } from '../../categories/utils/category.query.tsx'
import { UploadOutlined } from '@ant-design/icons'

const ProductModal = () => {
	const { data, open, onClose } = useProductModal()
	const categories = useGetCategories()
	const [form] = Form.useForm<CreateProduct>()
	const create = useCreateProduct()
	// eslint-disable-next-line
	const onFinish = (data: any) => {
		console.log(data)
		create.mutate({
			...data,
			poster: data.poster.file
		})
	}
	return (
		<Modal
			width={800}
			open={open}
			okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
			onCancel={onClose}
			title={data ? 'Yangilash' : "Qo'shish"}
			modalRender={node => (
				<Form
					layout='vertical'
					form={form}
					size='large'
					onFinish={onFinish}
				>
					{node}
				</Form>
			)}
		>
			<Form.Item
				label='Tovar nomi'
				name='name'
				rules={[
					{
						required: true
					}
				]}
			>
				<Input placeholder='Printer Samsung SM-2001' />
			</Form.Item>
			<Form.Item
				label="Tovar haqida qisqacha ma'lumot"
				name='description'
				rules={[
					{
						required: true
					}
				]}
			>
				<Input.TextArea placeholder='Printer Samsung SM-2001' />
			</Form.Item>
			<Form.Item
				label='Tovar baxosi'
				name='price'
				rules={[
					{
						required: true
					}
				]}
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
			</Form.Item>
			<Flex gap={16}>
				<Form.Item
					label='Tovar qaysi Katalogga kiradi'
					name='categoryId'
					className='w-full'
					rules={[
						{
							required: true
						}
					]}
				>
					<Select
						options={categories.data?.map(category => ({
							value: `${category.id}`,
							label: category.name
						}))}
					/>
				</Form.Item>
				<Form.Item
					label='Tovar turini tanlang'
					name='productType'
					className='w-full'
					rules={[
						{
							required: true
						}
					]}
				>
					<Select
						options={[
							{
								label: 'Dastur / Driver',
								value: 'SOFTWARE'
							},
							{
								label: 'Qurilma / Printer / Ehtiyot qism',
								value: 'HARDWARE'
							}
						]}
					/>
				</Form.Item>
			</Flex>
			<Form.Item
				label='Tovar Rasmi'
				name='poster'
				rules={[
					{
						required: true
					}
				]}
			>
				<Upload
					listType='picture'
					beforeUpload={() => false}
					maxCount={1}
					accept='image/jpeg,image/png'
				>
					<Button icon={<UploadOutlined />}>Rasm Tanlang</Button>
				</Upload>
			</Form.Item>
			<Flex gap={16}>
				<Form.Item
					label='Chegirma'
					name='discount'
					className='w-full'
					rules={[
						{
							required: false
						}
					]}
				>
					<InputNumber
						className='w-full'
						inputMode='text'
						placeholder='10'
						addonBefore='%'
						min={0}
					/>
				</Form.Item>
				<Form.Item
					label='Qancha tovardan keyin chegirma'
					name='discountAfterCount'
					className='w-full'
					rules={[
						{
							required: false
						}
					]}
				>
					<InputNumber
						className='w-full'
						inputMode='text'
						placeholder='10'
						min={0}
					/>
				</Form.Item>
			</Flex>
		</Modal>
	)
}

export default ProductModal
