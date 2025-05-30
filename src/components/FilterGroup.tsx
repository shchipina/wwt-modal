import { useTranslation } from 'react-i18next'

import { FilterItem } from '@/shared/api/types/Filter'
import { SearchRequestFilter } from '@/shared/api/types/SearchRequest/SearchRequestFilter'

type Props = {
	group: FilterItem
	localFilters: SearchRequestFilter
	onChange: (groupId: string, optionId: string, checked: boolean) => void
}

const FilterGroup: React.FC<Props> = ({ group, localFilters, onChange }) => {
	const { t } = useTranslation()
	const found = localFilters.find(filter => filter.id === group.id)
	const selected = found ? found.optionsIds : []

	return (
		<div className="pb-[22px] border-b-[2px] border-gray-200">
			<h3 className="text-[#31393C] text-[24px] font-medium mt-8 mb-6">
				{t(`filter.${group.id}.name`)}
			</h3>
			<p className="text-sm text-gray-600 mb-2">
				{group.description ? t(`filter.${group.id}.description`) : ''}
			</p>
			<ul className="grid grid-cols-3 gap-2">
				{group.options.map(option => (
					<li key={option.id}>
						<label className="flex items-center gap-2 cursor-pointer">
							<input
								type="checkbox"
								checked={selected.includes(option.id)}
								onChange={e => onChange(group.id, option.id, e.target.checked)}
							/>
							{t(`filter.${group.id}.options.${option.id}.name`)}
						</label>
					</li>
				))}
			</ul>
		</div>
	)
}

export default FilterGroup
