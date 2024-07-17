interface UploadHandlerOptions {
	accept: string
	maxSizeMB: number
	handler: (file: File) => void
}

export const createFileUploadHandler = ({
	handler,
	accept,
	maxSizeMB
}: UploadHandlerOptions) => {
	const input = document.createElement('input')
	input.type = 'file'
	input.accept = accept
	input.click()

	input.onchange = event => {
		const target = event.target as HTMLInputElement
		const files = target.files
		if (files?.length) {
			const file = files[0]
			const maxSizeBytes = maxSizeMB * 1024 * 1024
			if (file.size > maxSizeBytes) {
				alert(`The file size exceeds the maximum limit of ${maxSizeMB} MB`)
				return
			}
			handler(file)
		}
	}
}
