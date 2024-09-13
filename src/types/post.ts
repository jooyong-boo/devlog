import { Tag } from '@/types/tag';
import { User } from '@/types/user';

export interface CreatePostRequest {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  published: boolean;
  url: string;
  projectId: number;
}

export interface CreatePostResponse {
  id: string;
}

export interface UpdatePost extends CreatePostRequest {}

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
