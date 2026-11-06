import api from "./api";
import type {
  MyProfileResponse,
  UserPostsResponse,
  FollowSuggestionsResponse,
  ToggleFollowResponse,
  OtherUserProfileResponse,
  BookmarksResponse,
  UploadPhotoResponse,
} from "../types/user";

// Get the currently logged-in user's profile
export async function getMyProfile(): Promise<MyProfileResponse> {
  const response = await api.get<MyProfileResponse>("/users/profile-data");
  return response.data;
}

// Get another user's profile
export async function getUserProfile(userId: string) {
  const response = await api.get<OtherUserProfileResponse>(
    `/users/${userId}/profile`,
  );

  return response.data;
}

// Get posts created by a user
export async function getUserPosts(userId: string) {
  const response = await api.get<UserPostsResponse>(`/users/${userId}/posts`);
  return response.data;
}

// Follow or unfollow a user
export async function toggleFollow(userId: string) {
  const response = await api.put<ToggleFollowResponse>(
    `/users/${userId}/follow`,
  );

  return response.data;
}

// Get saved posts
export async function getBookmarks() {
  const response = await api.get<BookmarksResponse>("/users/bookmarks");
  return response.data;
}

// Get suggested users
export async function getFollowSuggestions(limit = 10) {
  const response = await api.get<FollowSuggestionsResponse>(
    "/users/suggestions",
    { params: { limit } },
  );

  return response.data;
}

// Upload profile photo
export async function uploadProfilePhoto(photo: File) {
  const formData = new FormData();
  formData.append("photo", photo);

  const response = await api.put<UploadPhotoResponse>(
    "/users/upload-photo",
    formData,
  );

  return response.data;
}

// Change password
export async function changePassword(password: string, newPassword: string) {
  const response = await api.patch("/users/change-password", {
    password,
    newPassword,
  });

  return response.data;
}
