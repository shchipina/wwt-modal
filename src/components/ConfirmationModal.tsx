import { useTranslation } from "react-i18next";
import CloseButton from "./CloseButton";

type Props = {
  onClose: () => void;
  applyChanges: () => void;
  cancelChanges: () => void;
};

const ConfirmationModal: React.FC<Props> = ({
  onClose,
  applyChanges,
  cancelChanges,
}) => {
  const { t } = useTranslation();

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-lg z-60 flex items-center justify-center">
      <div className="bg-white rounded-[16px] p-6 w-[90%] shadow-2xl">
        <div className="relative">
          <h2 className="text-[40px] font-semibold text-center text-gray-800 mb-[60px]">
            {t('confirmModalTitle')}
          </h2>
          <CloseButton onClose={onClose} />
        </div>

        <div className="flex justify-center gap-8">
          <button
            onClick={cancelChanges}
            className="px-10 py-2 border rounded-[16px] border-[#B4B4B4] text-[#474747]font-semibold cursor-pointer hover:scale-[102%] transition-transform duration-300 will-change-transform"
          >
            {t('useOldFilters')}
          </button>
          <button
            onClick={applyChanges}
            className="px-10 py-2 rounded-[16px] bg-[#FF5F00] text-white font-semibold cursor-pointer hover:scale-[102%] transition-transform duration-300 will-change-transform"
          >
            {t('applyNewFilters')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
