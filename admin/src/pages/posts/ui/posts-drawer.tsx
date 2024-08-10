import { Button, Col, Drawer, Form, Input, Row, Upload } from 'antd'
import { usePostDrawer } from '../utils/usePostDrawer'
import TextEditor from './text-editor.tsx'
import { InboxOutlined } from '@ant-design/icons'
import { useCreatePost } from '../utils/posts.query.tsx'
import { useState } from 'react'

const rules = [
	{
		required: true
	}
]

interface FormData {
	title: string
	description: string
	poster: {
		file: File
	}
	video: {
		file: File
	}
}

const PostsDrawer = () => {
	const { open, onClose } = usePostDrawer()
	const [content, setContent] = useState('')
	const createPost = useCreatePost()
	const onFinish = (data: FormData) => {
		createPost.mutate({
			...data,
			poster: data.poster.file,
			video: data.video.file,
			content: content
		})
	}

	return (
		<Drawer
			open={open}
			onClose={onClose}
			width='100%'
			destroyOnClose
			keyboard={false}
			title="Post qo'shish"
		>
			{createPost.contextHolder}
			<Row
				className='h-full'
				gutter={16}
			>
				<Col
					sm={12}
					className='h-full border-r-4'
				>
					<Form
						onFinish={onFinish}
						size='large'
						layout='vertical'
					>
						<Form.Item
							label='Mavzu'
							name='title'
							rules={rules}
						>
							<Input />
						</Form.Item>
						<Form.Item
							label='Qisqacha mazmuni'
							name='description'
							rules={rules}
						>
							<Input.TextArea />
						</Form.Item>
						<Form.Item
							label='Video'
							name='video'
							rules={rules}
						>
							<Upload.Dragger
								accept='video/*'
								maxCount={1}
								listType='picture'
								multiple={false}
								beforeUpload={() => false}
							>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									Click or drag file to this area to upload
								</p>
								<p className='ant-upload-hint'>
									Support for a single or bulk upload. Strictly prohibited from
									uploading company data or other banned files.
								</p>
							</Upload.Dragger>
						</Form.Item>
						<Form.Item
							label='Poster'
							name='poster'
							rules={rules}
						>
							<Upload.Dragger
								beforeUpload={() => false}
								accept='image/*'
								maxCount={1}
								listType='picture'
								multiple={false}
							>
								<p className='ant-upload-drag-icon'>
									<InboxOutlined />
								</p>
								<p className='ant-upload-text'>
									Click or drag file to this area to upload
								</p>
								<p className='ant-upload-hint'>
									Support for a single or bulk upload. Strictly prohibited from
									uploading company data or other banned files.
								</p>
							</Upload.Dragger>
						</Form.Item>
						<Form.Item>
							<Button
								type='primary'
								htmlType='submit'
							>
								Postni joylash
							</Button>
							<Button
								danger
								className='ml-4'
							>
								Bekor qilish
							</Button>
						</Form.Item>
					</Form>
				</Col>
				<Col
					sm={12}
					id='con'
					className='h-full'
				>
					<TextEditor onChange={setContent} />
				</Col>
			</Row>
		</Drawer>
	)
}

export default PostsDrawer
