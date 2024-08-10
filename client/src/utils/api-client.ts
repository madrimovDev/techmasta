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
			}
		})

		if (!response.ok) {
			const error = new Error(`An error occurred: ${response.statusText}`)
			error.name = 'FetchError'
			throw error
		}

		return response.json()
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
