import React from 'react';
import { useSession } from 'next-auth/react';
import Button from '@/components/Button';
import ImageInput from '@/components/ImageInput';
import Input from '@/components/Input';
import useToast from '@/hooks/useToast';
import { editUsers } from '@/services/users';

interface ProfileEditProps {
  profileSrc: string;
  nickname: string;
}

const ProfileEdit = ({ nickname, profileSrc }: ProfileEditProps) => {
  const { enqueueSuccessBar } = useToast();
  const { status, update } = useSession();

  const handleEdit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const nickname = formData.get('nickname') as string;
    const profile = formData.get('profile') as File;

    try {
      const result = await editUsers({ nickname, profile });
      if (status === 'authenticated') {
        update({
          profile: result.userInfo.profile,
          nickname: result.userInfo.nickname,
        });
      }
      enqueueSuccessBar(result.message, 'edit');
    } catch (e) {
      alert(e);
    }
  };
  return (
    <form
      className="flex w-full flex-col items-center gap-4"
      onSubmit={handleEdit}
    >
      <div className="rounfed-full h-32 w-32">
        <ImageInput name="profile" originSrc={profileSrc} />
      </div>
      <Input label="닉네임" defaultValue={nickname} name="nickname" />
      <Button type="submit" size="half">
        저장
      </Button>
    </form>
  );
};

export default ProfileEdit;
