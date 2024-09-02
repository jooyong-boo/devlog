export interface CreatePost {
  title: string;
  content: string;
  tags: string[];
  thumbnail: string;
  published: boolean;
  url: string;
}

export interface UpdatePost extends CreatePost {}
