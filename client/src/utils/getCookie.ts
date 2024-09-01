import Cookies from 'js-cookie'

export const getCookie = async (name: string) => {
	if (typeof window === 'undefined') {
		const { cookies } = await import('next/headers')
		return cookies().get(name)?.value
	} else {
		return Cookies.get(name)
	}
}
