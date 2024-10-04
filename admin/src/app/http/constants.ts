const BASE_URL = import.meta.env.VITE_APP_BASE_URL || '/'
const PREFIX = import.meta.env.VITE_APP_API_PREFIX || ''

const soato = (prefix: string) => ({
	regions: `${prefix}/soato`,
	districts: (regionCode: string) => `${prefix}/soato?regionCode=${regionCode}`
})

const auth = (prefix: string) => ({
	login: `${prefix}/auth/login`,
	register: `${prefix}/auth/register`,
	verifyAccess: `${prefix}/auth/verify-access`,
	verifyUser: `${prefix}/auth/verify-user`,
	refresh: `${prefix}/auth/refresh`
})

const categories = (prefix: string) => ({
	all: `${prefix}/category`,
	one: (id: number) => `${prefix}/category/${id}`
})

const products = (prefix: string) => ({
	all: `${prefix}/products`,
	one: (id: number) => `${prefix}/products/${id}`,
	image: `${prefix}/product-image`,
	imageOne: (id: number) => `${prefix}/product-image/${id}`,
	informationOne: (id: number) => `${prefix}/products-information/${id}`,
	addSoft: (id: number) => `${prefix}/products/${id}/software`,
	allComments: (productId: number) => `${prefix}/products/${productId}/comment`
})

const posts = (prefix: string) => ({
	all: `${prefix}/post`,
	one: (id: number) => `${prefix}/post/${id}`
})

const shippingServices = (prefix: string) => ({
	all: `${prefix}/shipping-service`,
	one: (id: number) => `${prefix}/shipping-service/${id}`
})

const discountRule = (prefix: string) => ({
	all: `${prefix}/discount`,
	one: (id: number) => `${prefix}/discount/${id}`
})

export const endpoints = {
	BASE_URL,
	PREFIX,
	auth: auth(`${BASE_URL}${PREFIX}`),
	categories: categories(`${BASE_URL}${PREFIX}`),
	products: products(`${BASE_URL}${PREFIX}`),
	posts: posts(`${BASE_URL}${PREFIX}`),
	shippingServices: shippingServices(`${BASE_URL}${PREFIX}`),
	soato: soato(`${BASE_URL}${PREFIX}`),
	discountRule: discountRule(`${BASE_URL}${PREFIX}`)
}
