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
import { useGetDiscountRules } from '../../discount-rule/utils/discount-rule.query.ts'

const ProductModal = () => {
	const { data, open, onClose } = useProductModal()
	const categories = useGetCategories()
	const [form] = Form.useForm<CreateProduct>()
	const create = useCreateProduct()
	const discounts = useGetDiscountRules()
	// eslint-disable-next-line
	const onFinish = (data: any) => {
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
					label='Chegirma'
					name='discountRuleId'
					className='w-full'
				>
					<Select
						options={discounts.data?.map(disc => ({
							label: `${disc.name} | ${disc.discountValue}`,
							value: `${disc.id}`
						}))}
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
		</Modal>
	)
}

export default ProductModal
