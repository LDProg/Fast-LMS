import { cn } from "@/lib/utils";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export const ModalWrapper = ({
  children,
  isOpen,
  onOpenChange,
  title,
  description,
  onConfirm,
  isDisabled,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] border-2 dark:border-muted-foreground/50 border-black bg-background p-6 shadow-lg duration-200 sm:rounded-lg",
        children && "gap-4"
      )}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col">
              {title}
              <div className="text-sm text-muted-foreground">{description}</div>
            </ModalHeader>
            {children && <ModalBody>{children}</ModalBody>}
            <ModalFooter>
              <Button
                aria-label="Retour"
                color="danger"
                variant="light"
                onPress={onClose}
                className="rounded-md"
              >
                Retour
              </Button>
              <Button
                aria-label="Confirmer"
                type="submit"
                onPress={onConfirm}
                className="bg-primary ml-2 text-white rounded-md"
                isDisabled={isDisabled}
              >
                Confirmer
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};
