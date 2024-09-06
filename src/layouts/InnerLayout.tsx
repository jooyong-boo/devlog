import { cn } from '@/utils/cn';

interface InnerLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const InnerLayout = ({ children, className }: InnerLayoutProps) => {
  return (
    <section className={cn(`init-layout relative`, className)}>
      {children}
    </section>
  );
};

export default InnerLayout;
