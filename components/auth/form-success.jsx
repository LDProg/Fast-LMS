import { AlertTriangle } from "lucide-react";

export const FormSuccess = ({ message }) => {
  return message ? (
    <div className="p-3 mb-3 text-center rounded-md flex items-center gap-x-2 text-sm bg-emerald-500/30 h-unit-10 dark:bg-success-200">
      <AlertTriangle className="text-emerald-500 absolute dark:text-emeral-300" />
      <p className="w-full text-emerald-500 dark:text-emerald-300">{message}</p>
    </div>
  ) : null;
};
