import { Button, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Props {
	buttonText: string
	buttonClick?: VoidFunction
	title: string
}

const TableTitle = ({ title, buttonClick, buttonText }: Props) => {
	return (
		<Flex
			align='center'
			justify='space-between'
		>
			<Typography.Title level={3}>{title}</Typography.Title>
			<Button
				type='primary'
				icon={<PlusOutlined />}
				onClick={buttonClick}
			>
				{buttonText}
			</Button>
		</Flex>
	)
}

export default TableTitle
