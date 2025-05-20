import { create } from 'zustand'
import { SearchRequestFilter } from '../shared/api/types/SearchRequest/SearchRequestFilter'

interface FilterState {
	selectedFilters: SearchRequestFilter,
	temporaryFilters: SearchRequestFilter,
	setTemporaryFilters: (filters: SearchRequestFilter) => void,
	applyFilters: () => void,
	cancelFilters: () => void,
}

export const useFilterStore = create<FilterState>((set, get) => ({
	selectedFilters: [],
	temporaryFilters: [],
	setTemporaryFilters: filters => set({ temporaryFilters: filters }),
	applyFilters: () => {
		set({
			selectedFilters: get().temporaryFilters
		})
	},
	cancelFilters: () => {
		set({
			temporaryFilters: get().selectedFilters
		})
	}
}));
