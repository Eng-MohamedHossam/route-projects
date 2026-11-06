import {
  IconBookmark,
  IconBookmarkFilled,
  IconChartBar,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconRepeat,
  IconRosetteDiscountCheckFilled,
  IconShare,
  IconPhoto,
} from "@tabler/icons-react";
import { useState } from "react";
import { OwnerMenu } from "../post-details/OwnerMenu";
import {
  formatCompactCount,
  formatCount,
  formatDate,
  formatTime,
} from "../../lib/format";
import type { PostDetail } from "../../types/post-details";

interface PostDetailCardProps {
  post: PostDetail;
  isOwner: boolean;
  isEditing: boolean;
  onToggleLike: () => void;
  onToggleBookmark: () => void;
  onShare: () => void;
  onFocusReply: () => void;
  onStartEdit: () => void;
  onCancelEdit: () => void;
  onSaveEdit: (text: string) => void;
  onRequestDelete: () => void;
}
const actionButton =
  "inline-flex items-center gap-2 rounded-full bg-[#181b26] px-3 py-1.5 text-xs font-medium text-[#cac4d4] transition-colors hover:bg-[#272a34] hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:bg-transparent sm:py-2 sm:hover:bg-white/[0.05]";

export function PostDetailCard({
  post,
  isOwner,
  isEditing,
  onToggleLike,
  onToggleBookmark,
  onShare,
  onFocusReply,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRequestDelete,
}: PostDetailCardProps) {
  const [draft, setDraft] = useState(post.text);
  const [showLikers, setShowLikers] = useState(false);
  const { author } = post;
  return (
    <article className="relative flex flex-col gap-2 overflow-hidden rounded-xl bg-[#1c1f2a] p-4 shadow-[0_4px_6px_-1px_#0000001a] sm:gap-4 sm:rounded-2xl sm:p-6 sm:shadow-[0_20px_25px_-5px_#0000001a]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-24 -top-24 hidden size-64 rounded-full bg-[#cebdff1a] blur-3xl sm:block"
      />
      <header className="relative flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="relative shrink-0">
            <img
              className="size-11 rounded-full object-cover sm:size-12"
              src={author.avatarUrl}
              alt={`${author.name} profile picture`}
            />
            {author.online && (
              <span className="absolute bottom-0 right-0 size-3 rounded-full bg-[#10b981] ring-2 ring-[#1c1f2a]" />
            )}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1 sm:gap-1.5">
              <h1 className="truncate text-lg font-semibold leading-6 tracking-[-0.18px] text-[#e0e2f0]">
                {author.name}
              </h1>
              {author.verified && (
                <IconRosetteDiscountCheckFilled
                  className="size-4 shrink-0 text-[#cebdff]"
                  aria-label="Verified account"
                />
              )}
              <span className="hidden truncate text-[13px] leading-4.5 text-[#cac4d4] sm:inline">
                @{author.username}
              </span>
            </div>
            <div className="flex items-center gap-1.5 sm:block">
              <span className="truncate text-[13px] leading-4.5 text-[#cac4d4] sm:hidden">
                @{author.username}
              </span>
              {author.title && (
                <>
                  <span className="size-1 shrink-0 rounded-full bg-[#494552] sm:hidden" />
                  <span className="shrink-0 rounded-full bg-[#32343f] px-1.5 py-0.5 text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#a78bfa] sm:block sm:rounded-none sm:bg-transparent sm:p-0 sm:text-[#cac4d4]">
                    {author.title}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
        {isOwner && (
          <OwnerMenu
            variant="post"
            label="Post actions"
            editLabel="Edit post"
            deleteLabel="Delete post"
            onEdit={() => {
              setDraft(post.text);
              onStartEdit();
            }}
            onDelete={onRequestDelete}
          />
        )}
      </header>
      <div className="relative pt-1 sm:pt-0">
        {isEditing ? (
          <form
            className="flex flex-col gap-3"
            onSubmit={(event) => {
              event.preventDefault();
              if (draft.trim()) onSaveEdit(draft.trim());
            }}
          >
            <textarea
              className="min-h-28 w-full resize-y rounded-xl border border-transparent bg-[#181b26] p-3 text-base leading-6.5 text-[#e0e2f0] outline-none focus:border-[#a78bfa80] focus:shadow-[0_0_0_3px_#a78bfa1c]"
              value={draft}
              maxLength={280}
              aria-label="Edit post text"
              autoFocus
              onChange={(event) => setDraft(event.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="rounded-full bg-[#272a34] px-4 py-1.5 text-sm font-semibold text-[#e0e2f0] transition-colors hover:bg-[#32343f]"
                type="button"
                onClick={onCancelEdit}
              >
                Cancel
              </button>
              <button
                className="rounded-full bg-[#a78bfa] px-4 py-1.5 text-sm font-bold text-[#3c1989] shadow-[0_0_16px_#a78bfa59] transition-colors hover:bg-[#b49cff] disabled:opacity-40"
                type="submit"
                disabled={!draft.trim()}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p className="whitespace-pre-line text-base leading-6.5 tracking-[-0.16px] text-[#e0e2f0]">
            {post.text}
          </p>
        )}
      </div>
      {post.imageUrl && (
        <figure className="relative m-0 mt-2 overflow-hidden rounded-xl bg-[#0b0e18] shadow-[0_10px_15px_-3px_#0000001a] sm:mt-0 sm:rounded-2xl">
          <img
            className="h-56 w-full object-cover sm:h-64"
            src={post.imageUrl}
            alt={post.imageAlt ?? ""}
          />
          {(post.imageTitle || post.imageTag) && (
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-linear-to-t from-[#0b0e18] via-[#0b0e1899] to-transparent p-3">
              <span className="flex min-w-0 items-center gap-2 text-xs font-medium tracking-[0.12px] text-[#e0e2f0]">
                <IconPhoto className="size-4 shrink-0 text-[#cebdff]" />
                <span className="truncate">{post.imageTitle}</span>
              </span>
              {post.imageTag && (
                <span className="shrink-0 rounded-full bg-[#a78bfa] px-2 py-0.5 text-[11px] font-semibold tracking-[0.22px] text-[#3c1989]">
                  {post.imageTag}
                </span>
              )}
            </figcaption>
          )}
        </figure>
      )}
      <div className="relative flex flex-wrap items-center justify-between gap-x-2 gap-y-1 py-2 text-[#cac4d4]">
        <div className="flex flex-wrap items-center gap-x-1.5 text-[13px] leading-4.5 sm:text-xs sm:font-medium sm:leading-4 sm:tracking-[0.12px]">
          <time dateTime={post.createdAt}>{formatTime(post.createdAt)}</time>
          <span aria-hidden="true">·</span>
          <time dateTime={post.createdAt}>{formatDate(post.createdAt)}</time>
          {post.client && (
            <>
              <span aria-hidden="true">·</span>
              <span className="sm:text-[#e0e2f0]">{post.client}</span>
            </>
          )}
        </div>
        {post.views !== undefined && (
          <div className="flex w-full items-center gap-1 text-xs font-medium tracking-[0.12px] sm:w-auto">
            <IconChartBar
              className="hidden size-3 text-[#cebdff] sm:block"
              aria-hidden="true"
            />
            <span className="text-[#e0e2f0] sm:font-semibold">
              {formatCompactCount(post.views)}
            </span>
            <span className="text-[#e0e2f0] sm:text-[#cebdff]">Views</span>
          </div>
        )}
      </div>
      <dl className="relative m-0 grid grid-cols-3 gap-2 rounded-xl bg-[#181b26] px-2 py-3 text-center sm:px-4">
        {[
          { label: "Likes", value: post.likesCount, accent: true },
          { label: "Reposts", value: post.repostsCount },
          { label: "Comments", value: post.commentsCount },
        ].map(({ label, value, accent }) => (
          <div key={label} className="min-w-0">
            <dd
              className={`m-0 text-base font-bold leading-6 tracking-[-0.18px] sm:text-lg ${accent ? "text-[#cebdff]" : "text-[#e0e2f0]"}`}
            >
              {formatCount(value)}
            </dd>
            <dt className="truncate text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4]">
              {label}
            </dt>
          </div>
        ))}
      </dl>
      <div className="relative flex items-center justify-between gap-1 pt-1">
        <button
          className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-bold tracking-[0.12px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:py-2 ${post.likedByMe ? "bg-[#a78bfa33] text-[#cebdff] hover:bg-[#a78bfa40]" : "bg-[#181b26] text-[#cac4d4] hover:bg-[#272a34] sm:bg-transparent"}`}
          type="button"
          aria-pressed={post.likedByMe}
          aria-label={post.likedByMe ? "Unlike post" : "Like post"}
          onClick={onToggleLike}
        >
          {post.likedByMe ? (
            <IconHeartFilled className="size-4" />
          ) : (
            <IconHeart className="size-4" />
          )}
          <span className="sm:hidden">{post.likedByMe ? "Liked" : "Like"}</span>
          <span className="hidden sm:inline">
            {formatCount(post.likesCount)}
          </span>
        </button>
        <button
          className={actionButton}
          type="button"
          aria-label={`Reply, ${formatCount(post.commentsCount)} comments`}
          onClick={onFocusReply}
        >
          <IconMessageCircle className="size-4" />
          <span className="hidden sm:inline">
            {formatCount(post.commentsCount)}
          </span>
        </button>
        <button
          className={actionButton}
          type="button"
          aria-label={`Repost, ${formatCount(post.repostsCount)} reposts`}
        >
          <IconRepeat className="size-4" />
          <span className="hidden sm:inline">
            {formatCount(post.repostsCount)}
          </span>
        </button>
        <button
          className={`${actionButton} ${post.bookmarkedByMe ? "text-[#cebdff]!" : ""}`}
          type="button"
          aria-pressed={post.bookmarkedByMe}
          aria-label={post.bookmarkedByMe ? "Remove bookmark" : "Bookmark post"}
          onClick={onToggleBookmark}
        >
          {post.bookmarkedByMe ? (
            <IconBookmarkFilled className="size-4" />
          ) : (
            <IconBookmark className="size-4" />
          )}
        </button>
        <button
          className={actionButton}
          type="button"
          aria-label="Share post"
          onClick={onShare}
        >
          <IconShare className="size-4" />
        </button>
      </div>
      {post.likedBy.length > 0 && (
        <div className="relative border-t border-[#32343f] pt-3">
          <button
            className="flex items-center gap-2 text-xs font-medium text-[#cac4d4] transition-colors hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
            type="button"
            aria-expanded={showLikers}
            onClick={() => setShowLikers((current) => !current)}
          >
            <span className="flex -space-x-2" aria-hidden="true">
              {post.likedBy.slice(0, 3).map((user) => (
                <img
                  key={user.id}
                  className="size-6 rounded-full object-cover ring-2 ring-[#1c1f2a]"
                  src={user.avatarUrl}
                  alt=""
                />
              ))}
            </span>
            Liked by {post.likedBy[0]?.name}
            {post.likesCount > 1 &&
              ` and ${formatCount(post.likesCount - 1)} others`}
          </button>
          {showLikers && (
            <ul className="m-0 mt-3 flex list-none flex-col gap-2 p-0">
              {post.likedBy.map((user) => (
                <li key={user.id} className="flex items-center gap-3">
                  <img
                    className="size-8 rounded-full object-cover"
                    src={user.avatarUrl}
                    alt=""
                  />
                  <span className="text-sm font-semibold text-[#e0e2f0]">
                    {user.name}
                  </span>
                  <span className="text-xs text-[#cac4d4]">
                    @{user.username}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </article>
  );
}
