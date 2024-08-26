interface TitleProps extends React.HTMLAttributes<HTMLParagraphElement> {
  title?: string;
}

const Title = ({ title, ...props }: TitleProps) => {
  return <p className="text-xl font-bold">{title || props.children}</p>;
};

export default Title;
