import { ReactNode, useState } from 'react'
import { Select, SelectProps, Typography } from 'antd'

interface Props {
	children: ReactNode
	options: SelectProps['options']
	onChange: (value: string) => void
}

const EditableSelect = ({ children, options, onChange }: Props) => {
	const [editing, setEditing] = useState<boolean>(false)
	const toggle = () => {
		setEditing(!editing)
	}
	if (!editing) {
		return <Typography.Text onClick={toggle}>{children}</Typography.Text>
	}
	return (
		<Select
			options={options}
			onBlur={toggle}
			defaultValue={children as string}
			onChange={value => {
				onChange(value)
				toggle()
			}}
		/>
	)
}

export default EditableSelect
