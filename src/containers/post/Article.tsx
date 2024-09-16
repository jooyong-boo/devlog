import Image from 'next/image';
import Link from 'next/link';
import { Preview, ArrowRight } from '@/assets/svg/index';
import CustomLink from '@/components/CustomLink';
import LinkTitle from '@/components/LinkTitle';
import Tags from '@/components/Tags';
import { FormattedPost } from '@/types/post.prisma';
import { formatDate } from '@/utils/convert';

const Article = ({
  id,
  content,
  createdAt,
  postTag,
  thumbnail,
  title,
  viewCount,
}: FormattedPost) => {
  return (
    <article className="sm:item-start flex flex-col gap-3 py-8 sm:flex-row sm:gap-10">
      <Link
        href={`/posts/${id}`}
        className="h-full w-full self-center overflow-hidden rounded-lg sm:min-h-[240px] sm:min-w-[240px] sm:max-w-[240px]"
      >
        <div className="relative aspect-[4/2.5] sm:aspect-square">
          <Image
            src={thumbnail || 'https://placehold.co/600x400'}
            alt={title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 sm:flex-grow sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <time dateTime="" className="text-sm text-slate-400">
            {formatDate(createdAt, { format: 'full' })}
          </time>
          <LinkTitle href={`/posts/${id}`}>{title}</LinkTitle>
          <Tags tagList={postTag} />
          <div
            className="text-overflow-3"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
        <div className="flex justify-between">
          <CustomLink
            href={`/posts/${id}`}
            className="flex items-center gap-0.5"
          >
            Read more <ArrowRight width={16} height={16} />
          </CustomLink>
          <div className="flex items-center gap-1 fill-slate-900 text-sm dark:fill-slate-50">
            <Preview width={20} height={20} />
            {viewCount} Views
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
