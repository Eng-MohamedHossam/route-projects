// API response types

export interface PostUser {
  _id: string;
  id?: string;
  name: string;
  username: string;
  photo: string;
  followersCount?: number;
  followingCount?: number;
  bookmarksCount?: number;
}

export interface ApiPostDetail {
  _id: string;
  id: string;
  body: string;
  image?: string;
  privacy: string;
  user: PostUser;
  sharedPost: ApiPostDetail | null;
  likes: string[];
  createdAt: string;
  commentsCount: number;
  sharesCount: number;
  likesCount: number;
  isShare: boolean;
  bookmarked: boolean;
  topComment: ApiPostComment | null;
}

export interface ApiPostComment {
  _id: string;
  id?: string;
  content: string;
  commentCreator: PostUser;
  post: string;
  parentComment: string | null;
  likes: string[];
  createdAt: string;
  repliesCount?: number;
  likesCount?: number;
  isReply?: boolean;
  replies?: ApiPostComment[];
}

export interface SinglePostResponse {
  success: boolean;
  message: string;
  data: {
    post: ApiPostDetail;
  };
}

export interface CommentsResponse {
  success: boolean;
  message: string;
  data: {
    comments: ApiPostComment[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
    };
  };
}

export interface RepliesResponse {
  success: boolean;
  message: string;
  data: {
    replies: ApiPostComment[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      total: number;
      numberOfPages: number;
    };
  };
}

// UI types used by Post Details components

export type PostDetailsStatus = "loading" | "success" | "error";

export interface PostDetailsUser {
  id: string;
  name: string;
  username: string;
  avatarUrl: string;
  initials: string;
  online?: boolean;
  verified?: boolean;
  title?: string;
}

export interface PostComment {
  id: string;
  text: string;
  author: PostDetailsUser;
  createdAt: string;
  likesCount: number;
  likedByMe: boolean;
  repliesCount: number;
  replies: PostComment[];
}

export interface PostDetail {
  id: string;
  author: PostDetailsUser;
  text: string;
  imageUrl?: string;
  createdAt: string;
  likesCount: number;
  likedByMe: boolean;
  likedBy: PostDetailsUser[];
  repostsCount: number;
  commentsCount: number;
  bookmarkedByMe: boolean;
  imageAlt?: string;
  imageTitle?: string;
  imageTag?: string;
  client?: string;
  views?: number;
}

export interface PostDetailsData {
  post: PostDetail;
  comments: PostComment[];
}
