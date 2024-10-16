import Link from 'next/link';

const menu = [
  {
    title: 'Dashboard',
    link: '/admin/dashboard',
  },
  {
    title: 'Users',
    link: '/admin/users',
  },
  {
    title: 'Posts',
    link: '/admin/posts',
  },
  {
    title: 'Projects',
    link: '/admin/projects',
  },
];

const Sidebar = () => {
  return (
    <nav className="sticky top-0 flex min-w-32 border-r border-slate-200 bg-slate-100 px-4 py-2 dark:border-slate-600 dark:bg-slate-700">
      <ul className="flex flex-col gap-2">
        {menu.map((item) => (
          <li key={item.title}>
            <Link href={item.link}>{item.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Sidebar;
