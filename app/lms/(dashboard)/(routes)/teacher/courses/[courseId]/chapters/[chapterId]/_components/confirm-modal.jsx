import { ModalWrapper } from "@/components/modal";

export const ConfirmModal = ({ children, isOpen, onOpenChange, onConfirm }) => {
  return (
    <ModalWrapper
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      title="Etes vous sûr de vouloir supprimer ce chapitre ?"
      description="Cette action est irréversible."
      buttonFooterAction={onConfirm}
    >
      {children}
    </ModalWrapper>
  );
};
