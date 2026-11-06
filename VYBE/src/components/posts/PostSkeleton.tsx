export function PostSkeleton() {
  return (
    <article className="animate-pulse overflow-hidden rounded-2xl border border-white/4 bg-[#1c1f2a] p-5">
      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="size-10 rounded-full bg-white/10" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-32 rounded bg-white/10" />
          <div className="h-2.5 w-20 rounded bg-white/6" />
        </div>
      </div>

      {/* Post text */}
      <div className="mt-5 space-y-2">
        <div className="h-3 w-full rounded bg-white/10" />
        <div className="h-3 w-3/4 rounded bg-white/10" />
      </div>

      {/* Post image */}
      <div className="mt-5 aspect-16/8.5 rounded-xl bg-white/6" />

      {/* Actions */}
      <div className="mt-5 flex gap-6 border-t border-white/6 pt-4">
        <div className="h-4 w-12 rounded bg-white/10" />
        <div className="h-4 w-12 rounded bg-white/10" />
        <div className="h-4 w-12 rounded bg-white/10" />
      </div>
    </article>
  );
}
