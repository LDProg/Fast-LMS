import { currentUser, currentUserId } from "@/lib/auth";
import { createUploadthing } from "uploadthing/next";

const f = createUploadthing();

const handleAuth = async () => {
  const user = await currentUser();
  const userId = await currentUserId();

  if (!userId) return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
  if (user.role !== "ADMIN")
    return { error: { unauthorized: "Vous n'êtes pas autorisé." } };
  return { userId };
};

// FileRouter for your app, can contain multiple FileRoutes
export const ourFileRouter = {
  courseImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(({ metadata, file }) => {
      console.log("file url", file.url);

      //  imageCourseAction()
    }),
  courseAttachment: f(["text", "image", "video", "audio", "pdf"])
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  chapterVideo: f({ video: { maxFileSize: "512GB", maxFileCount: 1 } })
    .middleware(() => handleAuth())
    .onUploadComplete(() => {}),
  // // Define as many FileRoutes as you like, each with a unique routeSlug
  // imageUploader: f({ image: { maxFileSize: "4MB" } })
  //   // Set permissions and file types for this FileRoute
  //   .middleware(async ({ req }) => {
  //     // This code runs on your server before upload
  //     const user = await auth(req);

  //     // If you throw, the user will not be able to upload
  //     if (!user) throw new UploadThingError("Unauthorized");

  //     // Whatever is returned here is accessible in onUploadComplete as `metadata`
  //     return { userId: user.id };
  //   })
  //   .onUploadComplete(async ({ metadata, file }) => {
  //     // This code RUNS ON YOUR SERVER after upload
  //     console.log("Upload complete for userId:", metadata.userId);

  //     console.log("file url", file.url);

  //     // !!! Whatever is returned here is sent to the clientside `onClientUploadComplete` callback
  //     return { uploadedBy: metadata.userId };
  //   }),
};
