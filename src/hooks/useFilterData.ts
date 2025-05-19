import { useQuery } from '@tanstack/react-query'

import { FilterItem } from '@/shared/api/types/Filter'
import filterData from '@/shared/temp/filterData.json'

export const useFilterData = () => {
	return useQuery<FilterItem[]>({
		queryKey: ['filterItem'],
		queryFn: () => Promise.resolve(filterData)
	})
}
