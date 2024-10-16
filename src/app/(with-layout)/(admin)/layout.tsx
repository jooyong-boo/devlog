import Sidebar from '@/containers/admin/Sidebar';
import InnerLayout from '@/layouts/InnerLayout';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-grow">
      <Sidebar />
      <InnerLayout>{children}</InnerLayout>
    </div>
  );
};

export default Layout;
