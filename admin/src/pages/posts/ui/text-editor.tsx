import ReactQuill, { Quill } from 'react-quill'
import { useEffect, useRef } from 'react'
import 'react-quill/dist/quill.snow.css'
import ImageResize from 'quill-image-resize-module-react'

// Ensure that parchment is imported correctly
const Parchment = Quill.import('parchment')

Quill.register('modules/imageResize', ImageResize)

const toolbarOptions = [
	['bold', 'italic', 'underline', 'strike'],
	['blockquote'],
	['link', 'image'],
	[{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
	[{ indent: '-1' }, { indent: '+1' }],
	[{ header: [1, 2, 3, 4, 5, 6, false] }],
	[{ color: [] }, { background: [] }],
	[
		{ align: '' },
		{ align: 'center' },
		{ align: 'right' },
		{ align: 'justify' }
	],
	[{ color: [] }, { background: [] }],
	['clean']
]

const modules = {
	toolbar: toolbarOptions,
	imageResize: {
		parchment: Parchment,
		modules: ['Resize', 'DisplaySize']
	}
}

const formats = [
	'header',
	'font',
	'size',
	'bold',
	'italic',
	'underline',
	'strike',
	'blockquote',
	'list',
	'bullet',
	'indent',
	'link',
	'image',
	'video',
	'align',
	'color',
	'background'
]

interface Props {
	onChange: (value: string) => void
	defaultValue?: string
}

const TextEditor = ({ onChange, defaultValue }: Props) => {
	const quillRef = useRef<ReactQuill | null>(null)
	const handleChange = () => {
		if (quillRef.current) {
			const editorInstance = quillRef.current.getEditor()
			const html = editorInstance.root.innerHTML // HTML ni olamiz
			onChange(html) // HTML ni onChange funksiyasiga yuboramiz
		}
	}

	useEffect(() => {
		if (quillRef.current && defaultValue) {
			const editor = quillRef.current.getEditor()
			editor.setContents(editor.clipboard.convert(defaultValue))
		}
	}, [])

	return (
		<ReactQuill
			ref={quillRef}
			theme='snow'
			className='h-full'
			defaultValue={defaultValue}
			onChange={handleChange}
			scrollingContainer='#con'
			modules={modules}
			formats={formats}
		/>
	)
}

export default TextEditor
