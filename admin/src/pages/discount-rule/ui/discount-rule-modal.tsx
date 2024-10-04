import { useDiscountRuleModal } from '../utils/useDiscountRuleModal.ts'
import { Form, Modal } from 'antd'
import {
	CreateDiscountRule,
	useCreateDiscountRule,
	useUpdateDiscountRule
} from '../utils/discount-rule.query.ts'
import { DiscountRuleForm } from './discount-rule-form.tsx'
import { useEffect } from 'react'

export const DiscountRuleModal = () => {
	const { open, onClose, data } = useDiscountRuleModal()
	const [form] = Form.useForm<CreateDiscountRule>()
	const create = useCreateDiscountRule()
	const update = useUpdateDiscountRule()
	const onFinish = async (formData: CreateDiscountRule) => {
		if (data) {
			await update.mutateAsync({
				id: data.id,
				...formData
			})
		} else {
			await create.mutateAsync(formData)
		}
		onClose()
	}
	useEffect(() => {
		if (data) {
			form.setFieldsValue(data)
		} else {
			form.resetFields(undefined)
		}
	}, [data, form])
	return (
		<Modal
			title='Chegirma'
			open={open}
			onCancel={onClose}
			okText='Saqlash'
			destroyOnClose
			cancelText='Bekor Qilish'
			okButtonProps={{
				htmlType: 'submit',
				autoFocus: true
			}}
			modalRender={node => (
				<Form
					size='large'
					layout='vertical'
					form={form}
					onFinish={onFinish}
				>
					{node}
				</Form>
			)}
		>
			<DiscountRuleForm />
		</Modal>
	)
}
