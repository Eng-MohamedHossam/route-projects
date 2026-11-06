export interface UserProfile {
  id: string;
  _id: string;
  name: string;
  username: string;
  email: string;
  photo: string;
  cover: string;
  dateOfBirth: string;
  gender: string;
  createdAt: string;
  bookmarks: string[];
  bookmarksCount: number;
  followers: string[];
  followersCount: number;
  following: string[];
  followingCount: number;
}

export interface MyProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
  };
}

export interface UserPost {
  id: string;
  _id: string;
  body: string;
  image?: string;
  privacy: string;
  createdAt: string;
  isShare: boolean;
  sharedPost: UserPost | null;
  likes: string[];
  likesCount: number;
  commentsCount: number;
  sharesCount: number;
  bookmarked: boolean;
  user: {
    _id: string;
    name: string;
    username: string;
    photo: string;
  };
  topComment: unknown | null;
}

export interface UserPostsResponse {
  success: boolean;
  message: string;
  data: {
    posts: UserPost[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      numberOfPages: number;
      total: number;
    };
  };
}

export interface UserSuggestion {
  _id: string;
  name: string;
  username: string;
  photo: string;
  followersCount: number;
  mutualFollowersCount: number;
}

export interface FollowSuggestionsResponse {
  success: boolean;
  message: string;
  data: {
    suggestions: UserSuggestion[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      nextPage?: number;
      numberOfPages: number;
      total: number;
    };
  };
}

export interface OtherUserProfileResponse {
  success: boolean;
  message: string;
  data: {
    user: UserProfile;
    isFollowing: boolean;
  };
}

export interface ToggleFollowResponse {
  success: boolean;
  message: string;
  data: {
    following: boolean;
    followersCount: number;
  };
}

export interface BookmarksResponse {
  success: boolean;
  message: string;
  data: {
    bookmarks: UserPost[];
  };
  meta: {
    pagination: {
      currentPage: number;
      limit: number;
      numberOfPages: number;
      total: number;
    };
  };
}

export interface UploadPhotoResponse {
  success: boolean;
  message: string;
  data: {
    photo: string;
    postId: string;
  };
}
