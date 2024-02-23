"use client";

import { deleteChapterAction } from "@/actions/lms/chapters/delete-chapter-action";
import { publishChapterAction } from "@/actions/lms/chapters/publish-chapter-action";
import { ModalWrapper } from "@/components/modal";
import { DeleteChapterSchema, PublishChapterSchema } from "@/schemas";
import { Button, useDisclosure } from "@nextui-org/react";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export const ChapterActions = ({
  isDisabled,
  chapterId,
  courseId,
  isPublished,
}) => {
  const router = useRouter();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();

  const onClick = async () => {
    startTransition(async () => {
      const isValid = await PublishChapterSchema.isValid({
        isPublished,
        chapterId,
        courseId,
      });

      if (!isValid) return;

      const data = await publishChapterAction({
        isPublished,
        chapterId,
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
        toast.success("Chapitre publié avec succès", {
          description: `${data.success.title} : Public`,
        });
      } else {
        toast.success("Chapitre rendu privé avec succès", {
          description: `${data.success.title} : Privé`,
        });
      }

      router.refresh();
    });
  };

  const onDelete = async () => {
    startTransition(async () => {
      const isValid = await DeleteChapterSchema.isValid({
        chapterId,
        courseId,
      });

      if (!isValid) return;

      const data = await deleteChapterAction({ chapterId, courseId });

      if (data?.error?.unauthorized) {
        toast.error(data?.error.unauthorized);
        return redirect("/lms");
      }
      if (data?.error) {
        toast.error(data?.error);
        return;
      }
      if (data?.success) {
        toast.success("Chapitre supprimé avec succès", {
          description: `Chapitre : ${data.success.title} 🚮`,
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
        className="rounded-sm"
      >
        {isPublished ? "Privé" : "Publié"}
      </Button>
      <ModalWrapper
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        title="Êtes vous sûr de vouloir supprimer ce chapitre ?"
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
