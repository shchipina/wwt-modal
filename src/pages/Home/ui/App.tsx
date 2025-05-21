import FilterModal from "@/components/FilterModal";
import { useFilterStore } from "@/store/filterStore";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const App = () => {
	const [isOpenModal, setIsOpenModal] = useState(false);
	const { selectedFilters } = useFilterStore();
	const { t, i18n } = useTranslation();

	const handleOpenModal = () => {
		setIsOpenModal(prev => !prev)
	}

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<button onClick={handleOpenModal} className="bg-green-900 py-2 px-4 rounded-[4px] text-white font-bold">
				{t('open_filters')}
			</button>
			<section className="flex gap-3 mt-4">
				<button
					onClick={() => i18n.changeLanguage('ua')}
					className={`p-3 rounded border transition 
      ${i18n.language === 'ua'
							? 'bg-amber-500 text-white shadow font-semibold'
							: 'text-gray-800 hover:bg-amber-500'}`}
					disabled={i18n.language === 'ua'}
				>
					UA
				</button>
				<button
					onClick={() => i18n.changeLanguage('en')}
					className={`p-3 rounded border transition 
      ${i18n.language === 'en'
							? 'bg-amber-500 text-white shadow font-semibold'
							: 'text-gray-800 hover:bg-amber-500'}`}
					disabled={i18n.language === 'en'}
				>
					EN
				</button>
			</section>

			<div>
				<h2>Current selected filter</h2>
				<p>{JSON.stringify(selectedFilters)}</p>
			</div>

			{isOpenModal && <FilterModal onClose={handleOpenModal} />}
		</section>
	)
}
