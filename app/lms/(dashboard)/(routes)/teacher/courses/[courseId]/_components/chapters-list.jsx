"use client";

import { cn } from "@/lib/utils";
import { DragDropContext, Draggable, Droppable } from "@hello-pangea/dnd";
import { Chip } from "@nextui-org/react";
import { Grip, Pencil } from "lucide-react";
import { useEffect, useState } from "react";

export const ChaptersList = ({ items, onEdit, onReorder }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [chapters, setChapters] = useState(items);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    setChapters(items);
  }, [items]);

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const items = Array.from(chapters);
    const [reorderedItems] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItems);

    const startIndex = Math.min(result.source.index, result.destination.index);
    const endIndex = Math.max(result.source.index, result.destination.index);

    const updatedChapters = items.slice(startIndex, endIndex + 1);

    setChapters(items);

    const bulkUpdateData = updatedChapters.map((chapter) => ({
      id: chapter.id,
      position: items.findIndex((item) => item.id === chapter.id),
    }));

    onReorder(bulkUpdateData);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="chapters">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {chapters.map((chapter, index) => (
              <Draggable
                key={chapter.id}
                draggableId={chapter.id}
                index={index}
              >
                {(provided) => (
                  <div
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    className={cn(
                      "flex items-center gap-x-2 bg-background text-muted-foreground rounded-md mb-4 text-sm",
                      chapter.isPublished && " bg-primary text-white "
                    )}
                  >
                    <div
                      className={cn(
                        "px-2 py-3 dark:hover:bg-muted hover:bg-default-600 dark:active:bg-muted active:bg-default-600 rounded-l-md transition",
                        chapter.isPublished && "border-r-primary-500"
                      )}
                      {...provided.dragHandleProps}
                    >
                      <Grip className="h-5 w-5" />
                    </div>
                    {chapter.title}
                    <div className="ml-auto pr-2 flex items-center gap-x-2">
                      {chapter.isFree && (
                        <Chip className="text-xs z-10">Gratuit</Chip>
                      )}
                      <Chip
                        className={cn(
                          "bg-danger text-xs text-white z-10",
                          chapter.isPublished && "bg-success"
                        )}
                      >
                        {chapter.isPublished ? "Publié" : "Privé"}
                      </Chip>
                      <Pencil
                        onClick={() => onEdit(chapter.id)}
                        className="w-4 h-4 cursor-pointer hover:opacity-75 transition"
                      />
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};
