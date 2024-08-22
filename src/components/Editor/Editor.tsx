'use client';

import { useState } from 'react';
import CodeBlock from '@tiptap/extension-code-block';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import Highlight from '@tiptap/extension-highlight';
import Image from '@tiptap/extension-image';
import Link from '@tiptap/extension-link';
import Underline from '@tiptap/extension-underline';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import { common, createLowlight } from 'lowlight';
import { Markdown } from 'tiptap-markdown';
import Toolbar from '@/components/Editor/Toolbar';
import { cn } from '@/utils/cn';
import './editor.css';

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
      CodeBlock.configure({
        languageClassPrefix: 'language-',
      }),
      CodeBlockLowlight.configure({
        lowlight: createLowlight(common),
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
      <div className={cn(`codeblock rounded-sm border p-5`)}>
        {editor && <Toolbar editor={editor} />}
        <EditorContent editor={editor} />
      </div>
    </main>
  );
};

export default Editor;
