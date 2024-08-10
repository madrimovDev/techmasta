import { Button, Divider, Image, Input, Table, Typography } from 'antd'
import { DeleteButton, TableHeader } from '../../../shared/ui'
import { usePostDrawer } from '../utils/usePostDrawer.ts'
import { useGetPosts, useRemovePost } from '../utils/posts.query.tsx'
import { endpoints } from '../../../app/http'
import { Link } from 'react-router-dom'
import type { ColumnsType } from 'antd/es/table'

const PostsTable = () => {
	const { onOpen } = usePostDrawer()
	const posts = useGetPosts()
	const remove = useRemovePost()
	const columns: ColumnsType = [
		{
			key: '#',
			title: '#',
			width: 60,
			render(_, _data, index) {
				return index < 9 ? `0${index + 1}` : `${index + 1}`
			}
		},
		{
			key: 'poster',
			title: 'Poster',
			dataIndex: 'poster',
			width: 100,
			render(value) {
				return (
					<Image
						src={`${endpoints.BASE_URL}/${value}`}
						className='object-cover aspect-video'
						width={70}
					/>
				)
			}
		},
		{
			key: 'title',
			title: 'Mavzu',
			dataIndex: 'title',
			filterDropdown: ({
				setSelectedKeys,
				selectedKeys,
				confirm,
				clearFilters
			}) => (
				<div style={{ padding: 8 }}>
					<Typography.Text className='mb-4'>Izlash</Typography.Text>
					<Input
						placeholder='Search title'
						value={selectedKeys[0]}
						className='mb-4'
						onChange={e =>
							setSelectedKeys(e.target.value ? [e.target.value] : [])
						}
						onPressEnter={() => confirm()}
						style={{ marginBottom: 8, display: 'block' }}
					/>
					<Button
						size='small'
						onClick={() => confirm()}
					>
						Search
					</Button>
					<Button
						size='small'
						onClick={() => clearFilters?.()}
					>
						Reset
					</Button>
				</div>
			),

			onFilter: (value, record) => {
				if (typeof value !== 'string') return
				return record.title.toLowerCase().includes(value.toLowerCase())
			},
			render(value, data) {
				return <Link to={`${data.id}`}>{value}</Link>
			}
		},
		{
			key: 'description',
			title: 'Qisqacha mazmuni',
			dataIndex: 'description'
		},
		{
			key: 'createdAt',
			title: "Qo'shilgan sana",
			dataIndex: 'createdAt',
			sorter: (a, b) =>
				new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime(),
			render(value) {
				return new Intl.DateTimeFormat('ru', {
					timeStyle: 'short',
					dateStyle: 'short'
				}).format(new Date(value))
			}
		},
		{
			key: 'actions',
			render(data) {
				return <DeleteButton onConfirm={() => remove.mutate(data.id)} />
			}
		}
	]

	return (
		<>
			<TableHeader
				title='Postlar'
				buttonText="Post qo'shish"
				buttonClick={onOpen}
			/>
			<Divider />
			<Table
				dataSource={posts.data}
				columns={columns}
			/>
		</>
	)
}

export default PostsTable
