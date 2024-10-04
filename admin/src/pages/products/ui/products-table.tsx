import { Button, Image, Table, Tooltip, Typography } from 'antd'
import { DeleteButton, TableHeader } from '../../../shared/ui'
import { useProductModal } from '../utils/useProductModal.ts'
import {
	Product,
	useGetProducts,
	useRemoveProduct
} from '../utils/products.query.ts'
import { endpoints } from '../../../app/http'
import { useProductDrawer } from '../utils/useProductDrawer.ts'
import { useGetCategories } from '../../categories/utils/category.query.tsx'
import { MessageOutlined } from '@ant-design/icons'
import { useProductCommentStore } from '../utils/product-comment-store.ts'

const ProductsTable = () => {
	const onOpenModal = useProductModal(state => state.onOpen)
	const onOpenDrawer = useProductDrawer(state => state.onOpen)
	const products = useGetProducts()
	const categories = useGetCategories()
	const removeProduct = useRemoveProduct()
	const onOpen = useProductCommentStore(s => s.onOpen)
	return (
		<>
			<TableHeader
				title='Tovarlar'
				buttonText='Tovar qo`shish'
				buttonClick={onOpenModal}
			/>
			<Table
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
						title: 'Poster',
						dataIndex: 'poster',
						render(value) {
							const isHttp = value.startsWith('http')
							return (
								<Image
									width={40}
									height={30}
									className='object-cover'
									src={isHttp ? value : `${endpoints.BASE_URL}/${value}`}
								/>
							)
						},
						width: 60
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
						dataIndex: 'description',
						width: 300,
						render(value) {
							return (
								<Tooltip
									title={value}
									placement='top'
								>
									<div className='line-clamp-1'>{value}</div>
								</Tooltip>
							)
						}
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
						filterMode: 'menu',
						filters: categories.data?.map(prod => ({
							text: prod.name,
							value: prod.id
						})),
						onFilter(value, product) {
							return product.category.id === value
						},
						dataIndex: 'category',
						render(value) {
							return value.name
						}
					},

					{
						key: 'rating',
						title: 'Rating',
						dataIndex: 'productRating',
						sorter(a, b) {
							const getAverageRating = (ratings: { star: number }[]) => {
								if (ratings.length === 0) return 0
								const sum = ratings.reduce((prev, next) => prev + next.star, 0)
								return sum / ratings.length
							}

							const aAvg = getAverageRating(a.productRating)
							const bAvg = getAverageRating(b.productRating)

							return aAvg - bAvg
						},
						filters: [
							{ text: '0-5 ratings', value: '0-5' },
							{ text: '6-10 ratings', value: '6-10' },
							{ text: '11+ ratings', value: '11+' },
							{ text: '5 star ratings', value: '5star' }
						],
						onFilter: (value, record) => {
							const ratingCount = record.productRating.length
							const fiveStarCount = record.productRating.filter(
								r => r.star === 5
							).length

							switch (value) {
								case '0-5':
									return ratingCount <= 5
								case '6-10':
									return ratingCount > 5 && ratingCount <= 10
								case '11+':
									return ratingCount > 10
								case '5star':
									return fiveStarCount > 0
								default:
									return true
							}
						},
						render(value: Product['productRating']) {
							const sum =
								value
									.map(s => s.star)
									.reduce((prev, next) => {
										return prev + next
									}, 0) / value.length
							return (
								<span>
									{value.length} / <b>{sum}</b>
								</span>
							)
						}
					},
					{
						key: 'comments',
						title: 'Izohlar',
						dataIndex: 'productComment',
						render(value, product) {
							return (
								<span className='space-x-2'>
									<span>{value.length}</span>
									<Button
										onClick={() => onOpen(product.id)}
										icon={<MessageOutlined />}
										size='small'
									/>
								</span>
							)
						}
					},
					{
						key: 'discount',
						title: 'Chegirma',
						dataIndex: 'discountRule',
						render(value) {
							if (!value) return '-'
							return (
								<span className='space-x-2'>
									<span>{value?.name}</span>
								</span>
							)
						}
					},
					{
						key: 'actions',
						width: 80,
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
		</>
	)
}

export default ProductsTable
