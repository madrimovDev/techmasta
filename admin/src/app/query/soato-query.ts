import { useQuery } from '@tanstack/react-query'
import { endpoints, http } from '../http'

export interface Soato {
	code: string
	name: string
	parentCode: any
	type: string
	children: Soato[]
}

export const useGetRegions = () => {
	return useQuery({
		queryKey: [endpoints.soato.regions],
		queryFn: async () => http.get<Soato[]>(endpoints.soato.regions),
		select(res) {
			return res.data
		}
	})
}

export const useGetDistricts = (regionCode: string) => {
	return useQuery({
		queryKey: [endpoints.soato.districts(regionCode), regionCode],
		queryFn: async () =>
			http.get<Soato[]>(endpoints.soato.districts(regionCode)),
		select(res) {
			return res.data
		}
	})
}
