import { create } from "zustand";

const useSettingsModal = create((set) => ({
    isSymptomModalOpen: false,
    isMedicationModalOpen: false,
    isPersonalDetailsModalOpen: false,
    openSymptomModal: () => set({ isSymptomModalOpen: true }),
    closeSymptomModal: () => set({ isSymptomModalOpen: false }),
    openMedicationModal: () => set({ isMedicationModalOpen: true }),
    closeMedicationModal: () => set({ isMedicationModal: false }),
    openPersonalDetailsModal: () => set({ isPersonalDetailsModalOpen: true }),
    closePersonalDetailsModal: () => set({ isPersonalDetailsModalOpen: false }),
}));

export default useSettingsModal;
