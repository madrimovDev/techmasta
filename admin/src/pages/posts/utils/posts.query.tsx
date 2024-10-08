import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { endpoints, http } from '../../../app/http'
import { useCallback, useState } from 'react'
import { Product } from '../../products/utils/products.query.ts'
import { notification, Progress } from 'antd'
import { AxiosError } from 'axios'

interface CreatePost {
	title: string
	description: string
	content: string
	video: File
	poster: File
}

interface Post {
	id: number
	title: string
	description: string
	poster: string
	createdAt: string
}

interface PostWithDetail {
	id: number
	title: string
	description: string
	video: string
	poster: string
	content: string
	createdAt: string
	updatedAt: string
	products: Product[]
}

export const useCreatePost = () => {
	const [mutationStarted, setMutationStarted] = useState(false)
	const [mutationFinished, setMutationFinished] = useState(false)
	const [mutationProgress, setMutationProgress] = useState(0)
	const [api, contextHolder] = notification.useNotification()
	const [norifyClosed, setNorifyClosed] = useState(false)
	const mutationFn = useCallback(
		async (data: CreatePost) => {
			return http.post(endpoints.posts.all, data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress(e) {
					const progress = Math.floor((e.progress ?? 0) * 100)
					setMutationProgress(progress)
					if (!mutationStarted && !norifyClosed) {
						setMutationStarted(true)
						setMutationFinished(false)
						api.open({
							key: data.title,
							type: 'info',
							message: 'Post yuklanmoqda',
							duration: null,
							description: <Progress percent={progress} />,
							onClose() {
								console.log(norifyClosed)
								setNorifyClosed(true)
							}
						})
					}
				}
			})
		},
		[mutationStarted, norifyClosed, api] // Depend on `mutationStarted` to ensure `onUploadProgress` works correctly
	)

	const mutation = useMutation({
		mutationFn,
		onSuccess(_, arg) {
			setMutationFinished(true)
			setMutationStarted(false)
			setMutationProgress(0)
			api.open({
				key: arg.title,
				message: 'Post yuklandi',
				type: 'success',
				description: <Progress percent={100} />
			})
		},
		onError(err: AxiosError, args) {
			setMutationFinished(true)
			setMutationStarted(false)
			setMutationProgress(0)
			api.open({
				key: args.title,
				message: 'Post yuklandishda xatolik',
				type: 'error',
				description: <pre>{JSON.stringify(err.response?.data)}</pre>
			})
		}
	})

	return {
		...mutation,
		contextHolder
	}
}

export const useGetPosts = () => {
	return useQuery({
		queryKey: [endpoints.posts.all],
		queryFn: async () => http.get<Post[]>(endpoints.posts.all),
		select(data) {
			return data.data.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
			)
		}
	})
}

export const useGetPost = (id: string) => {
	return useQuery({
		queryKey: [endpoints.posts.one(+id)],
		queryFn: async () => http.get<PostWithDetail>(endpoints.posts.one(+id)),
		select(data) {
			return data.data
		}
	})
}

export const useUpdatePost = () => {
	const queryClient = useQueryClient()
	const [mutationStarted, setMutationStarted] = useState(false)
	const [mutationFinished, setMutationFinished] = useState(false)
	const [mutationProgress, setMutationProgress] = useState(0)

	const mutationFn = useCallback(
		async ({ id, ...data }: Partial<CreatePost> & { id: number }) => {
			return http.put(endpoints.posts.one(id), data, {
				headers: {
					'Content-Type': 'multipart/form-data'
				},
				onUploadProgress(e) {
					const progress = Math.floor((e.progress ?? 0) * 100)
					setMutationProgress(progress)
					if (!mutationStarted) {
						setMutationStarted(true)
						setMutationFinished(false)
					}
				}
			})
		},
		[mutationStarted] // Depend on `mutationStarted` to ensure `onUploadProgress` works correctly
	)

	const mutation = useMutation({
		mutationFn,
		onSuccess(_, args) {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.posts.one(args.id)]
			})
			setMutationFinished(true)
			setMutationStarted(false)
			setMutationProgress(0)
		}
	})

	return {
		...mutation,
		mutationStarted,
		mutationFinished,
		mutationProgress
	}
}

export const useRemovePost = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: async (id: number) => {
			return http.delete(endpoints.posts.one(id))
		},
		onSuccess() {
			void queryClient.invalidateQueries({
				queryKey: [endpoints.posts.all]
			})
		}
	})
}
