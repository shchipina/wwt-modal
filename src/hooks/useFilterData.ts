import { useQuery } from '@tanstack/react-query'
import axios from 'axios'

import { FilterItem } from '@/shared/api/types/Filter'

type FilterDataResponse = {
	filterItems: FilterItem[]
}

export const useFilterData = () => {
	return useQuery<FilterItem[]>({
		queryKey: ['filterItem'],
		queryFn: async () => {
			const { data } = await axios.get<FilterDataResponse>(
				'/temp/filterData.json'
			)
			return data.filterItems
		}
	})
}
