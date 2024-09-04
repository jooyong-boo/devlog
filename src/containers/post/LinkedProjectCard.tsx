import { Folder } from '@/assets/svg/index';
import NavigationCard, {
  NavigationCardProps,
} from '@/components/Card/NavigationCard';

interface LinkedPostCardProps
  extends Omit<NavigationCardProps, 'right' | 'icon'> {}

const LinkedProjectCard = ({ href, title, subText }: LinkedPostCardProps) => {
  return (
    <NavigationCard
      href={href}
      icon={
        <div className="rounded-full fill-sky-600 p-1 dark:fill-orange-600">
          <Folder width={32} height={32} />
        </div>
      }
      title={title}
      subText={subText}
    />
  );
};

export default LinkedProjectCard;
