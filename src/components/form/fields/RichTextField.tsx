"use client";

import { useEditor, EditorContent, type Editor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import { TextStyle } from "@tiptap/extension-text-style";
import { Button } from "../../ui/button";
import InputsWrapper from "../../custom/inputs-wrapper";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Quote,
  Code,
  Undo,
  Redo,
  Heading1,
  Heading2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import RichTextConfigs from "../configs/RichTextConfigs";
import { memo } from "react";

const MenuBar = memo(function MenuBar({ editor }: { editor: Editor | null }) {
  if (!editor) {
    return null;
  }

  return (
    <div className="border-b p-2 flex flex-wrap gap-1 items-center bg-muted/20">
      <Button
        variant={editor.isActive("bold") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className="h-8 w-8"
      >
        <Bold className="size-4" />
      </Button>
      <Button
        variant={editor.isActive("italic") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        className="h-8 w-8"
      >
        <Italic className="size-4" />
      </Button>
      <Button
        variant={editor.isActive("strike") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        className="h-8 w-8"
      >
        <Strikethrough className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant={
          editor.isActive("heading", { level: 1 }) ? "secondary" : "ghost"
        }
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className="h-8 w-8"
      >
        <Heading1 className="size-4" />
      </Button>
      <Button
        variant={
          editor.isActive("heading", { level: 2 }) ? "secondary" : "ghost"
        }
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className="h-8 w-8"
      >
        <Heading2 className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant={editor.isActive("bulletList") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className="h-8 w-8"
      >
        <List className="size-4" />
      </Button>
      <Button
        variant={editor.isActive("orderedList") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className="h-8 w-8"
      >
        <ListOrdered className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant={editor.isActive("blockquote") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        className="h-8 w-8"
      >
        <Quote className="size-4" />
      </Button>
      <Button
        variant={editor.isActive("codeBlock") ? "secondary" : "ghost"}
        size="icon-xs"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className="h-8 w-8"
      >
        <Code className="size-4" />
      </Button>
      <div className="w-px h-6 bg-border mx-1" />
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        className="h-8 w-8"
      >
        <Undo className="size-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon-xs"
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        className="h-8 w-8"
      >
        <Redo className="size-4" />
      </Button>
    </div>
  );
});

const RichTextField = memo(function RichTextField({ data }: { data: Field }) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit,
      Highlight,
      TextStyle,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: "",
    editorProps: {
      attributes: {
        class: cn(
          "min-h-[150px] p-3 w-full outline-none",
          "[&_ul]:list-disc [&_ul]:pl-6",
          "[&_ol]:list-decimal [&_ol]:pl-6",
          "[&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-4 [&_blockquote]:italic",
          "[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mb-2",
          "[&_h2]:text-xl [&_h2]:font-bold [&_h2]:mb-2",
          "[&_h3]:text-lg [&_h3]:font-bold [&_h3]:mb-1",
          "[&_a]:text-primary [&_a]:underline",
          "[&_p]:mb-2",
        ),
      },
    },
  });

  return (
    <InputsWrapper data={data} configs={<RichTextConfigs data={data} />}>
      <div className="border rounded-md overflow-hidden bg-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
        <MenuBar editor={editor} />
        <EditorContent editor={editor} />
      </div>
      <p className="text-sm mb-2 text-muted-foreground">{data.helperText}</p>
    </InputsWrapper>
  );
});

export default RichTextField;
