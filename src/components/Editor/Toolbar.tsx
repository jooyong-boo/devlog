import { useCallback, useRef } from 'react';
import { type Editor } from '@tiptap/react';
import {
  Bold,
  Code,
  Bulleted,
  H1,
  H2,
  H3,
  ImageUpload,
  Link,
  Numbered,
  Strike,
  Underlined,
  LinkUnset,
  Highlight,
} from '@/assets/svg/editor/index';
import { tailwindTheme } from '@/utils/tailwindTheme';

const Toolbar = ({ editor }: { editor: Editor }) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    // update link
    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  const imageRef = useRef<HTMLInputElement>(null);

  const handleUploadImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];

    const fileExt = file?.name.split('.').pop();
    const fullFilename = `${fileExt}`;
  };

  const handleClickUpload = () => {
    if (imageRef.current) {
      imageRef.current.click();
    }
  };
  if (!editor) {
    return null;
  }
  return (
    <div className="flex flex-wrap gap-2 fill-slate-900 p-1">
      <div className="flex items-center gap-1">
        <button
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
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        className={editor.isActive('bold') ? 'is-active' : ''}
      >
        <Bold />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        className={editor.isActive('codeBlock') ? 'is-active' : ''}
      >
        <Code />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={editor.isActive('bulletList') ? 'is-active' : ''}
      >
        <Bulleted />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={editor.isActive('orderedList') ? 'is-active' : ''}
      >
        <Numbered />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={editor.isActive('strike') ? 'is-active' : ''}
      >
        <Strike />
      </button>
      <button
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        className={editor.isActive('underline') ? 'is-active' : ''}
      >
        <Underlined />
      </button>
      <button
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
      <button
        onClick={setLink}
        className={editor.isActive('link') ? 'is-active' : ''}
      >
        <Link />
      </button>
      <button onClick={() => editor.chain().focus().unsetLink().run()}>
        <LinkUnset />
      </button>
      <button onClick={handleClickUpload}>
        <ImageUpload />
        <input
          ref={imageRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleUploadImage}
        />
      </button>
    </div>
  );
};

export default Toolbar;
