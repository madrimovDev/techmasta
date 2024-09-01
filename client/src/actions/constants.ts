export const authEndpoints = {
	register: '/auth/register',
	login: '/auth/login',
	refresh: '/auth/refresh',
	verifyUser: '/auth/verify-user',
	profile: '/auth/profile'
}

export const orderEndpoints = {
	all: '/order',
	one: (id: number) => `/order/${id}`,
	userOrder: '/order/get-user-order',
	item: (id: number) => `/order/${id}/item`,
	itemQuantity: (id: number) => `/order/item/${id}`,
	shippingAddress: (id: number) => `/order/${id}/shipping`
}

export const productEndpoints = {
	all: `/products`,
	one: (id: number) => `/products/${id}`,
	software: (id: number) => `/products/${id}/software`,
	rating: (id: number) => `/products/${id}/rating`,
	comment: (id: number) => `/products/${id}/comment`
}

export const productInfoEndpoints = {
	all: (id: number) => `/products-information/${id}`,
	one: (id: number) => `/products-information/${id}`
}

export const productImage = {
	all: `/products-image`,
	one: (id: number) => `/products-iamge/${id}`
}

export const shippingServiceEndpoints = {
	all: `/shipping-service`,
	one: (id: number) => `/shipping-service/${id}`,
}