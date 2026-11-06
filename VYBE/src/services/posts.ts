import api from "./api";
import type { PostsResponse } from "../types/post";
import type { Post } from "../components/posts/PostCard";
import type { ApiPost } from "../types/post";
import type {
  SinglePostResponse,
  CommentsResponse,
  RepliesResponse,
} from "../types/post-details";

export async function getAllPosts() {
  const response = await api.get<PostsResponse>("/posts");
  return response.data;
}

export async function createPost(body: string, image?: File) {
  const formData = new FormData();

  formData.append("body", body);

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post("/posts", formData);

  return response.data;
}

// sends a request to toggle the like status

export async function toggleLike(postId: string) {
  const response = await api.put(`/posts/${postId}/like`);
  return response.data;
}

// sends a request to toggle Bookmark

export async function toggleBookmark(postId: string) {
  const response = await api.put(`/posts/${postId}/bookmark`);
  return response.data;
}

// Get a single post
export async function getSinglePost(postId: string) {
  const response = await api.get<SinglePostResponse>(`/posts/${postId}`);
  return response.data;
}

// Get post comments
export async function getPostComments(postId: string, page = 1) {
  const response = await api.get<CommentsResponse>(
    `/posts/${postId}/comments?page=${page}&limit=10`,
  );
  return response.data;
}

// Get replies for a comment
export async function getCommentReplies(
  postId: string,
  commentId: string,
  page = 1,
) {
  const response = await api.get<RepliesResponse>(
    `/posts/${postId}/comments/${commentId}/replies?page=${page}&limit=10`,
  );
  return response.data;
}

// Update a post
export async function updatePost(postId: string, body: string) {
  const response = await api.put(`/posts/${postId}`, { body });
  return response.data;
}

// Delete a post
export async function deletePost(postId: string) {
  const response = await api.delete(`/posts/${postId}`);
  return response.data;
}

// Share a post
export async function sharePost(postId: string) {
  const response = await api.post(`/posts/${postId}/share`);
  return response.data;
}

// Get users who liked a post
export async function getPostLikes(postId: string, page = 1) {
  const response = await api.get(
    `/posts/${postId}/likes?page=${page}&limit=20`,
  );
  return response.data;
}

// Create a comment on a post
export async function createComment(
  postId: string,
  content: string,
  image?: File,
) {
  const formData = new FormData();

  formData.append("content", content);

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post(`/posts/${postId}/comments`, formData);

  return response.data;
}

// Update an existing comment
export async function updateComment(
  postId: string,
  commentId: string,
  content: string,
) {
  const response = await api.put(`/posts/${postId}/comments/${commentId}`, {
    content,
  });

  return response.data;
}

// Delete an existing comment
export async function deleteComment(postId: string, commentId: string) {
  const response = await api.delete(`/posts/${postId}/comments/${commentId}`);

  return response.data;
}

// Create a reply to a comment
export async function createReply(
  postId: string,
  commentId: string,
  content: string,
  image?: File,
) {
  const formData = new FormData();

  formData.append("content", content);

  if (image) {
    formData.append("image", image);
  }

  const response = await api.post(
    `/posts/${postId}/comments/${commentId}/replies`,
    formData,
  );

  return response.data;
}

export function mapApiPost(post: ApiPost, currentUserId: string): Post {
  const authorName = post.user?.name ?? "Unknown User";

  const initials = authorName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return {
    id: post.id,
    author: {
      name: authorName,
      username: post.user?.username ?? "unknown",
      photo: post.user?.photo ?? "",
      initials,
      avatarColor: "from-violet-500 to-indigo-500",
    },
    createdAt: new Date(post.createdAt).toLocaleDateString(),
    text: post.body ?? "",
    imageUrl: post.image,
    imageAlt: `Post image by ${post.user.name}`,
    likes: post.likesCount,
    comments: post.commentsCount,
    reposts: post.sharesCount,
    saves: post.bookmarksCount ?? (post.bookmarked ? 1 : 0),
    bookmarked: post.bookmarked,
    liked: post.likes.includes(currentUserId),
    followed: false,
  };
}
