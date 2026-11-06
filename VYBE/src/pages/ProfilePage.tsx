import { useCallback, useEffect, useState } from "react";
import { useAuth } from "../context/useAuth";
import {
  getMyProfile,
  getUserPosts,
  uploadProfilePhoto,
} from "../services/users";
import type { UserProfile, UserPost } from "../types/user";
import ProfileHeader from "../components/profile/ProfileHeader";
import { updatePost, deletePost } from "../services/posts";
import ProfilePostCard from "../components/profile/ProfilePostCard";
import { useNavigate } from "react-router";
import { ArrowLeft } from "lucide-react";
import ProfileSkeleton from "../components/profile/ProfileSkeleton";

export default function ProfilePage() {
  const { user, setUser } = useAuth();

  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [posts, setPosts] = useState<UserPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const fetchProfileData = useCallback(async () => {
    try {
      const profileResponse = await getMyProfile();
      const currentProfile = profileResponse.data.user;

      const userId = currentProfile._id || currentProfile.id;
      const postsResponse = await getUserPosts(userId);

      setProfile(currentProfile);
      setPosts(postsResponse.data.posts);
    } catch (err) {
      console.error("Failed to load profile:", err);
      setError("Failed to load your profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void fetchProfileData();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [fetchProfileData]);

  const handleRetry = () => {
    setLoading(true);
    setError("");
    void fetchProfileData();
  };

  const handleProfilePhotoChange = async (file: File) => {
    const response = await uploadProfilePhoto(file);
    const newPhoto = response.data.photo;

    setProfile((current) =>
      current ? { ...current, photo: newPhoto } : current,
    );

    if (user) {
      setUser({ ...user, photo: newPhoto });
    }
  };

  async function handleUpdatePost(postId: string, body: string) {
    await updatePost(postId, body);

    setPosts((currentPosts) =>
      currentPosts.map((post) =>
        (post._id || post.id) === postId ? { ...post, body } : post,
      ),
    );
  }

  async function handleDeletePost(postId: string) {
    await deletePost(postId);

    setPosts((currentPosts) =>
      currentPosts.filter((post) => (post._id || post.id) !== postId),
    );
  }

  if (loading) {
    return <ProfileSkeleton />;
  }

  if (error || !profile) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#10131D] p-6 text-white">
        <p className="text-red-400">{error || "Profile not found."}</p>

        <button
          type="button"
          onClick={handleRetry}
          className="rounded-lg bg-violet-600 px-5 py-2 hover:bg-violet-700"
        >
          Try again
        </button>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#10131D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <button
        type="button"
        onClick={() => navigate("/home")}
        className="mb-5 flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:border-violet-500/40 hover:bg-violet-500/10 hover:text-white"
      >
        <ArrowLeft size={18} />
        Back to Home
      </button>

      <div className="mx-auto max-w-5xl">
        <ProfileHeader
          profile={profile}
          postsCount={posts.length}
          onProfilePhotoChange={handleProfilePhotoChange}
        />

        <section className="mt-8">
          <h2 className="mb-5 text-xl font-bold">Your Posts</h2>

          {posts.length === 0 ? (
            <div className="rounded-xl border border-white/5 bg-[#1C1F2A] p-8 text-center text-gray-400">
              You haven't published any posts yet.
            </div>
          ) : (
            <div className="space-y-4">
              {posts.map((post) => (
                <ProfilePostCard
                  key={post._id || post.id}
                  post={post}
                  onUpdate={handleUpdatePost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
