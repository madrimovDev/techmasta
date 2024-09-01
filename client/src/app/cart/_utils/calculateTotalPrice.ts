export function calculateTotalPrice(
	price: number,
	quantity: number,
	discountPercentage = 0,
	discountThreshold = 0
): { totalPrice: number; savings: number } {
	const totalPriceWithoutDiscount = price * quantity
	const savings =
		quantity >= discountThreshold
			? totalPriceWithoutDiscount * (discountPercentage / 100)
			: 0
	const totalPrice = totalPriceWithoutDiscount - savings

	return { totalPrice, savings }
}