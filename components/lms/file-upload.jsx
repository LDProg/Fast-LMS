"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { toast } from "sonner";

export const FileUpload = ({ onChange, endpoint }) => {
  return (
    <UploadDropzone
      content={{
        label: `${
          endpoint === "courseImage"
            ? "Choisissez un fichier ou importer le depuis le bureau"
            : "Choisissez un ou plusieurs fichiers ou importer le(s) depuis le bureau"
        }`,
        button: "Importer 1 fichier",
      }}
      // appearance={{
      //   container: {
      //     marginTop: "1rem",
      //   },

      //   allowedContent: {
      //     color: "#a1a1aa",
      //   },
      // }}
      // className="bg-slate-800 ut-label:text-sm ut-allowed-content:ut-uploading:text-red-300"
      endpoint={endpoint}
      onClientUploadComplete={(res) => {
        onChange(res?.[0].url);
      }}
      onUploadError={(error) => {
        if (error?.message) {
          console.log(error.error, "error");
        }

        toast.error(`${error?.message}`);
      }}
    />
  );
};
