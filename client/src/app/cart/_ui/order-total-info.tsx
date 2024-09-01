interface OrderTotalInfoProps {
	label: string
	value: number | string
}

export const OrderTotalInfo = ({ label, value }: OrderTotalInfoProps) => {
	return (
		<div className='w-full flex justify-between gap-2 text-sm'>
			<span>{label}</span>
			<span>{value}</span>
		</div>
	)
}
