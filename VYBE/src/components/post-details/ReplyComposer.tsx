import {
  IconChartBar,
  IconCornerUpLeft,
  IconMoodSmile,
  IconPhoto,
} from "@tabler/icons-react";
import type { PostDetailsUser } from "../../types/post-details";
export const REPLY_MAX_LENGTH = 280;

interface ReplyComposerProps {
  currentUser: PostDetailsUser;
  replyingTo: PostDetailsUser;
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
}
const iconButton =
  "grid size-8 place-items-center rounded-full bg-[#181b26] text-[#cac4d4] transition-colors hover:bg-[#272a34] hover:text-[#cebdff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:bg-transparent";

export function ReplyComposer({
  currentUser,
  replyingTo,
  value,
  onChange,
  onSubmit,
}: ReplyComposerProps) {
  const canSubmit = value.trim().length > 0;
  const remaining = REPLY_MAX_LENGTH - value.length;

  return (
    <form
      className="flex flex-col gap-3 rounded-xl bg-[#1c1f2a] p-4 shadow-[0_4px_6px_-1px_#0000001a] sm:rounded-2xl sm:shadow-[0_10px_15px_-3px_#0000001a]"
      onSubmit={(event) => {
        event.preventDefault();
        if (canSubmit) onSubmit();
      }}
    >
      <div className="hidden items-center gap-2 px-2 text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4] sm:flex">
        <IconCornerUpLeft className="size-3" aria-hidden="true" />
        <span>
          Replying to{" "}
          <span className="font-semibold text-[#cebdff]">
            @{replyingTo.username}
          </span>
        </span>
      </div>
      <div className="flex items-start gap-3">
        <img
          className="size-9 shrink-0 rounded-full object-cover sm:size-10"
          src={currentUser.avatarUrl}
          alt={`${currentUser.name} profile picture`}
        />
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <p className="m-0 flex items-center gap-1 pb-0 text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4] sm:hidden">
            Replying to
            <span className="text-[#cebdff]">@{replyingTo.username}</span>
          </p>
          <textarea
            id="reply-composer"
            className="min-h-14 w-full resize-none rounded-xl border border-transparent bg-transparent text-[15px] leading-5.5 tracking-[-0.075px] text-[#e0e2f0] outline-none transition-[border-color,box-shadow] placeholder:text-[#cac4d4] sm:min-h-18 sm:bg-[#181b26] sm:p-3 sm:pb-12 sm:text-[13px] sm:leading-4.5 sm:tracking-normal sm:placeholder:text-[#948e9d] sm:focus:border-[#a78bfa80] sm:focus:shadow-[0_0_0_3px_#a78bfa1c]"
            placeholder="Post your reply..."
            value={value}
            maxLength={REPLY_MAX_LENGTH}
            aria-label="Reply text"
            onChange={(event) => onChange(event.target.value)}
          />
          <div className="flex items-center justify-between gap-3 pt-2 sm:pt-1">
            <div className="flex items-center gap-2 sm:gap-1">
              <button
                className={iconButton}
                type="button"
                aria-label="Add emoji"
              >
                <IconMoodSmile className="size-4 sm:size-3.75" />
              </button>
              <button
                className={iconButton}
                type="button"
                aria-label="Add image"
              >
                <IconPhoto className="size-4 sm:size-3.75" />
              </button>
              <button
                className={`${iconButton} sm:hidden`}
                type="button"
                aria-label="Add poll"
              >
                <IconChartBar className="size-4" />
              </button>
              <span className="pl-1 text-[11px] font-medium leading-3.5 tracking-[0.22px] text-[#cac4d4] sm:hidden">
                {value.length}/{REPLY_MAX_LENGTH}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span
                className={`hidden text-[11px] font-medium leading-3.5 tracking-[0.22px] sm:inline ${remaining < 20 ? "text-[#ffb4ab]" : "text-[#cac4d4]"}`}
              >
                {remaining}
              </span>
              <button
                className="rounded-full bg-[#a78bfa] px-4 py-1.5 text-sm font-semibold text-[#3c1989] shadow-[0_0_16px_#a78bfa4d] transition-[background,opacity] hover:bg-[#b49cff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] disabled:cursor-not-allowed disabled:opacity-40 sm:px-6 sm:py-2 sm:font-bold"
                type="submit"
                disabled={!canSubmit}
              >
                Reply
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
