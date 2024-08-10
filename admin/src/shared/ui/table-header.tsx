import { Button, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'

interface Props {
	buttonText: string
	buttonClick?: VoidFunction
	title: string
}

const TableHeader = ({ title, buttonClick, buttonText }: Props) => {
	return (
		<Flex
			align='center'
			justify='space-between'
		>
			<Typography.Title
				level={1}
				className='mb-0'
			>
				{title}
			</Typography.Title>
			<Button
				type='primary'
				size='large'
				icon={<PlusOutlined />}
				onClick={buttonClick}
			>
				{buttonText}
			</Button>
		</Flex>
	)
}

export default TableHeader
