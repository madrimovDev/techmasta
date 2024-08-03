import { faker } from '@faker-js/faker'

export const fakeBlogs = Array.from({ length: 30 }).map((_, i) => {
	return {
		id: i,
		title: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		image: faker.image.urlLoremFlickr(),
		content: faker.lorem.paragraphs(10),
		tag: faker.commerce.department(),
		createdAt: new Date(),
		likes: faker.number.int({ min: 10, max: 1000 }),
		comments: faker.number.int({ min: 10, max: 150 })
	}
})

export type IBlog = (typeof fakeBlogs)[number]

export const fakeProducts = Array.from({ length: 30 }).map((_, i) => {
	return {
		id: i,
		title: faker.commerce.productName(),
		description: faker.commerce.productDescription(),
		image: faker.image.urlLoremFlickr(),
		likes: faker.number.int({ min: 10, max: 1000 }),
		comments: faker.number.int({ min: 10, max: 150 }),
		price: faker.number.int({ min: 100_000, max: 1_500_000 }),
		images: [
			{
				id: faker.number.int(),
				url: faker.image.urlLoremFlickr()
			},
			{
				id: faker.number.int(),
				url: faker.image.urlLoremFlickr()
			},
			{
				id: faker.number.int(),
				url: faker.image.urlLoremFlickr()
			}
		],
		category: {
			id: i,
			name: faker.commerce.department()
		}
	}
})

export type IProduct = (typeof fakeProducts)[number]

export const fakeCategories = Array.from({ length: 5 }).map((_, i) => {
	return {
		id: i,
		name: faker.commerce.department()
	}
})

export type ICategory = (typeof fakeCategories)[number]
