import { useCallback } from 'react';
import { LinkSvg } from '@/assets/svg/editor/index';
import { ToolbarProps } from '@/components/Editor/Toolbar';

const Link = ({ editor }: ToolbarProps) => {
  const setLink = useCallback(() => {
    const previousUrl = editor.getAttributes('link').href;
    const url = window.prompt('URL', previousUrl);

    if (url === null) {
      return;
    }

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run();

      return;
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run();
  }, [editor]);

  return (
    <button
      type="button"
      onClick={setLink}
      className={editor.isActive('link') ? 'is-active' : ''}
    >
      <LinkSvg />
    </button>
  );
};

export default Link;
