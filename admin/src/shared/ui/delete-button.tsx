import { DeleteOutlined, WarningFilled } from '@ant-design/icons'
import { Button, Popconfirm } from 'antd'

interface Props {
	onConfirm: VoidFunction
	title?: string
	description?: string
	okText?: string
	cancelText?: string
}

const DeleteButton = ({
	title,
	description,
	okText,
	cancelText,
	onConfirm
}: Props) => {
	return (
		<Popconfirm
			title={title || "Ma'lumot o'chirilmoqda"}
			description={
				description ||
				"O'chirilgan ma'lumotni qayta tiklab bo'lmaydi. Davom etasizmi?"
			}
			okText={okText || 'Ha'}
			cancelText={cancelText || 'Bekor Qilish'}
			onConfirm={onConfirm}
			icon={<WarningFilled className='text-red-500' />}
		>
			<Button
				danger
				type='text'
			>
				<DeleteOutlined />
			</Button>
		</Popconfirm>
	)
}

export default DeleteButton
