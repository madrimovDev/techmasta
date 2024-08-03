'use client'
import { Button, Divider, Input, Listbox, ListboxItem } from '@nextui-org/react'
import { fakeCategories } from '@/fake/fake-data'
import { BsSearch, BsTrash } from 'react-icons/bs'
import { ChangeEvent, useState } from 'react'

const CurrencyInput = ({ currencySymbol = 'UZS', ...props }) => {
	const [value, setValue] = useState('')

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value

		// Remove any non-numeric characters except for the decimal point
		const numericValue = inputValue.replace(/[^0-9.]/g, '')

		// Ensure only one decimal point is present
		const formattedValue =
			numericValue.split('.').length > 2
				? numericValue.replace(/\.+$/, '')
				: numericValue

		setValue(formattedValue)
	}

	const formatCurrency = (value: string | undefined) => {
		if (!value) return ''
		const number = parseFloat(value)
		if (isNaN(number)) return ''
		return new Intl.NumberFormat('uz-UZ').format(number)
	}

	return (
		<Input
			{...props}
			value={formatCurrency(value)}
			onChange={handleChange}
			endContent={currencySymbol}
			placeholder='Enter amount'
		/>
	)
}

export const Filters = () => {
	return (
		<div className='space-y-6 sticky top-[140px]'>
			<div>
				<h4>Kategoriyalar</h4>
				<Listbox
					selectionMode='single'
					variant='flat'
					color='primary'>
					{fakeCategories.map((category) => (
						<ListboxItem key={category.id}>{category.name}</ListboxItem>
					))}
				</Listbox>
			</div>
			<Divider />
			<div>
				<h4>Narx bo&apos;yicha</h4>
				<div className='flex flex-col gap-2'>
					<CurrencyInput
						label='Dan'
						min={0}
						currencySymbol='So`m'
						variant='underlined'
					/>
					<CurrencyInput
						label='Gacha'
						currencySymbol='So`m'
						min={0}
						variant='underlined'
					/>
				</div>
			</div>
			<div className='flex flex-row gap-2'>
				<Button
					className='w-full'
					size='sm'
					color='primary'>
					<BsSearch />
					Qidirish
				</Button>
				<Button
					className='w-full'
					size='sm'
					color='danger'>
					<BsTrash />
					Tozalash
				</Button>
			</div>
		</div>
	)
}
