import { Button, Table } from 'antd'
import {
	useDeleteCategory,
	useGetCategories
} from '../utils/category.query.tsx'
import { useCategoryModal } from '../utils/useCategoryModal.tsx'
import { DeleteButton, EditButton, TableTitle } from '../../../shared/ui'

const CategoriesTable = () => {
	const { data, isLoading } = useGetCategories()
	const onOpen = useCategoryModal(state => state.onOpen)
	const remove = useDeleteCategory()

	return (
		<Table
			title={() => (
				<TableTitle
					title='Kataloglar'
					buttonText='Katalog qo`shish'
					buttonClick={() => onOpen()}
				/>
			)}
			loading={isLoading || remove.isPending}
			dataSource={data}
			rowKey={data => data.name}
			columns={[
				{
					key: '#',
					title: '#',
					render(_, _data, index) {
						return index + 1
					}
				},
				{
					key: 'name',
					title: 'Nomi',
					dataIndex: 'name'
				},
				{
					key: 'desc',
					title: 'Izoh',
					dataIndex: 'description'
				},
				{
					key: 'actions',
					title: '',
					render(_, data) {
						return (
							<Button.Group size='small'>
								<EditButton onClick={() => onOpen(data)} />
								<DeleteButton onConfirm={() => remove.mutate(data.id)} />
							</Button.Group>
						)
					}
				}
			]}
		/>
	)
}

export default CategoriesTable
