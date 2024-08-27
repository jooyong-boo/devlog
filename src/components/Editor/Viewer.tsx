import sanitizeHtml from '@/utils/sanitizeHtml';

interface ViewerProps {
  content: string;
}

const Viewer = ({ content }: ViewerProps) => {
  const htmlContent = { __html: sanitizeHtml(content) };
  return <div className="tiptap" dangerouslySetInnerHTML={htmlContent} />;
};

export default Viewer;
