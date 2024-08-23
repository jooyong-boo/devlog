interface LabelProps extends React.HTMLAttributes<HTMLDivElement> {}

const Label = ({ ...props }: LabelProps) => {
  return (
    <div
      className="flex items-center gap-1 rounded-md bg-sky-600 px-1.5 py-0.5 text-sm text-slate-50"
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Label;
