import { Button, Dropdown, Image, Upload } from 'antd'
import { DeleteOutlined, PlusOutlined } from '@ant-design/icons'
import {
	ProductImage,
	useAddImage,
	useRemoveImage
} from '../utils/products.query.ts'
import { endpoints } from '../../../app/http'

interface Props {
	productId?: number
	images?: ProductImage[]
}

const ProductImages = ({ images, productId }: Props) => {
	const addImage = useAddImage()
	const removeImage = useRemoveImage()
	return (
		<div className='grid grid-cols-6'>
			{images?.map((image, i) => (
				<Dropdown
					key={i}
					trigger={['contextMenu']}
					menu={{
						items: [
							{
								key: 'remove',
								label: "O'chirish",
								danger: true,
								icon: <DeleteOutlined />,
								onClick: () =>
									removeImage.mutate({
										id: image.id,
										productId: image.productId
									})
							}
						]
					}}
				>
					<Image
						width={100}
						height={100}
						className='object-cover'
						src={`${endpoints.BASE_URL}/${image.url}`}
					/>
				</Dropdown>
			))}
			<Upload
				type='select'
				listType='picture-card'
				showUploadList={false}
				beforeUpload={() => false}
				onChange={e => {
					if (!productId) return
					addImage.mutate({
						productId,
						image: e.file as unknown as File
					})
				}}
			>
				<Button
					type='text'
					loading={addImage.isPending}
				>
					<PlusOutlined />
				</Button>
			</Upload>
		</div>
	)
}

export default ProductImages
