import { useRef, useState } from "react";
import {
  Camera,
  CalendarDays,
  Users,
  FileText,
  Share2,
  Pencil,
  Mail,
  LogOut,
} from "lucide-react";
import type { UserProfile } from "../../types/user";
import { useAuth } from "../../context/useAuth";

interface ProfileHeaderProps {
  profile: UserProfile;
  postsCount: number;
  onProfilePhotoChange: (file: File) => Promise<void>;
  onEditProfile?: () => void;
}

export default function ProfileHeader({
  profile,
  postsCount,
  onProfilePhotoChange,
  onEditProfile,
}: ProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const { logout } = useAuth();

  async function handlePhotoChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setUploadError("Please select a valid image.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5 MB.");
      return;
    }

    setUploadError("");
    setUploading(true);

    try {
      await onProfilePhotoChange(file);
    } catch {
      setUploadError("Failed to upload profile photo.");
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  }

  async function handleShare() {
    const profileUrl = `${window.location.origin}/profile`;

    try {
      await navigator.clipboard.writeText(profileUrl);
      alert("Profile link copied!");
    } catch {
      setUploadError("Could not copy profile link.");
    }
  }

  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Unknown";

  return (
    <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#1C1F2A]">
      {/* Cover */}
      <div className="relative h-44 bg-linear-to-r from-violet-950 via-[#56318c] to-[#171b32] sm:h-56">
        {profile.cover && (
          <img
            src={profile.cover}
            alt="Profile cover"
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Profile information */}
      <div className="relative px-5 pb-6 sm:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="-mt-16 flex items-end gap-4">
            <div className="relative h-28 w-28 shrink-0 rounded-full border-4 border-[#1C1F2A] bg-[#292f42] sm:h-32 sm:w-32">
              <img
                src={profile.photo || "/default-avatar.png"}
                alt={profile.name}
                className="h-full w-full rounded-full object-cover"
              />

              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={uploading}
                title="Change profile photo"
                className="absolute bottom-1 right-1 rounded-full border-2 border-[#1C1F2A] bg-violet-600 p-2 text-white transition hover:bg-violet-700 disabled:opacity-50"
              >
                <Camera size={16} />
              </button>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </div>

            <div className="mb-1 min-w-0">
              <h1 className="truncate text-xl font-bold text-white sm:text-2xl">
                {profile.name}
              </h1>
              <p className="truncate text-sm text-gray-400">
                @{profile.username}
              </p>
            </div>
          </div>

          <div className="flex gap-2 sm:mb-2">
            <button
              type="button"
              onClick={onEditProfile}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/5 sm:flex-none"
            >
              <Pencil size={16} />
              Edit Profile
            </button>

            <button
              type="button"
              onClick={logout}
              title="Log out"
              className="flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-300 transition hover:bg-red-500/10 hover:text-red-400"
            >
              <LogOut size={16} />
              Logout
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="flex items-center justify-center gap-2 rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-700"
            >
              <Share2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </div>

        {uploading && (
          <p className="mt-3 text-sm text-violet-400">
            Uploading profile photo...
          </p>
        )}

        {uploadError && (
          <p className="mt-3 text-sm text-red-400">{uploadError}</p>
        )}

        <div className="mt-5 flex flex-wrap gap-x-5 gap-y-3 text-sm text-gray-400">
          <span className="flex items-center gap-2">
            <Mail size={16} />
            {profile.email}
          </span>

          <span className="flex items-center gap-2">
            <CalendarDays size={16} />
            Joined {joinedDate}
          </span>
        </div>

        {/* Statistics */}
        <div className="mt-6 flex flex-wrap gap-6 border-t border-white/10 pt-5">
          <div className="flex items-center gap-2">
            <FileText size={18} className="text-violet-400" />
            <span className="font-semibold text-white">{postsCount}</span>
            <span className="text-sm text-gray-400">Posts</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-violet-400" />
            <span className="font-semibold text-white">
              {profile.followersCount}
            </span>
            <span className="text-sm text-gray-400">Followers</span>
          </div>

          <div className="flex items-center gap-2">
            <Users size={18} className="text-violet-400" />
            <span className="font-semibold text-white">
              {profile.followingCount}
            </span>
            <span className="text-sm text-gray-400">Following</span>
          </div>
        </div>
      </div>
    </section>
  );
}
