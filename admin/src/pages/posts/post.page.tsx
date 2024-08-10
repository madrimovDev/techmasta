import { useParams } from 'react-router-dom'
import { useGetPost, useUpdatePost } from './utils/posts.query.tsx'
import { Col, Divider, Dropdown, Image, Row, Spin, Typography } from 'antd'
import { endpoints } from '../../app/http'
import 'quill/dist/quill.snow.css'
import { UploadOutlined } from '@ant-design/icons'
import { createFileUploadHandler, debounce } from '../../shared/utils'
import TextEditor from './ui/text-editor.tsx'

const PostPage = () => {
	const { id } = useParams() as { id: string }
	const { data: post } = useGetPost(id)
	const update = useUpdatePost()

	const contentHandler = (value: string) => {
		if (!post) return
		update.mutate({
			id: post.id,
			content: value
		})
	}

	const debouncedHandler = debounce(contentHandler, 1000)

	return (
		<Spin spinning={update.isPending}>
			<Typography.Title
				editable={{
					triggerType: ['text'],
					onChange(value) {
						if (post?.title === value) return
						update.mutate({
							id: +id,
							title: value
						})
					}
				}}
			>
				{post?.title}
			</Typography.Title>
			<Typography.Paragraph
				editable={{
					triggerType: ['text'],
					onChange(value) {
						if (post?.description === value) return
						update.mutate({
							id: +id,
							description: value
						})
					}
				}}
			>
				{post?.description}
			</Typography.Paragraph>

			<Typography.Text>
				{new Intl.DateTimeFormat('ru', {
					dateStyle: 'short',
					timeStyle: 'short'
				}).format(new Date(post?.createdAt ?? new Date()))}
			</Typography.Text>
			<Divider />
			<Row gutter={32}>
				<Col sm={12}>
					<Dropdown
						menu={{
							items: [
								{
									key: 'update',
									label: 'Rasmni yangilash',
									icon: <UploadOutlined />,
									onClick() {
										createFileUploadHandler({
											maxSizeMB: 2,
											accept: 'image/jpeg',
											handler(file) {
												if (post) {
													update.mutate({
														id: post.id,
														poster: file
													})
												}
											}
										})
									}
								}
							]
						}}
						trigger={['contextMenu']}
					>
						<Image
							rootClassName='w-full'
							className='w-full object-cover aspect-video'
							src={`${endpoints.BASE_URL}/${post?.poster}`}
						/>
					</Dropdown>
				</Col>
				<Col sm={12}>
					<Dropdown
						menu={{
							items: [
								{
									key: 'update',
									label: 'Videoni yangilash',
									icon: <UploadOutlined />,
									onClick() {
										createFileUploadHandler({
											maxSizeMB: 100,
											accept: 'video/*',
											handler(file) {
												if (post) {
													update.mutate({
														id: post.id,
														video: file
													})
												}
											}
										})
									}
								}
							]
						}}
						trigger={['contextMenu']}
					>
						<video
							className='w-full aspect-video'
							src={`${endpoints.BASE_URL}/${post?.video}`}
							controls
						/>
					</Dropdown>
				</Col>
			</Row>
			<div className='prose max-w-none bg-white dark:bg-stone-950 dark:text-white dark:prose-headings:text-white mt-4'>
				<TextEditor
					onChange={value => {
						if (value === post?.content) return
						debouncedHandler(value)
					}}
					defaultValue={post?.content}
				/>
			</div>
		</Spin>
	)
}

export default PostPage
