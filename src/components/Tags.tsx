import Link from 'next/link';
import CustomLink from '@/components/CustomLink';
import { TagsResult } from '@/types/tags.prisma';

interface TagsProps {
  tagList: TagsResult[];
}

const Tags = ({ tagList }: TagsProps) => {
  return (
    <div className="flex flex-wrap gap-x-4 gap-y-2">
      {tagList.map((tag) => (
        <div key={tag.id} className="flex items-center gap-1">
          <CustomLink className="text-sm" href={`/tags/${tag.name}`}>
            {tag.name}
          </CustomLink>
          {tag.count !== undefined && (
            <Link
              href={`/tags/${tag.name}`}
              className="text-sm text-slate-500 dark:text-slate-300"
            >
              ({tag.count})
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default Tags;
