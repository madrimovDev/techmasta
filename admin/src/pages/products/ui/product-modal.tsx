import { Button, Form, Input, InputNumber, Modal, Select, Upload } from 'antd'
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
				label='Tavar nomi'
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
				label="Tavar haqida qisqacha ma'lumot"
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
				label='Tavar baxosi'
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
			<Form.Item
				label='Tavar qaysi Katalogga kiradi'
				name='categoryId'
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
				label='Tavar turini tanlang'
				name='productType'
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
			<Form.Item
				label='Tavar Rasmi'
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
		</Modal>
	)
}

export default ProductModal
