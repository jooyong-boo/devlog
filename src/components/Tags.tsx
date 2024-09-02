import CustomLink from '@/components/CustomLink';

type tag = {
  id: string;
  name: string;
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
      <div className="flex flex-wrap gap-x-4">
        {tagList.map((tag) => (
          <div key={tag.id} className="flex items-center gap-1">
            <CustomLink href={tag.name}>{tag.name}</CustomLink>
            {tag.count && (
              <CustomLink href={tag.name} isColor={false} className="text-xs">
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
