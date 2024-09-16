'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Editor from '@/components/Editor/Editor';
import ImageInput from '@/components/ImageInput';
import Input from '@/components/Input';
import TagInput from '@/components/TagInput';
import PostSetting from '@/containers/post/write/PostSetting';
import useToast from '@/hooks/useToast';
import InnerLayout from '@/layouts/InnerLayout';
import { createPost } from '@/services/posts';
import { CreatePostRequest } from '@/types/post';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { enqueueWarningBar } = useToast();

  const goBack = () => {
    router.back();
  };

  if (searchParams.get('id')) {
    return <div>수정 페이지</div>;
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get('title') as string;
    const content = formData.get('content') as string;
    const tags = formData.getAll('tags') as string[];
    const thumbnail = formData.get('thumbnail') as File;
    const published = formData.get('published') as string;
    const url = formData.get('url') as string;
    const projectId = formData.get('projectId') as string;

    const body: CreatePostRequest = {
      title,
      content,
      tags,
      thumbnail,
      published: published === 'public',
      url,
      projectId: Number(projectId),
    };

    try {
      const result = await createPost({
        ...body,
      });
      router.replace(`/posts/${result.id}`);
    } catch (e) {
      if (e instanceof Error) {
        enqueueWarningBar(e.message, 'error');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InnerLayout className="gap-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-x-4 gap-y-2">
          <ImageInput name="thumbnail" label="썸네일 업로드" />
          <PostSetting />
        </div>
        <Input placeholder="제목을 입력하세요" id="title" name="title" />
        <Editor name="content" />
        <TagInput name="tags" />
        <div className="flex items-center justify-end gap-2">
          <Button size="md" variant="light" onClick={goBack}>
            취소
          </Button>
          <Button size="md" type="submit">
            게시하기
          </Button>
        </div>
      </InnerLayout>
    </form>
  );
};

export default Page;
