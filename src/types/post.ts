import { Tag } from '@/types/tags.prisma';
import { User } from '@/types/user';

export interface CreatePostRequest {
  title: string;
  content: string;
  tags: string[];
  thumbnail: File;
  published: boolean;
  url: string;
  projectId: number;
}

export interface CreatePostResponse {
  id: string;
}

export interface UpdatePost {
  title: string;
  content: string;
  tags: string[];
  thumbnail?: File;
  published: boolean;
  originUrl: string;
  newUrl: string;
  projectId: number;
}

export interface PostDetail {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
  thumbnail: string;
  viewCount: number;
}

type CommentUser = Pick<User, 'nickname' | 'profile'>;

export interface Comment {
  id: number;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  user: CommentUser;
  parentId: number | null;
}

export interface PostDetailResponse {
  postDetail: PostDetail & { comments: Comment[] };
}

export interface AdjacentPost {
  id: string;
  title: string;
}

export interface PostDetailNavigationResponse {
  prev: AdjacentPost | null;
  next: AdjacentPost | null;
}
