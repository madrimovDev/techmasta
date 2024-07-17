import { Button, Image, Table, Typography } from 'antd'
import { DeleteButton, TableTitle } from '../../../shared/ui'
import { useProductModal } from '../utils/useProductModal.ts'
import { useGetProducts, useRemoveProduct } from '../utils/products.query.ts'
import { endpoints } from '../../../app/http'
import { useProductDrawer } from '../utils/useProductDrawer.ts'

const ProductsTable = () => {
	const onOpenModal = useProductModal(state => state.onOpen)
	const onOpenDrawer = useProductDrawer(state => state.onOpen)
	const products = useGetProducts()
	const removeProduct = useRemoveProduct()
	return (
		<Table
			title={() => (
				<TableTitle
					title='Tavarlar'
					buttonText='Tavar qo`shish'
					buttonClick={onOpenModal}
				/>
			)}
			bordered
			dataSource={products.data}
			columns={[
				{
					key: '#',
					title: '#',
					render(_, _data, index) {
						return index + 1
					},
					width: 50
				},
				{
					key: 'poster',
					title: 'Asosiy Rasmi',
					dataIndex: 'poster',
					render(value) {
						return (
							<Image
								width={100}
								height={100}
								className='object-cover'
								src={`${endpoints.BASE_URL}/${value}`}
							/>
						)
					},
					width: 100
				},
				{
					key: 'name',
					title: 'Nomi',
					dataIndex: 'name',
					width: 200,
					render(value, data) {
						return (
							<Typography.Link onClick={() => onOpenDrawer(data.id)}>
								{value}
							</Typography.Link>
						)
					}
				},
				{
					key: 'description',
					title: 'Izoh',
					dataIndex: 'description'
				},
				{
					key: 'price',
					title: 'Baxosi',
					dataIndex: 'price',
					render(value) {
						return new Intl.NumberFormat('uz', {
							style: 'currency',
							currency: 'UZS',
							maximumFractionDigits: 0
						}).format(value)
					}
				},
				{
					key: 'category',
					title: 'Katalog',
					dataIndex: 'category',
					render(value) {
						return value.name
					}
				},
				{
					key: 'type',
					title: 'Tavar Turi',
					dataIndex: 'productType'
				},
				{
					key: 'actions',
					render(_, data) {
						return (
							<Button.Group size={'small'}>
								<DeleteButton
									onConfirm={() => {
										removeProduct.mutate(data.id)
									}}
								/>
							</Button.Group>
						)
					}
				}
			]}
		/>
	)
}

export default ProductsTable
