import { Loader2 } from "lucide-react";

export default function Loading() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-background">
      <Loader2 className="h-8 w-8 animate-spin" />
    </div>
  );
}
