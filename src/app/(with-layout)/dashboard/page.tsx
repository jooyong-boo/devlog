import { User, Folder, Article } from '@/assets/svg/index';
import WidgetCard from '@/components/Card/WidgetCard';
import InnerLayout from '@/layouts/InnerLayout';
import { getStats } from '@/services/admin';

const page = async () => {
  const { totalPosts, totalProjects, totalUser } = await getStats();

  const widgets = [
    {
      title: 'Users',
      value: totalUser,
      icon: <User width={24} height={24} />,
    },
    {
      title: 'Posts',
      value: totalPosts,
      icon: <Article width={24} height={24} />,
    },
    {
      title: 'Projects',
      value: totalProjects,
      icon: <Folder width={24} height={24} />,
    },
  ];

  return (
    <InnerLayout>
      <div className="grid grid-rows-3 gap-4 fill-slate-700 dark:fill-slate-300 sm:grid-cols-3">
        {widgets.map((widget) => (
          <WidgetCard
            key={widget.title}
            title={widget.title}
            value={widget.value}
            icon={widget.icon}
          />
        ))}
      </div>
    </InnerLayout>
  );
};

export default page;
