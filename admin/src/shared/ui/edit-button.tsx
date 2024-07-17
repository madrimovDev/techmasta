import { EditOutlined } from '@ant-design/icons'
import { Button } from 'antd'

interface Props {
	onClick?: VoidFunction
}

const EditButton = ({ onClick }: Props) => {
	return (
		<Button
			type='text'
			className='text-teal-500'
			onClick={onClick}
		>
			<EditOutlined />
		</Button>
	)
}

export default EditButton
