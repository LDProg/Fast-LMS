import { Banner } from "@/components/lms/banner";
import { currentUserId } from "@/lib/auth";
import { getChapter } from "@/utils/chapters";
import { redirect } from "next/navigation";
import { VideoPlayer } from "./_components/video-player";
import { CourseProgressButton } from "./_components/course-progress-button";
import { CourseEnrollButton } from "./_components/course-enroll-button";
import { Button, Spacer } from "@nextui-org/react";
import { File } from "lucide-react";
import HTMLReactParser from "html-react-parser";

export default async function LmsChapterIdPage({ params }) {
  const userId = await currentUserId();

  if (!userId) return redirect("/auth/signin");

  const {
    chapter,
    course,
    muxData,
    attachments,
    nextChapter,
    userProgress,
    purchase,
  } = await getChapter({ userId, ...params });

  if (!chapter || !course) return redirect("/lms");

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div>
      {userProgress?.isCompleted && (
        <Banner variant="success" label="Vous avez déjà terminé ce chapitre" />
      )}
      {isLocked && (
        <Banner
          variant="warning"
          label="Vous devez acheter ce chapitre pour le déverrouiller"
        />
      )}
      <div className="flex flex-col max-w-4xl mx-auto pb-20">
        <div className="p-4">
          <VideoPlayer
            chapterId={params.chapterId}
            courseId={params.courseId}
            title={chapter.title}
            nextChapterId={nextChapter?.id}
            playbackId={muxData?.playbackId}
            isLocked={isLocked}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">{chapter.title}</h2>
          {purchase ? (
            <CourseProgressButton
              chapterId={params.chapterId}
              courseId={params.courseId}
              nextChapterId={nextChapter?.id}
              isCompleted={!!userProgress?.isCompleted}
            />
          ) : (
            <CourseEnrollButton
              courseId={params.courseId}
              price={course?.price}
            />
          )}
        </div>
        <div>{HTMLReactParser(chapter.description)}</div>
        {!!attachments.length && (
          <>
            <Spacer y={2} />
            <div className="p-4">
              {attachments.map((attachment) => (
                <Button
                  aria-label="Voir la pièce jointe"
                  as={Link}
                  href={attachment.url}
                  target="_blank"
                  key={attachment.id}
                  startContent={<File className="w-4 h-4" />}
                >
                  {attachment.name}
                </Button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
