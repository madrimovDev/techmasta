import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const config: Config = {
	content: [
		'./src/**/*.{ts,js,tsx}',
		'./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
	],
	theme: {
		extend: {
			container: {
				center: true,
				padding: '1rem'
			}
		}
	},
	plugins: [nextui()]
}
export default config
