import {
  IconCornerUpLeft,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
  IconShare,
} from "@tabler/icons-react";
import { useState } from "react";
import { OwnerMenu } from "../post-details/OwnerMenu";
import { formatCount, formatRelativeTime } from "../../lib/format";
import type { PostComment } from "../../types/post-details";

interface CommentItemProps {
  comment: PostComment;
  postAuthorId: string;
  currentUserId: string;
  nowMs: number;
  nested?: boolean;
  editingId: string | null;
  onToggleLike: (commentId: string) => void;
  onReply: (username: string) => void;
  onSubmitReply: (commentId: string, text: string) => void;
  onShare: (commentId: string) => void;
  onStartEdit: (commentId: string) => void;
  onCancelEdit: () => void;
  onSaveEdit: (commentId: string, text: string) => void;
  onRequestDelete: (commentId: string) => void;
}

const metaButton =
  "inline-flex items-center gap-1 rounded-md text-[11px] font-medium leading-[14px] tracking-[0.22px] text-[#cac4d4] transition-colors hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:text-xs sm:leading-4 sm:tracking-[0.12px]";

export function CommentItem({
  comment,
  postAuthorId,
  currentUserId,
  nowMs,
  nested = false,
  editingId,
  onToggleLike,
  onReply,
  onSubmitReply,
  onShare,
  onStartEdit,
  onCancelEdit,
  onSaveEdit,
  onRequestDelete,
}: CommentItemProps) {
  const [draft, setDraft] = useState(comment.text);
  const [replyDraft, setReplyDraft] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);

  const { author } = comment;
  const isOwn = author.id === currentUserId;
  const isPostAuthor = author.id === postAuthorId;
  const isEditing = editingId === comment.id;

  const shared = {
    postAuthorId,
    currentUserId,
    nowMs,
    editingId,
    onToggleLike,
    onReply,
    onSubmitReply,
    onShare,
    onStartEdit,
    onCancelEdit,
    onSaveEdit,
    onRequestDelete,
  };

  const body = (
    <div className="flex items-start gap-3" id={`comment-${comment.id}`}>
      <img
        className={`shrink-0 rounded-full object-cover ${nested ? "size-8" : "size-9 sm:size-10"}`}
        src={author.avatarUrl}
        alt={`${author.name} profile picture`}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.75 sm:gap-1">
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
            <span className="truncate text-sm font-semibold leading-5 text-[#e0e2f0]">
              {author.name}
            </span>

            {isPostAuthor && (
              <span className="rounded-full bg-[#a78bfa33] px-1.5 py-0.5 text-[11px] font-semibold leading-3.5 tracking-[0.22px] text-[#a78bfa] sm:bg-[#cebdff33] sm:px-2 sm:py-0 sm:font-bold sm:text-[#cebdff]">
                Author
              </span>
            )}

            <span className="truncate text-[13px] leading-4.5 text-[#cac4d4] max-sm:hidden sm:text-[11px] sm:font-medium sm:leading-3.5 sm:tracking-[0.22px]">
              @{author.username}
            </span>

            <span className="size-1 shrink-0 rounded-full bg-[#494552] sm:hidden" />

            <span className="text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4]">
              <span className="hidden sm:inline">· </span>
              {formatRelativeTime(comment.createdAt, nowMs)}
            </span>
          </div>

          {isOwn && !isEditing && (
            <OwnerMenu
              label="Comment actions"
              editLabel="Edit comment"
              deleteLabel="Delete comment"
              onEdit={() => {
                setDraft(comment.text);
                onStartEdit(comment.id);
              }}
              onDelete={() => onRequestDelete(comment.id)}
            />
          )}
        </div>

        {isEditing ? (
          <form
            className="flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              if (draft.trim()) onSaveEdit(comment.id, draft.trim());
            }}
          >
            <textarea
              className="min-h-16 w-full resize-y rounded-xl border border-transparent bg-[#181b26] p-3 text-[15px] leading-5.5 text-[#e0e2f0] outline-none focus:border-[#a78bfa80] focus:shadow-[0_0_0_3px_#a78bfa1c]"
              value={draft}
              maxLength={280}
              aria-label="Edit comment text"
              autoFocus
              onChange={(event) => setDraft(event.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                className="rounded-full bg-[#272a34] px-3 py-1 text-xs font-semibold text-[#e0e2f0] transition-colors hover:bg-[#32343f]"
                type="button"
                onClick={onCancelEdit}
              >
                Cancel
              </button>

              <button
                className="rounded-full bg-[#a78bfa] px-3 py-1 text-xs font-bold text-[#3c1989] transition-colors hover:bg-[#b49cff] disabled:opacity-40"
                type="submit"
                disabled={!draft.trim()}
              >
                Save
              </button>
            </div>
          </form>
        ) : (
          <p
            className={`m-0 whitespace-pre-line tracking-[-0.075px] text-[#e0e2f0] ${nested ? "text-[15px] leading-[22.5px] sm:text-[13px] sm:leading-4.5 sm:tracking-normal" : "text-[15px] leading-[22.5px] sm:leading-5.5"}`}
          >
            {comment.text}
          </p>
        )}

        <div className="flex items-center gap-6 pt-2 sm:gap-4 sm:pt-1">
          <button
            className={`${metaButton} ${comment.likedByMe ? "text-[#cebdff]!" : ""}`}
            type="button"
            aria-pressed={comment.likedByMe}
            aria-label={`${comment.likedByMe ? "Unlike" : "Like"} comment, ${comment.likesCount} likes`}
            onClick={() => onToggleLike(comment.id)}
          >
            {comment.likedByMe ? (
              <IconHeartFilled className="size-3.5" />
            ) : (
              <IconHeart className="size-3.5" />
            )}
            <span>{formatCount(comment.likesCount)}</span>
          </button>

          <button
            className={metaButton}
            type="button"
            aria-label={`Reply to ${author.name}`}
            onClick={() => {
              setShowReplyInput((current) => !current);
              setReplyDraft(`@${author.username} `);
            }}
          >
            <IconMessageCircle className="size-3.5 sm:hidden" />
            <IconCornerUpLeft className="hidden size-3 sm:block" />
            <span className="hidden sm:inline">Reply</span>
            {comment.replies.length > 0 && (
              <span className="sm:hidden">{comment.replies.length}</span>
            )}
          </button>

          <button
            className={metaButton}
            type="button"
            aria-label="Copy comment link"
            onClick={() => onShare(comment.id)}
          >
            <IconShare className="size-3.5" />
          </button>
        </div>

        {showReplyInput && (
          <form
            className="mt-2 flex flex-col gap-2"
            onSubmit={(event) => {
              event.preventDefault();
              const text = replyDraft.trim();
              if (!text) return;

              onSubmitReply(comment.id, text);
              setReplyDraft("");
              setShowReplyInput(false);
            }}
          >
            <textarea
              className="min-h-16 w-full resize-y rounded-xl border border-transparent bg-[#181b26] p-3 text-sm text-[#e0e2f0] outline-none focus:border-[#a78bfa80]"
              placeholder={`Reply to ${author.name}...`}
              value={replyDraft}
              maxLength={280}
              onChange={(event) => setReplyDraft(event.target.value)}
            />

            <div className="flex justify-end gap-2">
              <button
                className="rounded-full bg-[#272a34] px-3 py-1.5 text-xs font-semibold text-[#e0e2f0] hover:bg-[#32343f]"
                type="button"
                onClick={() => {
                  setShowReplyInput(false);
                  setReplyDraft("");
                }}
              >
                Cancel
              </button>

              <button
                className="rounded-full bg-[#a78bfa] px-4 py-1.5 text-xs font-bold text-[#3c1989] hover:bg-[#b49cff] disabled:opacity-40"
                type="submit"
                disabled={!replyDraft.trim()}
              >
                Reply
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );

  if (nested) {
    return (
      <div className="rounded-xl bg-[#181b26] py-2 pl-4 sm:bg-[#181b2699] sm:p-3">
        {body}
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-4 rounded-xl bg-[#1c1f2a] p-4 shadow-[0_1px_2px_0_#0000000d] sm:rounded-2xl sm:shadow-[0_4px_6px_-1px_#0000001a]">
      {body}

      {comment.replies.length > 0 && (
        <div className="flex flex-col gap-3 pl-4 sm:pl-10">
          {comment.replies.map((reply) => (
            <CommentItem key={reply.id} comment={reply} nested {...shared} />
          ))}
        </div>
      )}
    </article>
  );
}
