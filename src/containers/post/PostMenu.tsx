'use client';

import { useState } from 'react';
import Link from 'next/link';
import { BurgerMenu } from '@/assets/svg/index';
import { deletePost } from '@/services/posts';

const PostMenu = ({ id }: { id: string }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const handleDeletePost = async () => {
    if (confirm('삭제하시겠습니까?')) {
      await deletePost(id);
    }
  };

  return (
    <div className="relative">
      <button onClick={handleToggleMenu}>
        <BurgerMenu />
      </button>
      {isMenuOpen && (
        <div className="absolute right-0 flex w-24 flex-col gap-2 rounded-md bg-slate-600 p-2 text-center">
          <Link
            className="hover:text-sky-600 dark:hover:text-orange-600"
            href={`/posts/${id}/edit`}
          >
            수정하기
          </Link>
          <button
            className="hover:text-sky-600 dark:hover:text-orange-600"
            onClick={handleDeletePost}
          >
            삭제하기
          </button>
        </div>
      )}
    </div>
  );
};

export default PostMenu;
