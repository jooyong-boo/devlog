import { ArrowLeft, ArrowRight } from '@/assets/svg/index';
import NavigationCard, {
  NavigationCardProps,
} from '@/components/Card/NavigationCard';
import { cn } from '@/utils/cn';

interface LinkedPostCardProps
  extends Omit<NavigationCardProps, 'subText' | 'icon'> {}

const LinkedPostCard = ({
  href,
  title,
  right = false,
}: LinkedPostCardProps) => {
  return (
    <div className="group md:min-w-80 md:max-w-80">
      <NavigationCard
        href={href}
        icon={
          <Circle right={right}>
            {right ? <ArrowRight /> : <ArrowLeft />}
          </Circle>
        }
        title={title}
        right={right}
        subText={`${right ? '다음' : '이전'} 포스트`}
      />
    </div>
  );
};

const Circle = ({
  children,
  right,
}: {
  children: React.ReactNode;
  right: boolean;
}) => {
  return (
    <div
      className={cn(
        `rounded-full border-[1.5px] border-sky-600 fill-sky-600 p-1 dark:border-orange-600 dark:fill-orange-600`,
        right && 'group-hover:animate-bounce-right',
        !right && 'group-hover:animate-bounce-left',
      )}
    >
      {children}
    </div>
  );
};

export default LinkedPostCard;
