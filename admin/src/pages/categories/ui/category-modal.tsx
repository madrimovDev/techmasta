import { useCategoryModal } from '../utils/useCategoryModal.tsx'
import { Form, Input, Modal } from 'antd'
import {
	Category,
	useCreateCategory,
	useUpdateCategory
} from '../utils/category.query.tsx'
import { useEffect } from 'react'

const CategoryModal = () => {
	const { data, open, onClose } = useCategoryModal()
	const [form] = Form.useForm<Omit<Category, 'id'>>()
	const create = useCreateCategory()
	const update = useUpdateCategory()
	const onFinish = (formData: Omit<Category, 'id'>) => {
		if (data) {
			update.mutateAsync({ ...formData, id: data.id }).then(() => onClose())
		} else {
			create.mutateAsync({ ...formData }).then(() => onClose())
		}
	}

	useEffect(() => {
		if (data && open) {
			form.setFieldsValue(data)
		} else {
			form.resetFields()
		}
	}, [form, data, open])

	return (
		<Modal
			open={open}
			onCancel={onClose}
			title={data ? 'Katalogni yangilash' : 'Katalog qo`shish'}
			okButtonProps={{ autoFocus: true, htmlType: 'submit' }}
			destroyOnClose
			modalRender={node => (
				<Form
					form={form}
					layout='vertical'
					onFinish={onFinish}
				>
					{node}
				</Form>
			)}
		>
			<Form.Item
				name='name'
				label='Nomi'
			>
				<Input placeholder='Katalog nomi' />
			</Form.Item>
			<Form.Item
				name='description'
				label='Izoh'
			>
				<Input.TextArea placeholder='Katalog nomi' />
			</Form.Item>
		</Modal>
	)
}

export default CategoryModal
