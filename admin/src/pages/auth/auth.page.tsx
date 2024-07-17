import { Button, Card, Form, Input } from 'antd'
import { AuthData, useLogin } from './utils/useLogin.ts'

const AuthPage = () => {
	const { mutate, isPending } = useLogin()
	const onFinish = (data: AuthData) => {
		mutate(data)
	}
	return (
		<div className='h-screen grid place-items-center bg-gray-50'>
			<Card
				className='w-full max-w-md shadow-xl'
				title='Tizimga kirish'
				classNames={{
					header: 'text-xl'
				}}
			>
				<Form
					onFinish={onFinish}
					layout='vertical'
					size='large'
					autoComplete='off'
					autoCorrect='off'
				>
					<Form.Item
						label='Username'
						name='username'
						rules={[{ required: true }]}
					>
						<Input
							placeholder='username'
							autoComplete='off'
						/>
					</Form.Item>
					<Form.Item
						label='Password'
						name='password'
						rules={[{ required: true }]}
					>
						<Input.Password autoComplete='off' />
					</Form.Item>
					<Form.Item>
						<Button
							type='primary'
							htmlType='submit'
							className='mr-4'
							loading={isPending}
						>
							Kirish
						</Button>
						<Button
							htmlType='reset'
							danger
						>
							Tozalash
						</Button>
					</Form.Item>
				</Form>
			</Card>
		</div>
	)
}

export default AuthPage
