"use client";

import {
  Bold,
  Heading2,
  Italic,
  List,
  ListOrdered,
  LucideAlignVerticalDistributeStart,
  Redo,
  Ruler,
  Strikethrough,
  Underline,
  Undo,
} from "lucide-react";
import { Toggle } from "../ui/toggle";

export const Toolbar = ({ editor }) => {
  if (!editor) return null;

  return (
    <div className="flex justify-between border border-muted-foreground/50 bg-transparent rounded-md mb-2">
      <div>
        <Toggle
          size="sm"
          pressed={editor.isActive("heading")}
          onPressedChange={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("hardBreak")}
          onPressedChange={() => editor.chain().focus().setHardBreak().run()}
        >
          <LucideAlignVerticalDistributeStart className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("horizontalRule")}
          onPressedChange={() =>
            editor.chain().focus().setHorizontalRule().run()
          }
        >
          <Ruler className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bold")}
          onPressedChange={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("italic")}
          onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("underline")}
          onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        >
          <Underline className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("strike")}
          onPressedChange={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <List className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("orderedList")}
          onPressedChange={() =>
            editor.chain().focus().toggleOrderedList().run()
          }
        >
          <ListOrdered className="h-4 w-4" />
        </Toggle>
      </div>
      <div>
        <Toggle
          size="sm"
          pressed={editor.isActive("undo")}
          onPressedChange={() => editor.chain().focus().undo().run()}
        >
          <Undo className="h-4 w-4" />
        </Toggle>
        <Toggle
          size="sm"
          pressed={editor.isActive("redo")}
          onPressedChange={() => editor.chain().focus().redo().run()}
        >
          <Redo className="h-4 w-4 bg-transparent" />
        </Toggle>
      </div>
    </div>
  );
};
