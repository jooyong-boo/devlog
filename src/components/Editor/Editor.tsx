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
import { createLowlight, all } from 'lowlight';
import { Markdown } from 'tiptap-markdown';
import CodeBlock from '@/components/Editor/CodeBlock';
import Toolbar from '@/components/Editor/Toolbar';
import { cn } from '@/utils/cn';
import './editor.css';

const lowlight = createLowlight();

lowlight.register('html', html);
lowlight.register('css', css);
lowlight.register('js', js);
lowlight.register('ts', ts);
lowlight.register('json', josn);

const Editor = () => {
  const [text, setText] = useState('<p>Hello World! 🌎️</p>');

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
    ],
    content: text,
    onUpdate({ editor }) {
      setText(editor.getHTML());
    },
  });

  return (
    <main className="px-11 py-14">
      <div className={cn(`codeblock overflow-hidden rounded-sm`)}>
        {editor && <Toolbar editor={editor} />}
        <div className="border border-t-0">
          <EditorContent editor={editor} />
        </div>
      </div>
    </main>
  );
};

export default Editor;
