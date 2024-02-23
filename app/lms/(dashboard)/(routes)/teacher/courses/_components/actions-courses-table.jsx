"use client";

import { deleteCourseAction } from "@/actions/lms/courses/delete-course-action";
import { ModalWrapper } from "@/components/modal";
import { DeleteCourseSchema } from "@/schemas";
import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Link,
  useDisclosure,
} from "@nextui-org/react";
import { MoreVertical } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const ActionsCoursesTable = ({ courseId }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const onDelete = () => {
    startTransition(async () => {
      const isValid = await DeleteCourseSchema.isValid({
        courseId,
      });

      if (!isValid) return;
      const data = await deleteCourseAction({ courseId });

      if (data?.error?.unauthorized) {
        toast.error(data?.error.unauthorized);
        return router.push("/lms");
      }
      if (data?.error) {
        toast.error(data?.error);
        return;
      }
      if (data?.success) {
        toast.success("Cours supprimé avec succès", {
          description: `Cours : ${data.success.title} 🚮`,
        });
      }

      router.refresh();
    });
  };
  return (
    <div className="relative flex justify-end items-center gap-2">
      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Êtes vous sûr de vouloir supprimer ce cours ?"
        description="Cette action est irréversible."
        onConfirm={onDelete}
        isDisabled={isPending}
      />
      <Dropdown className="bg-background border-1 border-default-200">
        <DropdownTrigger>
          <Button
            aria-label="Actions pour le cours"
            isIconOnly
            radius="full"
            size="sm"
            variant="light"
          >
            <MoreVertical className="text-default-400" />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Course's actions" disabledKeys={isPending}>
          <DropdownItem
            as={Link}
            className="text-default-900"
            aria-label="Edit course action"
            href={`/lms/teacher/courses/${courseId}`}
          >
            Modifier
          </DropdownItem>
          <DropdownItem aria-label="Delete course action" onClick={onOpen}>
            Supprimer
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
};
