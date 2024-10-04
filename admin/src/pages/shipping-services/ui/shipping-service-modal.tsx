import { useShippingServiceModal } from '../utils/useShippingServiceModal.ts'
import { Form, Modal } from 'antd'
import { ShippingServiceForm } from './shipping-service-form.tsx'
import {
	ShippingService,
	useCreateShippingService,
	useUpdateShippingService
} from '../utils/shipping-service.query.ts'
import { useEffect } from 'react'

export const ShippingServiceModal = () => {
	const { open, onClose, data } = useShippingServiceModal()
	const createShippingService = useCreateShippingService()
	const updateShippingService = useUpdateShippingService()
	const [form] = Form.useForm<any>()

	const onFinish = async (
		values: Omit<ShippingService, 'id'> & {
			soatoCode: { label: string; value: string }[]
		}
	) => {
		try {
			if (data) {
				await updateShippingService.mutateAsync({ ...values, id: data.id })
			} else {
				await createShippingService.mutateAsync({
					...values,
					soatoCode: values.soatoCode.map(s => s.value)
				})
			}
			onClose()
		} catch (error) {
			console.error(error)
		}
	}
	useEffect(() => {
		if (open && data) {
			form.setFields(
				Object.entries(data).map(value => {
					return {
						name: value[0],
						value: value[1]
					}
				})
			)
		} else {
			form.resetFields(undefined)
		}
	}, [open, form, data])

	return (
		<Modal
			open={open}
			onCancel={onClose}
			centered={true}
			destroyOnClose={true}
			okText="Qo'shish"
			title="Pochta xizmati qo'shish"
			cancelText='Bekor qilish'
			okButtonProps={{ htmlType: 'submit' }}
			loading={createShippingService.isPending}
			modalRender={node => (
				<Form
					form={form}
					layout='vertical'
					size='large'
					onFinish={onFinish}
				>
					{node}
				</Form>
			)}
		>
			<ShippingServiceForm />
		</Modal>
	)
}
