import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header/index';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
};

export default Layout;
