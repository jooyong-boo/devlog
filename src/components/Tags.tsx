import CustomLink from '@/components/CustomLink';

type tag = {
  name: string;
  href: string;
  count?: number | string;
};

interface TagsProps {
  label?: string;
  tagList: tag[];
}

const Tags = ({ label, tagList }: TagsProps) => {
  return (
    <div>
      {label && <div className="text-xs dark:text-slate-300">{label}</div>}
      <div className="flex flex-wrap gap-4">
        {tagList.map((tag) => (
          <div key={tag.name} className="flex items-center gap-1">
            <CustomLink href={tag.href}>{tag.name}</CustomLink>
            {tag.count && (
              <CustomLink href={tag.href} isColor={false} className="text-xs">
                ({tag.count})
              </CustomLink>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tags;
