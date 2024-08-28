'use client';

import { useSearchParams } from 'next/navigation';
import Button from '@/components/Button';
import Editor from '@/components/Editor/Editor';
import ImageInput from '@/components/ImageInput';
import Input from '@/components/Input';
import TagInput from '@/components/TagInput';
import PublicSetting from '@/containers/post/PublicSetting';
import InnerLayout from '@/layouts/InnerLayout';

const Page = () => {
  const searchParams = useSearchParams();

  if (searchParams.get('id')) {
    return <div>수정 페이지</div>;
  }

  return (
    <form>
      <InnerLayout className="gap-3">
        <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] items-center gap-x-4 gap-y-2">
          <ImageInput name="thumbnail" label="썸네일 업로드" />
          <div className="flex h-full w-full flex-col justify-center gap-4">
            <PublicSetting />
            <Input placeholder="URL을 입력하세요" id="url" label="URL 설정" />
          </div>
        </div>
        <Input placeholder="제목을 입력하세요" id="title" />
        <Editor />
        <TagInput />
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
