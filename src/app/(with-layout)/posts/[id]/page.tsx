import { headers } from 'next/headers';
import Link from 'next/link';
import Button from '@/components/Button';
import Viewer from '@/components/Editor/Viewer';
import Tags from '@/components/Tags';
import Title from '@/components/Title';
import CommentInput from '@/containers/post/CommentInput';
import CommentList from '@/containers/post/CommentList';
import LinkedPostCard from '@/containers/post/LinkedPostCard';
import LinkedProjectCard from '@/containers/post/LinkedProjectCard';
import InnerLayout from '@/layouts/InnerLayout';
import { getPostDetail, getPostDetailNavigation } from '@/services/posts';
import { formatDate } from '@/utils/convert';

const page = async ({ params }: { params: { id: string } }) => {
  const headersList = headers();
  const { id } = params;
  const isAdmin = headersList.get('x-admin');

  const postDetail = await getPostDetail(id);

  const postNavigation = await getPostDetailNavigation(id);

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  return (
    <InnerLayout className="gap-4">
      <div className="flex flex-col gap-2 border-b border-slate-400 pb-3">
        <time dateTime="2024-08-28">
          {formatDate(postDetail.createdAt, { format: 'full' })}
        </time>
        <div className="flex items-center justify-between">
          <Title size="large">{postDetail.title}</Title>
          {isAdmin && (
            <Link href={`/posts/${id}/edit`}>
              <Button size="sm">수정하기</Button>
            </Link>
          )}
        </div>
        <Tags tagList={postDetail.postTag} />
        <LinkedProjectCard
          subText={postDetail.project.name}
          title={postDetail.project.desc}
          href={`/projects/${postDetail.project.id}`}
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
