export interface ApiPost {
  _id: string;
  id: string;
  body: string;
  image?: string;
  privacy: string;
  createdAt: string;
  bookmarked: boolean;
  bookmarksCount?: number;
  commentsCount: number;
  likes: string[];
  likesCount: number;
  sharesCount: number;
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
}

export interface PostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: ApiPost[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      nextPage: number | null;
      numberOfPages: number;
      total: number;
    };
  };
}
