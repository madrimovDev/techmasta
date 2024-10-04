import { apiClient } from '@/utils'
import { soatoEndpoints } from '@/actions/constants'

export interface Soato {
	code: string
	name: string
	parentCode: null
	type: 'region'
	children: {
		code: string
		name: string
		parentCode: string
		type: 'district'
	}[]
}

export const getSoato = async () => {
	try {
		const response = await apiClient.get<Soato[]>(soatoEndpoints.region)
		return response
	} catch (error) {
		return error as Soato[]
	}
}
