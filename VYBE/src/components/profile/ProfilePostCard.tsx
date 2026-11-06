import { useState } from "react";
import { useNavigate } from "react-router";
import { Pencil, Trash2, X, Check, MessageCircle, Heart } from "lucide-react";
import type { UserPost } from "../../types/user";

interface ProfilePostCardProps {
  post: UserPost;
  onUpdate: (postId: string, body: string) => Promise<void>;
  onDelete: (postId: string) => Promise<void>;
}

export default function ProfilePostCard({
  post,
  onUpdate,
  onDelete,
}: ProfilePostCardProps) {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);
  const [draft, setDraft] = useState(post.body);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  const postId = post._id || post.id;

  async function handleSave() {
    if (!draft.trim()) {
      setError("Post cannot be empty.");
      return;
    }

    try {
      setSaving(true);
      setError("");
      await onUpdate(postId, draft.trim());
      setIsEditing(false);
    } catch {
      setError("Failed to update post. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this post?",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");
      await onDelete(postId);
    } catch {
      setError("Failed to delete post. Please try again.");
      setDeleting(false);
    }
  }

  return (
    <article
      onClick={() => {
        if (!isEditing) navigate(`/posts/${postId}`);
      }}
      className="cursor-pointer rounded-xl border border-white/5 bg-[#1C1F2A] p-5 transition hover:border-violet-500/30"
    >
      <div className="mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-400">
          {new Date(post.createdAt).toLocaleDateString()}
        </span>

        {!isEditing ? (
          <div className="flex gap-2">
            <button
              type="button"
              title="Edit post"
              onClick={(event) => {
                event.stopPropagation();
                setDraft(post.body);
                setIsEditing(true);
                setError("");
              }}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-violet-500/10 hover:text-violet-400"
            >
              <Pencil size={17} />
            </button>

            <button
              type="button"
              title="Delete post"
              disabled={deleting}
              onClick={(event) => {
                event.stopPropagation();
                void handleDelete();
              }}
              className="rounded-lg p-2 text-gray-400 transition hover:bg-red-500/10 hover:text-red-400 disabled:opacity-50"
            >
              <Trash2 size={17} />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              type="button"
              title="Save changes"
              disabled={saving}
              onClick={(event) => {
                event.stopPropagation();
                void handleSave();
              }}
              className="rounded-lg p-2 text-green-400 hover:bg-green-500/10 disabled:opacity-50"
            >
              <Check size={18} />
            </button>

            <button
              type="button"
              title="Cancel editing"
              onClick={(event) => {
                event.stopPropagation();
                setDraft(post.body);
                setIsEditing(false);
                setError("");
              }}
              className="rounded-lg p-2 text-gray-400 hover:bg-white/5"
            >
              <X size={18} />
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <textarea
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onClick={(event) => event.stopPropagation()}
          rows={4}
          className="w-full resize-y rounded-lg border border-white/10 bg-[#10131D] p-3 text-white outline-none focus:border-violet-500"
        />
      ) : (
        <p className="whitespace-pre-wrap text-gray-200">{post.body}</p>
      )}

      {post.image && (
        <img
          src={post.image}
          alt="Post"
          className="mt-4 max-h-112.5 w-full rounded-lg object-cover"
        />
      )}

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}

      <div className="mt-4 flex gap-5 border-t border-white/5 pt-4 text-sm text-gray-400">
        <span className="flex items-center gap-2">
          <Heart size={16} />
          {post.likesCount} Likes
        </span>

        <span className="flex items-center gap-2">
          <MessageCircle size={16} />
          {post.commentsCount} Comments
        </span>
      </div>

      {!isEditing && (
        <p className="mt-3 text-xs text-violet-400">
          Click to view post details
        </p>
      )}
    </article>
  );
}
