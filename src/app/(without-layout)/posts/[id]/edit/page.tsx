import EditPostForm from '@/containers/post/edit/EditPostForm';
import { getPostDetail } from '@/services/posts';

const Page = async ({ params }: { params: { id: string } }) => {
  const { id } = params;

  const postDetail = await getPostDetail(id);

  return <EditPostForm initialData={postDetail} />;
};

export default Page;
