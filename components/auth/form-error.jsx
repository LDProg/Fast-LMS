import { AlertTriangle } from "lucide-react";

export const FormError = ({ message }) => {
  return message ? (
    <div className="p-3 mb-3 text-center rounded-md flex items-center gap-x-2 text-sm bg-destructive h-unit-10 ">
      <AlertTriangle className="text-destructive-foreground absolute" />
      <p className="pl-8 w-full text-destructive-foreground ">{message}</p>
    </div>
  ) : null;
};
