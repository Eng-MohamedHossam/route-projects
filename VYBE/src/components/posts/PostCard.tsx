import {
  IconBookmark,
  IconBookmarkFilled,
  IconDots,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconRepeat,
  IconRosetteDiscountCheckFilled,
  IconShare,
} from "@tabler/icons-react";
import { useNavigate } from "react-router";

export interface Post {
  id: string;
  author: {
    name: string;
    username: string;
    photo: string;
    initials: string;
    avatarColor: string;
    verified?: boolean;
    badge?: string;
    role?: string;
  };
  bookmarked: boolean;
  createdAt: string;
  text: string;
  imageUrl?: string;
  imageAlt?: string;
  imageTitle?: string;
  imageTag?: string;
  likes: number;
  comments: number;
  reposts: number;
  saves: number;
  liked: boolean;
  followed: boolean;
}

interface PostCardProps {
  post: Post;
  dataNodeId?: string | undefined;
  onLike: (postId: string) => void;
  onBookmark: (postId: string) => void;
}

function formatCount(count: number) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();
}

export function PostCard({
  post,
  dataNodeId,
  onLike,
  onBookmark,
}: PostCardProps) {
  const navigate = useNavigate();

  function openPost() {
    navigate(`/posts/${post.id}`);
  }

  function handlePostKeyDown(event: React.KeyboardEvent<HTMLElement>) {
    if (event.target !== event.currentTarget) return;

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openPost();
    }
  }

  return (
    <article
      className="overflow-hidden rounded-2xl border border-white/4 bg-[#1c1f2a] shadow-[0_12px_32px_#05071116] transition-[border-color,transform] duration-200 hover:-translate-y-0.5 hover:border-[#a78bfa24] max-[600px]:rounded-xl"
      data-node-id={dataNodeId}
      role="link"
      tabIndex={0}
      onClick={openPost}
      onKeyDown={handlePostKeyDown}
    >
      <div className="flex items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div className="flex min-w-0 items-center gap-3">
          <div
            className={`grid size-10 shrink-0 place-items-center overflow-hidden rounded-full bg-linear-to-br ${post.author.avatarColor} text-xs font-semibold text-white ring-1 ring-white/10`}
            aria-label={`${post.author.name} avatar`}
          >
            {post.author.photo ? (
              <img
                src={post.author.photo}
                alt={`${post.author.name} avatar`}
                className="size-full object-cover"
              />
            ) : (
              post.author.initials
            )}
          </div>

          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5">
              <span className="truncate text-sm font-semibold tracking-[-0.15px] text-[#e0e2f0]">
                {post.author.name}
              </span>

              {post.author.verified && (
                <IconRosetteDiscountCheckFilled
                  className="size-4 shrink-0 text-[#a78bfa]"
                  aria-label="Verified account"
                />
              )}

              {post.author.badge && (
                <span className="rounded-full bg-[#a78bfa1f] px-1.5 py-0.5 text-[9px] font-bold tracking-[0.06em] text-[#bea8ff]">
                  {post.author.badge}
                </span>
              )}

              <span className="truncate text-xs text-[#948e9d]">
                @{post.author.username}
              </span>

              <span className="text-xs text-[#6f697a]" aria-hidden="true">
                ·
              </span>

              <time className="shrink-0 text-xs text-[#948e9d]">
                {post.createdAt}
              </time>
            </div>

            {post.author.role && (
              <p className="mt-0.5 truncate text-[11px] leading-4 text-[#a78bfa]">
                {post.author.role}
              </p>
            )}
          </div>
        </div>

        <button
          className="grid size-8 shrink-0 place-items-center rounded-full text-[#948e9d] transition-colors hover:bg-white/6 hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
          type="button"
          aria-label={`More options for ${post.author.name}'s post`}
          onClick={(event) => event.stopPropagation()}
        >
          <IconDots className="size-5" />
        </button>
      </div>

      <div className="px-4 pb-4 pt-3 sm:px-5">
        <p className="whitespace-pre-line text-[14px] leading-[1.65] tracking-[-0.06px] text-[#e0e2f0]">
          {post.text || ""}
        </p>
      </div>

      {post.imageUrl && (
        <figure className="relative mx-4 mb-3 aspect-16/8.5 overflow-hidden rounded-xl bg-[#10131d] sm:mx-5 sm:mb-4">
          <img
            className="size-full object-cover transition-transform duration-500 hover:scale-[1.02]"
            src={post.imageUrl}
            alt={post.imageAlt ?? ""}
            loading="lazy"
          />

          {(post.imageTitle || post.imageTag) && (
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-linear-to-t from-[#080a10e8] via-[#080a1080] to-transparent px-4 pb-3 pt-10 sm:px-5 sm:pb-4">
              {post.imageTitle && (
                <span className="min-w-0 text-sm font-semibold leading-5 text-white drop-shadow-sm">
                  {post.imageTitle}
                </span>
              )}

              {post.imageTag && (
                <span className="shrink-0 rounded-full bg-[#a78bfa] px-2.5 py-1 text-[10px] font-semibold text-[#321174] shadow-lg">
                  {post.imageTag}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}

      <div className="mx-4 flex items-center justify-between gap-1 border-t border-white/6 py-2 sm:mx-5 sm:py-2.5">
        <div className="flex min-w-0 items-center gap-0.5 sm:gap-2">
          {/* Like */}
          <button
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-medium transition-colors hover:bg-[#a78bfa12] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff] sm:px-2.5 ${
              post.liked
                ? "text-[#a78bfa]"
                : "text-[#cac4d4] hover:text-[#cebdff]"
            }`}
            type="button"
            aria-label={`${post.liked ? "Unlike" : "Like"} post, ${formatCount(post.likes)} likes`}
            aria-pressed={post.liked}
            onClick={(event) => {
              event.stopPropagation();
              onLike(post.id);
            }}
          >
            {post.liked ? (
              <IconHeartFilled className="size-4.5" />
            ) : (
              <IconHeart className="size-4.5" />
            )}
            <span>{formatCount(post.likes)}</span>
          </button>

          {/* Comments */}
          <button
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-[#cac4d4] transition-colors hover:bg-white/5 hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff] sm:px-2.5"
            type="button"
            aria-label={`${formatCount(post.comments)} comments`}
            onClick={(event) => event.stopPropagation()}
          >
            <IconMessageCircle className="size-4.5" />
            <span>{formatCount(post.comments)}</span>
          </button>

          {/* Repost */}
          <button
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs font-medium text-[#cac4d4] transition-colors hover:bg-white/5 hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff] sm:px-2.5"
            type="button"
            aria-label={`${formatCount(post.reposts)} reposts`}
            onClick={(event) => event.stopPropagation()}
          >
            <IconRepeat className="size-4.5" />
            <span>{formatCount(post.reposts)}</span>
          </button>
        </div>

        <div className="flex shrink-0 items-center gap-0.5">
          {/* Bookmark */}
          <button
            className={`inline-flex min-h-9 items-center gap-1.5 rounded-full px-2 text-xs transition-colors hover:bg-[#a78bfa12] ${
              post.bookmarked ? "text-[#a78bfa]" : "text-[#cac4d4]"
            }`}
            type="button"
            aria-label={post.bookmarked ? "Remove bookmark" : "Bookmark post"}
            aria-pressed={post.bookmarked}
            onClick={(event) => {
              event.stopPropagation();
              onBookmark(post.id);
            }}
          >
            {post.bookmarked ? (
              <IconBookmarkFilled className="size-4.5" />
            ) : (
              <IconBookmark className="size-4.5" />
            )}
          </button>

          {/* Share */}
          <button
            className="grid size-9 place-items-center rounded-full text-[#cac4d4] transition-colors hover:bg-white/5 hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[#cebdff]"
            type="button"
            aria-label="Share post"
            onClick={(event) => event.stopPropagation()}
          >
            <IconShare className="size-4.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
