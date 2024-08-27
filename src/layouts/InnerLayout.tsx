import { cn } from '@/utils/cn';

interface InnerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const InnerLayout = ({ children, className }: InnerLayoutProps) => {
  return (
    <section className={cn(`relative flex flex-col`, className)}>
      {children}
    </section>
  );
};

export default InnerLayout;
