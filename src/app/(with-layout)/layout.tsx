import TopScroll from '@/components/TopScroll';
import Footer from '@/layouts/Footer';
import Header from '@/layouts/Header/index';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Header />
      <div className="flex flex-grow flex-col">{children}</div>
      <Footer />
      <TopScroll />
    </>
  );
};

export default Layout;
