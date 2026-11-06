import { IconDots, IconPencil, IconTrash } from "@tabler/icons-react";
import { useEffect, useRef, useState } from "react";
interface OwnerMenuProps {
  label: string;
  editLabel: string;
  deleteLabel: string;
  onEdit: () => void;
  onDelete: () => void;
  variant?: "post" | "comment";
}
export function OwnerMenu({
  label,
  editLabel,
  deleteLabel,
  onEdit,
  onDelete,
  variant = "comment",
}: OwnerMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (!containerRef.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);
  return (
    <div className="relative" ref={containerRef}>
      <button
        className={
          variant === "post"
            ? "grid size-9 place-items-center rounded-full bg-[#181b26] text-[#cac4d4] transition-colors hover:bg-[#272a34] hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff] sm:bg-[#272a34] sm:hover:bg-[#32343f]"
            : "grid size-7 place-items-center rounded-full text-[#cac4d4] transition-colors hover:bg-white/6 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
        }
        type="button"
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
      >
        <IconDots className="size-4" />
      </button>
      {open && (
        <div
          className="absolute right-0 top-full z-30 mt-2 w-56 rounded-xl bg-[#272a34f2] p-1.5 shadow-[0_25px_50px_-12px_#00000040] backdrop-blur-xl"
          role="menu"
        >
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-[#e0e2f0] transition-colors hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-[#cebdff]"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onEdit();
            }}
          >
            <IconPencil className="size-4 text-[#cac4d4]" />
            {editLabel}
          </button>
          <div className="my-1 h-px bg-[#32343f]" />
          <button
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-[#ffb4ab] transition-colors hover:bg-[#ffb4ab14] focus-visible:outline-2 focus-visible:outline-[#ffb4ab]"
            type="button"
            role="menuitem"
            onClick={() => {
              setOpen(false);
              onDelete();
            }}
          >
            <IconTrash className="size-4" />
            {deleteLabel}
          </button>
        </div>
      )}
    </div>
  );
}
