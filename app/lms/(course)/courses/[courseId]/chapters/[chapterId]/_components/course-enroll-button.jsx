"use client";

import { checkoutCourseAction } from "@/actions/lms/courses/checkout-course-action";
import { formatPrice } from "@/lib/format-price";
import { Button } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const CourseEnrollButton = ({ courseId, price }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await checkoutCourseAction({ courseId });

      if (response?.error?.unauthorized) {
        toast.error(response.error.unauthorized);
        return router.push("/auth/login");
      }
      if (response?.error) {
        toast.error(response.error);
        return;
      }

      if (response?.success?.isFree) {
        toast.success("Nouveau cours commencé !");
        router.refresh();
      } else {
        router.push(response?.success?.url);
      }
    } catch (error) {
      console.log(error, "error");
      toast.error("Une erreur s'est produite");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      aria-label="Acheter ou commencer le cours"
      color="primary"
      size="sm"
      className="w-full md:w-auto text-white rounded-sm"
      onClick={onClick}
      isDisabled={isLoading}
    >
      {price !== null ? `Acheter pour ${formatPrice(price)}` : "Commencer"}
    </Button>
  );
};
