import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useAuth } from "../context/useAuth";
import {
  getSinglePost,
  getPostComments,
  getCommentReplies,
} from "../services/posts";
import PostDetails from "./PostDetailsPage";
import type {
  PostDetailsData,
  PostDetailsUser,
  PostDetailsStatus,
} from "../types/post-details";

type PostReply = PostDetailsData["comments"][number]["replies"][number];

export default function PostDetailsContainer() {
  const { postId } = useParams();
  const { user } = useAuth();

  const [data, setData] = useState<PostDetailsData | null>(null);
  const [status, setStatus] = useState<PostDetailsStatus>("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  // Keep the timestamp stable between renders.
  const [nowMs] = useState(() => Date.now());

  const currentUser: PostDetailsUser | null = user
    ? {
        id: user.id,
        name: user.name,
        username: user.username,
        avatarUrl: user.photo,
        initials: user.name
          .split(" ")
          .map((word) => word[0])
          .slice(0, 2)
          .join("")
          .toUpperCase(),
      }
    : null;

  const currentUserId = currentUser?.id;

  useEffect(() => {
    if (!postId) return;

    const id: string = postId;

    let isActive = true;

    async function fetchPostDetails() {
      try {
        setStatus("loading");
        setErrorMessage("");

        const [postResponse, commentsResponse] = await Promise.all([
          getSinglePost(id),
          getPostComments(id),
        ]);

        const post = postResponse.data.post;

        const mapUser = (apiUser: typeof post.user): PostDetailsUser => ({
          id: apiUser._id,
          name: apiUser.name,
          username: apiUser.username,
          avatarUrl: apiUser.photo,
          initials: apiUser.name
            .split(" ")
            .map((word) => word[0])
            .slice(0, 2)
            .join("")
            .toUpperCase(),
        });

        const comments = await Promise.all(
          commentsResponse.data.comments.map(async (comment) => {
            let replies: PostReply[] = [];

            if ((comment.repliesCount ?? 0) > 0) {
              const repliesResponse = await getCommentReplies(id, comment._id);

              replies = repliesResponse.data.replies.map((reply) => ({
                id: reply._id,
                text: reply.content,
                author: mapUser(reply.commentCreator),
                createdAt: reply.createdAt,
                likesCount: reply.likesCount ?? reply.likes.length,
                likedByMe: currentUserId
                  ? reply.likes.includes(currentUserId)
                  : false,
                repliesCount: 0,
                replies: [],
              }));
            }

            return {
              id: comment._id,
              text: comment.content,
              author: mapUser(comment.commentCreator),
              createdAt: comment.createdAt,
              likesCount: comment.likesCount ?? comment.likes.length,
              likedByMe: currentUserId
                ? comment.likes.includes(currentUserId)
                : false,
              repliesCount: comment.repliesCount ?? 0,
              replies,
            };
          }),
        );

        if (!isActive) return;

        setData({
          post: {
            id: post._id,
            author: mapUser(post.user),
            text: post.body,
            imageUrl: post.image,
            createdAt: post.createdAt,
            likesCount: post.likesCount,
            likedByMe: currentUserId
              ? post.likes.includes(currentUserId)
              : false,
            repostsCount: post.sharesCount,
            commentsCount: post.commentsCount,
            bookmarkedByMe: post.bookmarked,
            likedBy: [],
          },
          comments,
        });

        setStatus("success");
      } catch (error) {
        if (!isActive) return;

        console.error("Failed to load post:", error);
        setErrorMessage("Failed to load this post. Please try again.");
        setStatus("error");
      }
    }

    void fetchPostDetails();

    return () => {
      isActive = false;
    };
  }, [postId, currentUserId, retryCount]);

  return (
    <PostDetails
      key={postId}
      currentUser={currentUser}
      status={status}
      data={data}
      nowMs={nowMs}
      errorMessage={errorMessage}
      onRetry={() => {
        setData(null);
        setStatus("loading");
        setRetryCount((count) => count + 1);
      }}
    />
  );
}
