import { Button } from 'antd'
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const NavigationButtons = () => {
	const navigate = useNavigate()
	const onBack = () => {
		navigate(-1)
	}

	const onNext = () => {
		navigate(1)
	}

	return (
		<Button.Group
			size='small'
			className='ml-8'
		>
			<Button onClick={onBack}>
				<ArrowLeftOutlined />
			</Button>
			<Button onClick={onNext}>
				<ArrowRightOutlined />
			</Button>
		</Button.Group>
	)
}

export default NavigationButtons
