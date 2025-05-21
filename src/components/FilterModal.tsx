import { useFilterData } from "@/hooks/useFilterData";
import { useFilterStore } from "@/store/filterStore";
import FilterGroup from "./FilterGroup";
import { useEffect, useState } from "react";
import { FilterType } from "@/shared/api/types/Filter";
import CloseButton from "./CloseButton";
import ConfirmationModal from "./ConfirmationModal";
import { useTranslation } from "react-i18next";

type Props = {
  onClose: () => void;
};

const FilterModal: React.FC<Props> = ({ onClose }) => {
  const [isConfirmChanges, setIsConfirmChanges] = useState(false);
  const { data: filters, isLoading } = useFilterData();
  const { t } = useTranslation();
  const {
    selectedFilters,
    temporaryFilters,
    setTemporaryFilters,
    applyFilters,
    cancelFilters,
  } = useFilterStore();

  useEffect(() => {
    setTemporaryFilters(selectedFilters);
  }, []);

  const handleChange = (
    groupId: string,
    optionId: string,
    checked: boolean,
  ) => {
    const current = temporaryFilters.find(group => group.id === groupId);
    if (current) {
      const updatedOptions = checked
        ? [...current.optionsIds, optionId]
        : current.optionsIds.filter(id => id !== optionId);

      setTemporaryFilters([
        ...temporaryFilters.filter(g => g.id !== groupId),
        ...(updatedOptions.length > 0
          ? [{ ...current, optionsIds: updatedOptions }]
          : [])
      ]);

    } else {
      const newGroup = {
        id: groupId,
        type: FilterType.OPTION,
        optionsIds: [optionId],
      };
      setTemporaryFilters([...temporaryFilters, newGroup]);
    }
  };

  if (isLoading) {
    return <h2>Loading</h2>
  }

  const handleApply = () => {
    applyFilters();
    onClose();
  };

  const handleReset = () => {
    cancelFilters();
    handleToogleConfirm()
  };

  const handleToogleConfirm = () => setIsConfirmChanges(prev => !prev);

  const handleClose = () => {
    const isChangesFilters = temporaryFilters === selectedFilters;

    if (!isChangesFilters) {
      const shouldSave = window.confirm('Чи бажаєте зберегти зміни?');
      
      if (shouldSave) {
        applyFilters();
      } else {
        cancelFilters();
      }
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white px-8 py-10 rounded-lg max-h-[90vh] w-[90%] overflow-y-auto shadow-xl">
        <div className="relative border-b-[2px] border-gray-200 pb-6">
          <h2 className="text-[40px] font-medium text-[#31393C] text-center">
            {t('modalTitle')}
          </h2>
          <CloseButton onClose={handleClose} />
        </div>

        {filters?.map(filter => (
          <FilterGroup
            key={filter.id}
            group={filter}
            localFilters={temporaryFilters}
            onChange={handleChange}
          />
        ))}

        <div className="flex justify-center mt-8">
          <button
            className="px-16 py-4 rounded-[16px] bg-[#FF5F00] text-white font-semibold cursor-pointer hover:scale-[102%] will-change-transform transition-transform duration-300"
            onClick={handleToogleConfirm}
          >
            {t('apply')}
          </button>
        </div>
      </div>

      {isConfirmChanges && <ConfirmationModal
        applyChanges={handleApply}
        cancelChanges={handleReset}
        onClose={handleToogleConfirm}
      />}
    </div>
  );
};

export default FilterModal;
