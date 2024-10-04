import { Flex, Image, List, Space, Typography, Upload } from 'antd'
import { endpoints } from '../../../app/http'
import { Product, useUpdateProduct } from '../utils/products.query.ts'

interface Props {
	product?: Product
}

const ProductBaseInformation = ({ product }: Props) => {
	const update = useUpdateProduct()
	return (
		<Flex
			align='flex-start'
			gap={32}
		>
			<Upload
				showUploadList={false}
				beforeUpload={() => false}
				onChange={e => {
					if (!product) return
					update.mutate({
						id: product.id,
						poster: e.file as unknown as File
					})
				}}
			>
				<Image
					width={140}
					height={140}
					preview={false}
					className='object-cover'
					src={
						product?.poster.startsWith('http')
							? product?.poster
							: `${endpoints.BASE_URL}/${product?.poster}`
					}
				/>
			</Upload>
			<Space
				direction='vertical'
				className='flex-1'
				size='small'
			>
				<Typography.Title
					level={2}
					className='mb-0'
					editable={{
						triggerType: ['text'],
						onChange(value) {
							if (!product?.id) return
							update.mutate({
								id: product.id,
								name: value
							})
						}
					}}
				>
					{product?.name}
				</Typography.Title>
				<List
					className='w-full'
					size='small'
					dataSource={Object.entries(product ?? {})}
					renderItem={item => {
						const includeKeys = ['name', 'description', 'price', 'category']
						const translated: Record<string, string> = {
							name: 'Nomi',
							description: 'Izoh',
							price: 'Baxosi',
							category: 'Katalog'
						}
						if (!includeKeys.includes(item[0])) return
						return (
							<List.Item
								className='px-0'
								key={item[0]}
							>
								<Space size='large'>
									<Typography.Text className='font-bold w-[60px] inline-block'>
										{translated[item[0]]}:
									</Typography.Text>
									<Typography.Text
										editable={{
											triggerType: ['text'],
											text: item[1].toString(),
											onChange(value) {
												if (!product?.id) return
												update.mutate({
													id: product.id,
													[item[0]]: value
												})
											}
										}}
									>
										{item[1]}
									</Typography.Text>
								</Space>
							</List.Item>
						)
					}}
				/>
				<List
					className='w-full'
					size='small'
					header={'Chegirma'}
					dataSource={Object.entries(product?.discountRule ?? {})}
					renderItem={([key, value]) => {
						const includedKeys = ['name', 'description', 'discountValue']
						if (!key || !value) return
						if (!includedKeys.includes(key)) return
						return (
							<List.Item
								className='px-0'
								key={key}
							>
								<Space size='large'>
									<Typography.Text className='font-bold w-[80px] inline-block'>
										{key === 'name' ? 'Nomi' : 'Chegirma'}:
									</Typography.Text>
									<Typography.Text>{value}</Typography.Text>
								</Space>
							</List.Item>
						)
					}}
				/>
			</Space>
		</Flex>
	)
}

export default ProductBaseInformation
