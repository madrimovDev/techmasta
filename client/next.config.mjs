/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'loremflickr.com'
			},
			{
				protocol: 'https',
				hostname: 'picsum.photos'
			},
			{
				protocol: 'http',
				hostname: 'localhost',
				port: '3022'
			}
		]
	}
}

export default nextConfig
