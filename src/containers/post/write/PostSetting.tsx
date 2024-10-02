import Input from '@/components/Input';
import ProjectSetting from '@/containers/post/write/ProjectSetting';
import PublicSetting, { Active } from '@/containers/post/write/PublicSetting';

interface PostSettingProps {
  defaultPublic?: Active;
  defaultUrl?: string;
  defaultProjectId?: number;
}

const PostSetting = ({
  defaultProjectId,
  defaultPublic = 'public',
  defaultUrl = '',
}: PostSettingProps) => {
  return (
    <div className="flex h-full w-full flex-col justify-center gap-4">
      <PublicSetting name="published" defaultPublic={defaultPublic} />
      <Input
        placeholder="URL을 입력하세요"
        id="url"
        label="URL 설정"
        name="url"
        defaultValue={defaultUrl}
      />
      <ProjectSetting defaultProjectId={defaultProjectId} />
    </div>
  );
};

export default PostSetting;
