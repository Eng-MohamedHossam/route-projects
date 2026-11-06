function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse rounded-lg bg-white/10 ${className}`} />
  );
}

export default function ProfileSkeleton() {
  return (
    <main className="min-h-screen bg-[#10131D] px-4 py-6 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back button */}
        <Skeleton className="mb-5 h-10 w-36" />

        {/* Profile header */}
        <section className="overflow-hidden rounded-2xl border border-white/5 bg-[#1C1F2A]">
          {/* Cover */}
          <Skeleton className="h-40 w-full rounded-none sm:h-52" />

          <div className="px-6 pb-6">
            {/* Avatar */}
            <div className="-mt-12 mb-4">
              <Skeleton className="h-24 w-24 rounded-full border-4 border-[#1C1F2A]" />
            </div>

            {/* Name and username */}
            <Skeleton className="mb-3 h-6 w-48" />
            <Skeleton className="mb-5 h-4 w-32" />

            {/* Bio */}
            <Skeleton className="mb-2 h-4 w-full max-w-md" />
            <Skeleton className="mb-6 h-4 w-2/3 max-w-sm" />

            {/* Statistics */}
            <div className="flex gap-8">
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
              <Skeleton className="h-10 w-20" />
            </div>
          </div>
        </section>

        {/* Posts */}
        <section className="mt-8">
          <Skeleton className="mb-5 h-7 w-28" />

          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="rounded-xl border border-white/5 bg-[#1C1F2A] p-5"
              >
                {/* Post author */}
                <div className="mb-5 flex items-center gap-3">
                  <Skeleton className="h-11 w-11 rounded-full" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-32" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>

                {/* Post content */}
                <Skeleton className="mb-2 h-4 w-full" />
                <Skeleton className="mb-4 h-4 w-3/4" />

                {/* Post image */}
                <Skeleton className="mb-5 h-48 w-full rounded-xl" />

                {/* Actions */}
                <div className="flex gap-6">
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-5 w-14" />
                  <Skeleton className="h-5 w-14" />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
