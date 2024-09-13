import { useState } from 'react';
import Button from '@/components/Button';
import Input from '@/components/Input';
import ProjectSetting from '@/containers/post/write/ProjectSetting';
import PublicSetting from '@/containers/post/write/PublicSetting';

const PostSetting = () => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <PublicSetting name="published" />
      <Input
        placeholder="URL을 입력하세요"
        id="url"
        label="URL 설정"
        name="url"
      />
      <ProjectSetting />
    </div>
  );
};

export default PostSetting;
