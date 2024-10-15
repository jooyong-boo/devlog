interface WidgetCardProps {
  title: string;
  value: number | string;
  icon: React.ReactNode;
}

const WidgetCard = ({ icon, title, value }: WidgetCardProps) => {
  return (
    <div className="flex justify-between rounded-md bg-slate-300 p-4 dark:bg-slate-800">
      <div className="flex flex-col">
        <p className="text-sm text-slate-600 dark:text-slate-400">{title}</p>
        <p className="mb-1 mt-4 text-2xl font-semibold text-slate-700 dark:text-slate-300">
          {value}
        </p>
      </div>
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-sky-400 dark:bg-orange-600">
        {icon}
      </div>
    </div>
  );
};

export default WidgetCard;
