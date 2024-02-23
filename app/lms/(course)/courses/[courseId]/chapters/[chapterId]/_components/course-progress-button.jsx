"use client";

import { updateUserProgressAction } from "@/actions/lms/courses/update-user-progress-action";
import { useConfettiStore } from "@/hooks/confetti-hooks";
import { cn } from "@/lib/utils";
import { Button } from "@nextui-org/react";
import { Check, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);

      const response = await updateUserProgressAction({
        chapterId,
        isCompleted: !isCompleted,
      });

      if (response?.error?.unauthorized) {
        toast.error(response.error.unauthorized);
        return router.push("/auth/login");
      }
      if (response?.error) {
        toast.error(response.error);
        return;
      }

      if (response?.success) {
        if (!nextChapterId && !isCompleted) {
          toast.success("Cours terminé !");
        } else if (!isCompleted && nextChapterId) {
          toast.success("Chapitre suivant");
        } else {
          toast.success("Chapitre non complété");
        }
      }

      if (!isCompleted && !nextChapterId) {
        confetti.onOpen();
      }

      if (!isCompleted && nextChapterId) {
        router.push(`/lms/courses/${courseId}/chapters/${nextChapterId}`);
      }

      router.refresh();
    } catch (error) {
      toast.error("Une erreur s'est produite");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const Icon = isCompleted ? (
    <X className="h-4 w-4" />
  ) : (
    <Check className="h-4 w-4" />
  );
  return (
    <Button
      aria-label="Marquer le chapitre comme terminé ou non"
      type="button"
      endContent={Icon}
      radius="sm"
      color={cn("default", isCompleted && "success")}
      className=" hover:text-white"
      variant={isCompleted ? "light" : "ghost"}
      onClick={onClick}
      isDisabled={isLoading}
    >
      {isCompleted
        ? "Marquer le chapitre comme non terminé"
        : "Marquer le chapitre comme terminé"}
    </Button>
  );
};
