import { type Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Bulleted,
  H1,
  H2,
  H3,
  Numbered,
  Strike,
  Underlined,
  LinkUnset,
  Highlight,
} from '@/assets/svg/editor/index';
import ImageUpload from '@/components/Editor/extension/ImageUpload';
import Link from '@/components/Editor/extension/Link';
import { tailwindTheme } from '@/utils/tailwindTheme';

export interface ToolbarProps {
  editor: Editor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="flex flex-wrap gap-2 border border-slate-300 fill-slate-600 p-2 dark:border-slate-800 dark:fill-slate-50">
      <div className="flex items-center gap-1">
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          className={
            editor.isActive('heading', { level: 1 }) ? 'is-active' : ''
          }
        >
          <H1 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={
            editor.isActive('heading', { level: 2 }) ? 'is-active' : ''
          }
        >
          <H2 />
        </button>
        <button
          type="button"
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          className={
            editor.isActive('heading', { level: 3 }) ? 'is-active' : ''
          }
        >
          <H3 />
        </button>
      </div>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Bold />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Code />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <Bulleted />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <Numbered />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Strike />
      </button>
      <button
        type="button"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <Underlined />
      </button>

      <button
        type="button"
        onClick={() =>
          editor
            .chain()
            .focus()
            .toggleHighlight({ color: tailwindTheme.colors.orange['400'] })
            .run()
        }
        className={editor.isActive('highlight') ? 'is-active' : ''}
      >
        <Highlight />
      </button>
      <Link editor={editor} />
      <button
        type="button"
        onClick={() => editor.chain().focus().unsetLink().run()}
      >
        <LinkUnset />
      </button>
      <ImageUpload editor={editor} />
    </div>
  );
};

export default Toolbar;
