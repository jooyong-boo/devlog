'use client';

import { useState } from 'react';
import React from 'react';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent, ReactNodeViewRenderer } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import josn from 'highlight.js/lib/languages/json';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';
import { createLowlight } from 'lowlight';
import ImageResize from 'tiptap-extension-resize-image';
import { Markdown } from 'tiptap-markdown';
import CodeBlock from '@/components/Editor/CodeBlock';
import Toolbar from '@/components/Editor/Toolbar';
import { cn } from '@/utils/cn';
import './editor.css';

interface EditorProps {
  value?: string;
  onChange?: (text: string) => void;
}

const lowlight = createLowlight();

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('javascript', js);
lowlight.register('typescript', ts);
lowlight.register('json', josn);

const Editor = ({ onChange, value }: EditorProps) => {
  const [text, setText] = useState(value);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Link.extend({ inclusive: false }).configure({
        openOnClick: false,
        defaultProtocol: 'https',
      }),
      Markdown,
      CodeBlockLowlight.extend({
        addNodeView() {
          return ReactNodeViewRenderer(CodeBlock);
        },
      }).configure({
        languageClassPrefix: 'language-',
        lowlight,
      }),
      Highlight.configure({
        multicolor: true,
      }),
      Underline,
      Image,
      ImageResize.configure({
        inline: true,
        HTMLAttributes: {
          class: 'editor-image',
        },
      }),
    ],
    content: text,
    onUpdate({ editor }) {
      setText(editor.getHTML());
      onChange?.(editor.getHTML());
    },
  });

  // TODO: 코드블록 hover시 복사하기 버튼 표시 및 기능 추가
  // TODO: 코드블록 복사하기 버튼 클릭시 클립보드에 복사
  // TODO: 코드블록에 파일명 제목으로 보이게 하기

  return (
    <div className={cn(`codeblock overflow-hidden rounded-sm`)}>
      {editor && <Toolbar editor={editor} />}
      <div className="border-t-0 bg-slate-200 dark:bg-slate-800">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
};

export default Editor;
