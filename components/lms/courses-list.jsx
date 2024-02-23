"use client";

import { CourseCard } from "@/components/lms/course-card";

export const CoursesList = ({ courses }) => {
  return (
    <div>
      <div className="grid sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4 mt-3">
        {courses.map((course) => (
          <CourseCard
            key={course?.id}
            id={course?.id}
            title={course?.title}
            imageUrl={course?.imageUrl}
            chaptersLength={course?.chapters?.length}
            price={course?.price}
            progress={course?.progress}
            category={course?.category?.name}
          />
        ))}
      </div>
      {courses.length === 0 && (
        <div className="flex justify-center items-center h-40">
          <p className="text-gray-400">Aucun cours trouvé</p>
        </div>
      )}
    </div>
  );
};
