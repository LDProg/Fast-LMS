"use client";

import { deleteCourseAction } from "@/actions/lms/courses/delete-course-action";
import { publishCourseAction } from "@/actions/lms/courses/publish-course-action";
import { ModalWrapper } from "@/components/modal";
import { useConfettiStore } from "@/hooks/confetti-hooks";
import { DeleteCourseSchema, PublishCourseSchema } from "@/schemas";
import { Button, useDisclosure } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const CoursesActions = ({ isDisabled, courseId, isPublished }) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const confetti = useConfettiStore();

  const onClick = async () => {
    startTransition(async () => {
      const isValid = await PublishCourseSchema.isValid({
        isPublished,
        courseId,
      });

      if (!isValid) return;

      const data = await publishCourseAction({
        isPublished,
        courseId,
      });

      if (data?.error?.unauthorized) {
        toast.error(data?.error.unauthorized);
        return redirect("/lms");
      }
      if (data?.error) {
        toast.error(data?.error);
        return;
      }
      if (data?.success?.isPublished) {
        toast.success("Cours publié avec succès", {
          description: `${data.success.title} : Public`,
        });
        confetti.onOpen();
      } else {
        toast.success("Cours rendu privé avec succès", {
          description: `${data.success.title} : Privé`,
        });
      }

      router.refresh();
    });
  };

  const onDelete = async () => {
    startTransition(async () => {
      const isValid = await DeleteCourseSchema.isValid({
        courseId,
      });

      if (!isValid) return;
      const data = await deleteCourseAction({ courseId });

      if (data?.error?.unauthorized) {
        toast.error(data?.error.unauthorized);
        return redirect("/lms");
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
    <div className="flex items-center gap-x-2">
      <Button
        onClick={onClick}
        isDisabled={isDisabled || isPending}
        variant="bordered"
        size="sm"
        className="rounded-sm border border-muted-foreground/60 hover:text-white hover:border-background hover:bg-black dark:hover:text-black dark:hover:border-background dark:hover:bg-white transition-colors"
      >
        {isPublished ? "Privé" : "Publié"}
      </Button>
      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Êtes vous sûr de vouloir supprimer ce cours ?"
        description="Cette action est irréversible."
        onConfirm={onDelete}
        isDisabled={isPending}
      />
      <button
        onClick={onOpen}
        size="sm"
        className="bg-primary p-2 rounded-sm"
        disabled={isPending}
      >
        <Trash className="h-4 w-4 text-white" />
      </button>
    </div>
  );
};
