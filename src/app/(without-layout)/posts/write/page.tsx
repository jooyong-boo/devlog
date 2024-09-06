'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Editor from '@/components/Editor/Editor';
import ImageInput from '@/components/ImageInput';
import Input from '@/components/Input';
import TagInput from '@/components/TagInput';
import PublicSetting from '@/containers/post/PublicSetting';
import useToast from '@/hooks/useToast';
import InnerLayout from '@/layouts/InnerLayout';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const { enqueueWarningBar } = useToast();

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

    const body = {
      title,
      content,
      tags,
      thumbnail: thumbnail.name,
      published: published === 'public',
      url,
    };

    try {
      const result = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      }).then((res) => res.json());
      router.replace(`/posts/${result.id}`);
    } catch (e) {
      enqueueWarningBar('게시글 작성에 실패 했습니다.', 'error');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <InnerLayout className="gap-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-x-4 gap-y-2">
          <ImageInput name="thumbnail" label="썸네일 업로드" />
          <div className="flex h-full w-full flex-col justify-center gap-4">
            <PublicSetting name="published" />
            <Input
              placeholder="URL을 입력하세요"
              id="url"
              label="URL 설정"
              name="url"
            />
          </div>
        </div>
        <Input placeholder="제목을 입력하세요" id="title" name="title" />
        <Editor name="content" />
        <TagInput name="tags" />
        <div className="flex items-center justify-end gap-2">
          <Button size="lg" variant="light">
            취소
          </Button>
          <Button size="lg" type="submit">
            게시하기
          </Button>
        </div>
      </InnerLayout>
    </form>
  );
};

export default Page;
