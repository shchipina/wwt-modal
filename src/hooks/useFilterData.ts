import { useQuery } from '@tanstack/react-query'
import { FilterItem } from '@/shared/api/types/Filter'

export const useFilterData = () => {
	return useQuery<FilterItem[]>({
		queryKey: ['filterItem'],
		queryFn: async () => {
			const response = await fetch("/temp/filterData.json"); 
			const data = await response.json();
			return data.filterItems;
		},
	})
}
