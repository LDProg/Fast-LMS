import { Banner } from "@/components/lms/banner";
import IconBadge from "@/components/ui/icon-badge";
import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { ChapterAccessForm } from "./_components/chapter-access-form";
import { ChapterActions } from "./_components/chapter-actions";
import { ChapterDescriptionForm } from "./_components/chapter-description-form";
import { ChapterTitleForm } from "./_components/chapter-title-form";
import { ChapterVideoForm } from "./_components/chapter-video-form";

export default async function LmsTeacherCourseChapterPage({ params }) {
  const userId = await currentUserId(await currentUser());

  if (!userId) return redirect("/lms");

  const chapter = await prisma.chapter.findUnique({
    where: { id: params.chapterId, courseId: params.courseId },
    include: {
      muxData: true,
    },
  });

  if (!chapter) return redirect(`/lms/teacher/courses/${params.courseId}`);

  const requiredFields = [chapter.title, chapter.description];
  // chapter.videoUrl

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `${completedFields}/${totalFields}`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter?.isPublished && (
        <Banner
          variant="warning"
          label="Ce chapitre n'est pas publié. Il ne sera pas visible dans le cours."
        />
      )}
      <div className="p-6 h-full">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              color="foreground"
              href={`/lms/teacher/courses/${params?.courseId}`}
              className="cursor-pointer flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Retour à la configuration du cours
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Création du chapitre</h1>
                <span className="text-sm text-muted-foreground/80">
                  Complétez tous les champs {completionText}
                </span>
              </div>
              <ChapterActions
                isDisabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter?.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div className="space-y-4">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon="LayoutDashboard" />
                <h2 className="text-xl">Configurez votre chapitre</h2>
              </div>
              <ChapterTitleForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
              <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon="Eye" />
                <h2 className="text-xl">Paramètres d&apos;accès</h2>
              </div>
              <ChapterAccessForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge size="sm" icon="Video" />
              <h2 className="text-xl">Ajoutez une vidéo</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  );
}
