import { Modal, useGeneralStore } from "../stores/general.store";

export function useModal(modalType: Modal) {
  const { activeModal, setActiveModal } = useGeneralStore();
  const isOpen = activeModal === modalType;
  const openModal = () => setActiveModal(modalType);
  const closeModal = () => setActiveModal(null);

  return { isOpen, openModal, closeModal };
}
