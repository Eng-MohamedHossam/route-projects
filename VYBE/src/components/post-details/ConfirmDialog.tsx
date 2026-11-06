import { useEffect, useRef } from "react";
interface ConfirmDialogProps {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}
export function ConfirmDialog({
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  const cancelRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    cancelRef.current?.focus();
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onCancel();
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onCancel]);
  return (
    <div
      className="fixed inset-0 z-50 grid place-items-center bg-[#05071199] p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onCancel();
      }}
    >
      <div
        className="w-full max-w-sm rounded-2xl border border-white/6 bg-[#1c1f2a] p-6 shadow-[0_28px_100px_#05071180]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <h2
          className="text-lg font-semibold tracking-[-0.18px] text-[#e0e2f0]"
          id="confirm-dialog-title"
        >
          {title}
        </h2>
        <p
          className="mt-2 text-sm leading-5 text-[#cac4d4]"
          id="confirm-dialog-description"
        >
          {description}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            ref={cancelRef}
            className="rounded-full bg-[#272a34] px-5 py-2 text-sm font-semibold text-[#e0e2f0] transition-colors hover:bg-[#32343f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#cebdff]"
            type="button"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="rounded-full bg-[#ffb4ab] px-5 py-2 text-sm font-bold text-[#690005] transition-colors hover:bg-[#ffc7c0] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffb4ab]"
            type="button"
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
