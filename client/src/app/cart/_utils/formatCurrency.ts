export function formatCurrency(value: number, locale = 'uz', currency = 'UZS'): string {
	return new Intl.NumberFormat(locale, {
		style: 'currency',
		currency: currency,
		maximumFractionDigits: 0
	}).format(value)
}
