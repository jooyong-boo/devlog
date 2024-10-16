'use client';

import { useRouter } from 'next/navigation';
import Button from '@/components/Button';
import ImageInput from '@/components/ImageInput';
import Input from '@/components/Input';
import useModal from '@/components/Modal/hooks/useModal';
import useToast from '@/hooks/useToast';
import { postProjects } from '@/services/projects';

const CreateProject = () => {
  const router = useRouter();

  const { enqueueSuccessBar, enqueueErrorBar } = useToast();
  const { Modal, close, open } = useModal();

  const handleOpenModal = () => {
    open('createProject');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get('name') as string;
    const desc = formData.get('desc') as string;
    const image = formData.get('image') as File;

    try {
      await postProjects({ name, desc, image });
      enqueueSuccessBar('프로젝트가 생성되었습니다.', 'success');
      close('createProject');
      router.refresh();
    } catch (e) {
      enqueueErrorBar('프로젝트 생성 중 오류가 발생했습니다.', 'error');
    }
  };

  return (
    <>
      <Button onClick={handleOpenModal}>New Project</Button>
      <Modal modalKey="createProject">
        <div className="flex flex-col gap-4">
          <h2>Create Project</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <ImageInput name="image" />
            <Input name="name" placeholder="프로젝트명" />
            <Input name="desc" placeholder="프로젝트 설명" />
            <Button type="submit">Create</Button>
          </form>
        </div>
      </Modal>
    </>
  );
};

export default CreateProject;
