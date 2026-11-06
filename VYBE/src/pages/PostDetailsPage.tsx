import {
  IconAlertTriangle,
  IconArrowLeft,
  IconChevronDown,
  IconMessageOff,
} from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router";
import {
  toggleBookmark as toggleBookmarkApi,
  toggleLike as toggleLikeApi,
  createComment,
  createReply,
  updateComment,
  deleteComment,
  updatePost,
  deletePost,
} from "../services/posts";
import { CommentItem } from "../components/post-details/CommentItem";
import { ConfirmDialog } from "../components/post-details/ConfirmDialog";
import { PostDetailCard } from "../components/post-details/PostDetailCard";
import { ReplyComposer } from "../components/post-details/ReplyComposer";
import { PostSkeleton } from "../components/posts/PostSkeleton";
import type {
  PostComment,
  PostDetail,
  PostDetailsData,
  PostDetailsStatus,
  PostDetailsUser,
} from "../types/post-details";

interface PostDetailsProps {
  currentUser: PostDetailsUser | null;
  status: PostDetailsStatus;
  data: PostDetailsData | null;
  nowMs: number;
  errorMessage?: string;
  onRetry?: () => void;
}

type SortMode = "relevant" | "newest";
type DeleteTarget = { type: "post" } | { type: "comment"; id: string };

function countComments(comments: PostComment[]): number {
  return comments.reduce(
    (total, comment) => total + 1 + countComments(comment.replies),
    0,
  );
}

function mapComments(
  comments: PostComment[],
  commentId: string,
  update: (comment: PostComment) => PostComment,
): PostComment[] {
  return comments.map((comment) =>
    comment.id === commentId
      ? update(comment)
      : {
          ...comment,
          replies: mapComments(comment.replies, commentId, update),
        },
  );
}

function removeComment(
  comments: PostComment[],
  commentId: string,
): PostComment[] {
  return comments
    .filter((comment) => comment.id !== commentId)
    .map((comment) => ({
      ...comment,
      replies: removeComment(comment.replies, commentId),
    }));
}

function PostDetailsSkeleton() {
  return (
    <div
      className="flex flex-col gap-4"
      aria-busy="true"
      aria-label="Loading post"
    >
      <div className="h-105 rounded-2xl bg-[#1c1f2a]">
        <PostSkeleton />
      </div>
      <div className="h-36 rounded-2xl bg-[#1c1f2a]">
        <PostSkeleton />
      </div>
      <div className="h-28 rounded-2xl bg-[#1c1f2a]">
        <PostSkeleton />
      </div>
    </div>
  );
}

function StateMessage({
  icon,
  title,
  description,
  action,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div
      className="flex flex-col items-center gap-3 rounded-2xl bg-[#1c1f2a] px-6 py-12 text-center"
      role="status"
    >
      <span className="grid size-12 place-items-center rounded-full bg-[#272a34] text-[#cebdff]">
        {icon}
      </span>
      <h2 className="m-0 text-lg font-semibold tracking-[-0.18px] text-[#e0e2f0]">
        {title}
      </h2>
      <p className="m-0 max-w-xs text-sm leading-5 text-[#cac4d4]">
        {description}
      </p>
      {action}
    </div>
  );
}

function PostDetailsView({
  status,
  data,
  currentUser,
  nowMs,
  errorMessage,
  onRetry,
}: PostDetailsProps) {
  const navigate = useNavigate();

  const [post, setPost] = useState<PostDetail | null>(() => data?.post ?? null);
  const [comments, setComments] = useState<PostComment[]>(
    () => data?.comments ?? [],
  );

  const [isEditingPost, setIsEditingPost] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<DeleteTarget | null>(null);
  const [isPostDeleted, setIsPostDeleted] = useState(false);
  const [replyDraft, setReplyDraft] = useState("");
  const [sortMode, setSortMode] = useState<SortMode>("relevant");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    if (!notice) return;

    const timeout = window.setTimeout(() => setNotice(""), 2500);
    return () => window.clearTimeout(timeout);
  }, [notice]);

  const sortedComments = useMemo(() => {
    const sorted = [...comments];

    if (sortMode === "newest") {
      sorted.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    } else {
      sorted.sort((a, b) => b.likesCount - a.likesCount);
    }

    return sorted;
  }, [comments, sortMode]);

  const isOwner = Boolean(
    post && currentUser && post.author.id === currentUser.id,
  );

  function goBack() {
    if (window.history.length > 1) navigate(-1);
    else navigate("/");
  }

  async function copyLink(hash = "") {
    const url = `${window.location.origin}${window.location.pathname}${hash}`;

    try {
      await navigator.clipboard.writeText(url);
      setNotice("Link copied to clipboard.");
    } catch {
      setNotice("Couldn't copy the link. Copy it from the address bar.");
    }
  }

  async function sharePost() {
    const url = `${window.location.origin}${window.location.pathname}`;

    if (typeof navigator.share === "function") {
      try {
        await navigator.share({ title: "VYBE post", url });
        return;
      } catch {
        return;
      }
    }

    await copyLink();
  }

  async function savePost(text: string) {
    if (!post) return;

    try {
      await updatePost(post.id, text);
      setPost((current) => (current ? { ...current, text } : current));
      setIsEditingPost(false);
    } catch (error) {
      console.error("Failed to update post:", error);
    }
  }

  async function toggleLike() {
    if (!post) return;

    try {
      await toggleLikeApi(post.id);

      setPost((current) =>
        current
          ? {
              ...current,
              likedByMe: !current.likedByMe,
              likesCount: current.likesCount + (current.likedByMe ? -1 : 1),
            }
          : current,
      );
    } catch (error) {
      console.error("Failed to toggle like:", error);
    }
  }

  async function toggleBookmark() {
    if (!post) return;

    try {
      await toggleBookmarkApi(post.id);

      setPost((current) =>
        current
          ? {
              ...current,
              bookmarkedByMe: !current.bookmarkedByMe,
            }
          : current,
      );
    } catch (error) {
      console.error("Failed to toggle bookmark:", error);
    }
  }

  function focusReply(username?: string) {
    if (username) setReplyDraft((current) => current || `@${username} `);

    const composer = document.getElementById("reply-composer");
    composer?.scrollIntoView({ behavior: "smooth", block: "center" });
    composer?.focus();
  }

  async function submitReply() {
    if (!currentUser || !post) return;

    const text = replyDraft.trim();
    if (!text) return;

    try {
      await createComment(post.id, text);

      const newComment: PostComment = {
        id: `local-${nowMs}-${comments.length}`,
        author: currentUser,
        text,
        createdAt: new Date(nowMs).toISOString(),
        likesCount: 0,
        likedByMe: false,
        repliesCount: 0,
        replies: [],
      };

      setComments((current) => [newComment, ...current]);

      setPost((current) =>
        current
          ? { ...current, commentsCount: current.commentsCount + 1 }
          : current,
      );

      setReplyDraft("");
    } catch (error) {
      console.error("Failed to create comment:", error);
    }
  }

  async function submitCommentReply(commentId: string, text: string) {
    if (!currentUser || !post) return;

    try {
      await createReply(post.id, commentId, text);

      const newReply: PostComment = {
        id: `local-${Date.now()}`,
        author: currentUser,
        text,
        createdAt: new Date().toISOString(),
        likesCount: 0,
        likedByMe: false,
        repliesCount: 0,
        replies: [],
      };

      setComments((current) =>
        mapComments(current, commentId, (comment) => ({
          ...comment,
          replies: [...comment.replies, newReply],
          repliesCount: comment.repliesCount + 1,
        })),
      );

      setPost((current) =>
        current
          ? { ...current, commentsCount: current.commentsCount + 1 }
          : current,
      );
    } catch (error) {
      console.error("Failed to create reply:", error);
    }
  }

  function toggleCommentLike(commentId: string) {
    setComments((current) =>
      mapComments(current, commentId, (comment) => ({
        ...comment,
        likedByMe: !comment.likedByMe,
        likesCount: comment.likesCount + (comment.likedByMe ? -1 : 1),
      })),
    );
  }

  async function saveComment(commentId: string, text: string) {
    if (!post) return;

    try {
      await updateComment(post.id, commentId, text);

      setComments((current) =>
        mapComments(current, commentId, (comment) => ({
          ...comment,
          text,
        })),
      );

      setEditingCommentId(null);
    } catch (error) {
      console.error("Failed to update comment:", error);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget || !post) return;

    try {
      if (deleteTarget.type === "post") {
        await deletePost(post.id);
        setIsPostDeleted(true);
      } else {
        await deleteComment(post.id, deleteTarget.id);

        const removedCount =
          1 +
          countComments(
            comments.flatMap((comment) =>
              comment.id === deleteTarget.id ? comment.replies : [],
            ),
          );

        setComments((current) => removeComment(current, deleteTarget.id));

        setPost((current) =>
          current
            ? {
                ...current,
                commentsCount: Math.max(
                  0,
                  current.commentsCount - removedCount,
                ),
              }
            : current,
        );
      }

      setDeleteTarget(null);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  let content: React.ReactNode;

  if (status === "loading") {
    content = <PostDetailsSkeleton />;
  } else if (status === "error") {
    content = (
      <StateMessage
        icon={<IconAlertTriangle className="size-6" />}
        title="Couldn't load this post"
        description={errorMessage ?? "Something went wrong. Please try again."}
        action={
          onRetry && (
            <button
              className="mt-2 rounded-full bg-[#a78bfa] px-5 py-2 text-sm font-bold text-[#3c1989] transition-colors hover:bg-[#b49cff]"
              type="button"
              onClick={onRetry}
            >
              Try again
            </button>
          )
        }
      />
    );
  } else if (!post || !currentUser || isPostDeleted) {
    content = (
      <StateMessage
        icon={<IconMessageOff className="size-6" />}
        title={isPostDeleted ? "Post deleted" : "Post not found"}
        description={
          isPostDeleted
            ? "This post and its conversation are no longer available."
            : "This post may have been removed or the link is incorrect."
        }
        action={
          <button
            className="mt-2 rounded-full bg-[#272a34] px-5 py-2 text-sm font-semibold text-[#e0e2f0] transition-colors hover:bg-[#32343f]"
            type="button"
            onClick={goBack}
          >
            Back to feed
          </button>
        }
      />
    );
  } else {
    content = (
      <>
        <PostDetailCard
          post={post}
          isOwner={isOwner}
          isEditing={isEditingPost}
          onToggleLike={toggleLike}
          onToggleBookmark={toggleBookmark}
          onShare={sharePost}
          onFocusReply={() => focusReply()}
          onStartEdit={() => setIsEditingPost(true)}
          onCancelEdit={() => setIsEditingPost(false)}
          onSaveEdit={savePost}
          onRequestDelete={() => setDeleteTarget({ type: "post" })}
        />

        <ReplyComposer
          currentUser={currentUser}
          replyingTo={post.author}
          value={replyDraft}
          onChange={setReplyDraft}
          onSubmit={submitReply}
        />

        <section
          aria-labelledby="comments-heading"
          className="flex flex-col gap-3"
        >
          <div className="flex items-center justify-between px-0 pt-4 sm:px-2 sm:pt-2">
            <div className="flex items-center gap-2 sm:items-end sm:gap-0">
              <h2
                className="m-0 text-lg font-semibold leading-6 tracking-[-0.18px] text-[#e0e2f0]"
                id="comments-heading"
              >
                <span className="sm:hidden">Conversation</span>
                <span className="hidden sm:inline">Replies </span>
              </h2>

              <span className="rounded-full bg-[#272a34] px-2 py-0.5 text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4] sm:bg-transparent sm:p-0 sm:text-[15px] sm:font-normal sm:leading-5.5 sm:tracking-[-0.075px]">
                <span className="hidden sm:inline">(</span>
                {post.commentsCount}
                <span className="hidden sm:inline">)</span>
              </span>
            </div>

            <button
              className="flex items-center gap-1 rounded-md text-xs font-medium tracking-[0.12px] text-[#cac4d4] transition-colors hover:text-[#e0e2f0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:font-semibold sm:text-[#e0e2f0]"
              type="button"
              aria-label={`Sorted by ${sortMode === "relevant" ? "most relevant" : "newest"}. Change sorting`}
              onClick={() =>
                setSortMode((current) =>
                  current === "relevant" ? "newest" : "relevant",
                )
              }
            >
              {sortMode === "relevant" ? (
                <>
                  <span className="sm:hidden">Most Relevant</span>
                  <span className="hidden sm:inline">Top Responses</span>
                </>
              ) : (
                "Newest"
              )}

              <IconChevronDown className="size-3" />
            </button>
          </div>

          {sortedComments.length === 0 ? (
            <StateMessage
              icon={<IconMessageOff className="size-6" />}
              title="No replies yet"
              description="Be the first to join the conversation."
            />
          ) : (
            <div className="flex flex-col gap-3 sm:gap-3">
              {sortedComments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  postAuthorId={post.author.id}
                  currentUserId={currentUser.id}
                  nowMs={nowMs}
                  editingId={editingCommentId}
                  onToggleLike={toggleCommentLike}
                  onReply={focusReply}
                  onShare={(commentId) => copyLink(`#comment-${commentId}`)}
                  onSubmitReply={submitCommentReply}
                  onStartEdit={setEditingCommentId}
                  onCancelEdit={() => setEditingCommentId(null)}
                  onSaveEdit={saveComment}
                  onRequestDelete={(commentId) =>
                    setDeleteTarget({ type: "comment", id: commentId })
                  }
                />
              ))}
            </div>
          )}
        </section>
      </>
    );
  }

  return (
    <div className="min-h-dvh bg-[#10131d] pb-10 text-[#e0e2f0]">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-4 px-4 pt-14 sm:px-6 sm:pt-22 lg:px-0">
        <nav className="flex items-center justify-between max-sm:py-2">
          <button
            className="inline-flex items-center gap-2 rounded-full bg-[#181b26] px-3 py-1.5 text-sm font-medium text-[#e0e2f0] shadow-[0_1px_2px_0_#0000000d] transition-colors hover:bg-[#272a34] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:rounded-xl sm:bg-transparent sm:px-2 sm:py-1 sm:text-[#cac4d4] sm:shadow-none sm:hover:bg-white/5"
            type="button"
            onClick={goBack}
          >
            <IconArrowLeft className="size-3 text-[#cebdff] sm:size-3.5 sm:text-[#cac4d4]" />
            Back to Feed
          </button>

          <span className="inline-flex items-center gap-1 rounded-full bg-[#181b26] px-2 py-1 text-xs font-medium tracking-[0.12px] text-[#cac4d4] sm:hidden">
            <span className="size-2 rounded-full bg-[#cebdff]" />
            Live Thread
          </span>
        </nav>

        {content}
      </div>

      {notice && (
        <div
          className="fixed inset-x-4 bottom-6 z-40 mx-auto w-fit max-w-full rounded-full bg-[#272a34] px-4 py-2 text-sm font-medium text-[#e0e2f0] shadow-[0_10px_30px_#00000066]"
          role="status"
          aria-live="polite"
        >
          {notice}
        </div>
      )}

      {deleteTarget && (
        <ConfirmDialog
          title={
            deleteTarget.type === "post"
              ? "Delete this post?"
              : "Delete this comment?"
          }
          description={
            deleteTarget.type === "post"
              ? "This will permanently remove the post and its conversation. This can't be undone."
              : "This will permanently remove the comment. This can't be undone."
          }
          confirmLabel="Delete"
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}

export default function PostDetails(props: PostDetailsProps) {
  const componentKey = props.data?.post.id ?? `status-${props.status}`;

  return <PostDetailsView key={componentKey} {...props} />;
}
