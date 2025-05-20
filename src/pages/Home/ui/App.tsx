import FilterModal from "@/components/FilterModal";
import { useFilterStore } from "@/store/filterStore";
import { useState } from "react";

export const App = () => {
	const [isOpen, setIsOpen] = useState(false);
	const { selectedFilters } = useFilterStore();

	const handleOpenModal = () => {
		setIsOpen(prev => !prev)
	}

	return (
		<section className="w-full h-dvh flex flex-col items-center justify-center">
			{/* eslint-disable-next-line i18next/no-literal-string */}
			<h1 className="text-6xl text-gray-600 mb-12">
				WinWinTravel frontend test task
			</h1>
			<button onClick={handleOpenModal} className="bg-green-900 py-2 px-4 rounded-[4px] text-white font-bold">
				Open Filters
			</button>

			<div className="">
				<h2>Current selected filter</h2>
				<p>{JSON.stringify(selectedFilters)}</p>
			</div>

			{isOpen && <FilterModal onClose={handleOpenModal} />}
		</section>
	)
}
