import { Banner } from "@/components/lms/banner";
import IconBadge from "@/components/ui/icon-badge";
import { currentUser, currentUserId } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Link } from "@nextui-org/react";
import { ArrowLeft } from "lucide-react";
import { redirect } from "next/navigation";
import { AttachmentForm } from "./_components/attachment-form";
import { CategoryForm } from "./_components/category-form";
import { ChaptersForm } from "./_components/chapters-form";
import { CoursesActions } from "./_components/course-actions";
import { DescriptionForm } from "./_components/description-form";
import { ImageForm } from "./_components/image-form";
import { PriceForm } from "./_components/price-form";
import { TitleForm } from "./_components/title-form";

export default async function LmsTeacherCourseId({ params }) {
  const userId = await currentUserId(await currentUser());

  if (!userId) return redirect("/lms");

  const course = await prisma.course.findUnique({
    where: { id: params.courseId },
    include: {
      chapters: {
        orderBy: {
          position: "asc",
        },
      },
      attachments: {
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) return redirect("/lms/teacher/courses");

  const requiredFields = [
    course.title,
    course.description,
    // course.imageUrl,
    // course.price,
    course.categoryId,
    course.chapters.some((chapter) => chapter.isPublished),
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const complitionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!course.isPublished && (
        <Banner
          variant="warning"
          label="Ce cours n'est pas publié. Il ne sera pas visible dans la plateforme."
        />
      )}
      <div className="p-6">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <Link
              color="foreground"
              href="/lms/teacher/courses"
              className="cursor-pointer flex items-center text-sm hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tous les cours
            </Link>
            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Configuration du cours</h1>
                <span className="text-sm text-muted-foreground/60">
                  Complétez tous les champs {complitionText}
                </span>
              </div>
              <CoursesActions
                isDisabled={!isComplete}
                courseId={params.courseId}
                isPublished={course?.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge size="sm" icon="LayoutDashboard" />
              <h2 className="text-xl">Complétez votre cours</h2>
            </div>
            <TitleForm initialData={course} courseId={course.id} />
            <DescriptionForm initialData={course} courseId={course.id} />
            <ImageForm initialData={course} courseId={course.id} />
            <CategoryForm
              initialData={course}
              courseId={course.id}
              categories={categories.map((category) => ({
                label: category.name,
                value: category.id,
              }))}
            />
          </div>
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon="ListChecks" />
                <h2 className="text-xl">Chapitres du cours</h2>
              </div>
              <ChaptersForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon="BadgeEuro" />
                <h2 className="text-xl">Vendez votre cours</h2>
              </div>
              <PriceForm initialData={course} courseId={course.id} />
            </div>
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge size="sm" icon="File" />
                <h2 className="text-xl">Ressources et Pièces jointes</h2>
              </div>
              <AttachmentForm initialData={course} courseId={course.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
