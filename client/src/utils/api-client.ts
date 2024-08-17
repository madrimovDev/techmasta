export type FetchOptions = RequestInit

export class APIClient {
	private baseUrl: string

	constructor(baseUrl: string) {
		this.baseUrl = baseUrl
	}

	private async request<T>(url: string, options: FetchOptions): Promise<T> {
		const response = await fetch(`${this.baseUrl}${url}`, {
			...options,
			headers: {
				'Content-Type': 'application/json',
				...options.headers
			},
			credentials: 'include',
			next: {
				tags: [url]
			}
		})

		const json = await response.json()
		if (!response.ok) {
			throw json
		}
		return json
	}

	public get<T>(url: string, options?: FetchOptions): Promise<T> {
		return this.request<T>(url, { ...options, method: 'GET' })
	}

	public post<T>(
		url: string,
		data: unknown,
		options?: FetchOptions
	): Promise<T> {
		return this.request<T>(url, {
			...options,
			method: 'POST',
			body: JSON.stringify(data)
		})
	}

	public put<T>(
		url: string,
		data: unknown,
		options?: FetchOptions
	): Promise<T> {
		return this.request<T>(url, {
			...options,
			method: 'PUT',
			body: JSON.stringify(data)
		})
	}

	public delete<T>(url: string, options?: FetchOptions): Promise<T> {
		return this.request<T>(url, { ...options, method: 'DELETE' })
	}
}

export const apiClient = new APIClient('http://localhost:3022/api/v1')
