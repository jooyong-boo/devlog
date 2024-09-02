import Button from '@/components/Button';
import Viewer from '@/components/Editor/Viewer';
import Tags from '@/components/Tags';
import Textarea from '@/components/Textarea';
import Title from '@/components/Title';
import CommentList from '@/containers/post/CommentList';
import LinkedPostCard from '@/containers/post/LinkedPostCard';
import InnerLayout from '@/layouts/InnerLayout';
import { formatDate } from '@/utils/convert';

const page = async ({ params }: { params: { id: string } }) => {
  const getPostDetail = async () => {
    const res = await fetch(`${process.env.URL}/api/posts/${params.id}`, {
      method: 'GET',
    });
    const data = await res.json();
    return data.postDetail;
  };

  const getPostNavigation = async () => {
    const res = await fetch(
      `${process.env.URL}/api/posts/${params.id}/navigation`,
      {
        method: 'GET',
      },
    );
    const data = await res.json();
    return data;
  };

  const postDetail = await getPostDetail();
  const postNavigation = await getPostNavigation();

  if (!postDetail) {
    return <div>Loading...</div>;
  }

  return (
    <InnerLayout>
      <div className="flex flex-col gap-2">
        <time dateTime="2024-08-28">
          {formatDate(postDetail.createdAt, { format: 'full' })}
        </time>
        <Title size="large" borderBottom>
          {postDetail.title}
        </Title>
        {/* <Tags tagList={TagsList} /> */}
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
        <Title size="small">{postDetail.comments.length}개의 댓글</Title>
        <Textarea placeholder="댓글을 작성해주세요" />
        <Button className="self-end">댓글 작성</Button>
      </section>
      <CommentList lists={postDetail.comments} />
    </InnerLayout>
  );
};

export default page;
