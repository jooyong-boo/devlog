import { headers } from 'next/headers';
import Viewer from '@/components/Editor/Viewer';
import Tags from '@/components/Tags';
import Title from '@/components/Title';
import CommentInput from '@/containers/post/CommentInput';
import CommentList from '@/containers/post/CommentList';
import LinkedPostCard from '@/containers/post/LinkedPostCard';
import LinkedProjectCard from '@/containers/post/LinkedProjectCard';
import PostMenu from '@/containers/post/PostMenu';
import InnerLayout from '@/layouts/InnerLayout';
import { getPostDetail, getPostDetailNavigation } from '@/services/posts';
import { formatDate } from '@/utils/convert';
import { extractTextFromHtml } from '@/utils/html';
import prisma from '../../../../../prisma/client';

export const revalidate = 60;

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const postDetail = await getPostDetail(id);

  return {
    title: postDetail.title,
    description: postDetail.content,
    openGraph: {
      title: postDetail.title,
      description: extractTextFromHtml(postDetail.content),
      images: [postDetail.thumbnail],
    },
    image: postDetail.thumbnail,
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
}

export async function generateStaticParams() {
  const result = await prisma.posts.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
    },
  });
  return result.map((post) => ({
    id: post.id.toString(),
  }));
}

const page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const { id } = params;
  const isAdmin = headersList.get('x-admin');

  const postDetail = await getPostDetail(id);

  const postNavigation = await getPostDetailNavigation(id);

  return (
    <InnerLayout className="gap-4">
      <div className="flex flex-col gap-2 border-b border-slate-400 pb-3">
        <time dateTime="2024-08-28">
          {formatDate(postDetail.createdAt, { format: 'full' })}
        </time>
        <div className="flex items-center justify-between">
          <Title size="large">{postDetail.title}</Title>
          {isAdmin && <PostMenu id={id} />}
        </div>
        <Tags tagList={postDetail.postTag} />
        <LinkedProjectCard
          subText={postDetail.project.name}
          title={postDetail.project.desc}
          href={`/projects/${postDetail.project.name}`}
        />
      </div>
      {/* TODO: 게시글 상세 목차기능  (https://github.com/tscanlin/tocbot) - pc는 오른쪽 사이드, 모바일은 제목과 본문 사이 (velog 참고) */}
      <Viewer content={postDetail.content} />
      <section className="flex flex-col-reverse justify-center gap-4 md:flex-row">
        {postNavigation.prev && (
          <LinkedPostCard
            title={postNavigation.prev.title}
            href={postNavigation.prev.id}
          />
        )}
        {postNavigation.next && (
          <LinkedPostCard
            right
            title={postNavigation.next.title}
            href={postNavigation.next.id}
          />
        )}
      </section>
      <section className="flex flex-col gap-3">
        <Title size="small">{postDetail.comments.totalCount}개의 댓글</Title>
        <CommentInput />
      </section>
      <CommentList lists={postDetail.comments.lists} />
    </InnerLayout>
  );
};

export default page;
