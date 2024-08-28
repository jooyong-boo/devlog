import Image from 'next/image';
import Link from 'next/link';
import { Preview, ArrowRight } from '@/assets/svg/index';
import CustomLink from '@/components/CustomLink';
import LinkTitle from '@/components/LinkTitle';
import Tags from '@/components/Tags';
import { formatDate } from '@/utils/convert';

const TagsList = [
  { name: 'React', href: '/tags/react' },
  { name: 'Next.js', href: '/tags/nextjs' },
  { name: 'TailwindCSS', href: '/tags/tailwindcss' },
  { name: 'TypeScript', href: '/tags/typescript' },
  { name: 'Server Components', href: '/tags/server-components' },
  { name: 'React Server Components', href: '/tags/react-server-components' },
];

const Article = () => {
  return (
    <article className="sm:item-start flex flex-col gap-3 py-8 sm:flex-row sm:gap-10">
      <Link
        href="/posts/1"
        className="h-full w-full self-center overflow-hidden rounded-lg sm:min-h-[240px] sm:min-w-[240px] sm:max-w-[240px]"
      >
        <div className="relative aspect-[4/2.5] sm:aspect-square">
          <Image
            src="https://placehold.co/400x400"
            alt="Next.js"
            fill
            priority
            sizes=" 100vw"
            className="object-cover"
          />
        </div>
      </Link>
      <div className="flex flex-col gap-3 sm:justify-between">
        <div className="flex flex-col items-center gap-1 sm:items-start">
          <time dateTime="" className="text-sm text-slate-400">
            {formatDate('2024-08-27', { format: 'full' })}
          </time>
          <LinkTitle href="/posts/1">
            Release of Tailwind Nextjs Starter Blog v2.0
          </LinkTitle>
          <Tags tagList={TagsList} />
          <p className="text-overflow-3">
            Release of Tailwind Nextjs Starter Blog template v2.0, refactored
            with Nextjs App directory and React Server Components setup.Discover
            the new features and how to migrate from V1.
          </p>
        </div>
        <div className="flex justify-between">
          <CustomLink href="/posts/1" className="flex items-center gap-0.5">
            Read more <ArrowRight width={16} height={16} />
          </CustomLink>
          <div className="flex items-center gap-1 fill-slate-900 text-sm dark:fill-slate-50">
            <Preview width={20} height={20} />
            244 Views
          </div>
        </div>
      </div>
    </article>
  );
};

export default Article;
