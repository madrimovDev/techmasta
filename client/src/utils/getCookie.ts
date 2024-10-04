import Cookies from 'js-cookie'

// getCookie funksiyasi
export const getCookie = async (name: string) => {
	// Server taraf
	if (typeof window === 'undefined') {
		// Next.js headers API'dan cookie'larni olish
		const { cookies } = await import('next/headers')
		const cookieValue = cookies().get(name)?.value
		return cookieValue || null
	}
	// Client taraf
	else {
		const cookieValue = Cookies.get(name)
		return cookieValue || null
	}
}

// setCookie funksiyasi
export const setCookie = async (
	name: string,
	value: string,
	options?: Cookies.CookieAttributes
) => {
	// Server taraf
	if (typeof window === 'undefined') {
		// Server tarafida cookie'larni qo'shish yoki o'zgartirish
		const { cookies } = await import('next/headers')
		cookies().set(name, value)
		throw new Error(
			"setCookie: Server tarafida cookie yaratish uchun qo'shimcha logika kerak."
		)
	}
	// Client taraf
	else {
		// Client tarafida js-cookie kutubxonasidan foydalanamiz
		return Cookies.set(name, value, options)
	}
}
