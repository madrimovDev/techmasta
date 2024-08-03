import { Modal, Typography } from 'antd'
import { useProductCommentStore } from '../utils/product-comment-store.ts'
import { useGetProductComments } from '../utils/products.query.ts'

export const ProductCommentModal = () => {
	const { open, onClose, productId } = useProductCommentStore()
	const productComment = useGetProductComments(productId)
	return (
		<Modal
			open={open}
			onCancel={onClose}
			centered
			width={1000}
			destroyOnClose
			title='Tovar Izohlari'
		>
			<div className='flex flex-col gap-2'>
				{productComment.data?.map(comment => {
					return (
						<div
							key={comment.id}
							className='p-2 bg-neutral-100 dark:bg-neutral-900 rounded-md'
						>
							<div className='flex flex-col gap-1'>
								<Typography.Text className='font-bold text-xs opacity-60 flex gap-2 items-center'>
									{comment.user.fullName}
								</Typography.Text>
								<Typography.Text className='text-xs'>
									{comment.comment}
								</Typography.Text>
							</div>
						</div>
					)
				})}
			</div>
		</Modal>
	)
}
