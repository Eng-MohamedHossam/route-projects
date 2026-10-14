import { Link } from "react-router"
import { Clock, ArrowLeft } from "lucide-react"
import { allPosts } from "../data/blogData"
import type { Post } from "./BlogCard"

export default function LatestPostsSection() {
  const latestPosts: Post[] = allPosts.slice(3, 6)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 py-24 text-right font-sans text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        {/* Header Layout */}
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row-reverse">
          <Link to="/blog">
            <button className="group flex items-center gap-2 text-base font-bold text-[#FF6100] transition-colors hover:text-white">
              <span>عرض جميع المقالات</span>
              <ArrowLeft
                size={18}
                className="transition-transform duration-300 group-hover:-translate-x-1"
              />
            </button>
          </Link>

          {/* Title & Badge on the Right */}
          <div className="flex flex-col items-center text-center sm:items-end sm:text-left">
            {/* Top Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6100]/30 bg-[#FF6100]/10 px-4 py-1.5 text-xs text-[#FF6100]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100]"></span>
              <span>الأحدث</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100]"></span>
            </div>

            <h2 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              أحدث المقالات
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              محتوى جديد طازج من المطبعة
            </p>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {latestPosts.map((post) => (
            <article
              key={post.id}
              className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-[#141414] transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl"
            >
              <div>
                {/* Post Image & Category Tag */}
                <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                  <img
                    src={
                      post.image ||
                      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
                    }
                    alt={post.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-4 left-4 rounded-full border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
                    {post.category}
                  </span>
                </div>

                {/* Content Details */}
                <div className="p-6">
                  {/* Metadata */}
                  <div className="mb-3 flex items-center justify-start gap-3 text-xs text-gray-500">
                    <span>{post.date}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock size={14} />
                      <span>{post.readTime}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="mb-3 line-clamp-2 text-xl leading-snug font-bold text-white transition-colors group-hover:text-[#FF6100]">
                    {post.title}
                  </h3>

                  {/* Excerpt */}
                  <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author Footer & Arrow Button */}
              <div className="mt-auto flex items-center justify-between border-t border-neutral-800/80 px-6 pt-4 pb-6">
                <Link to={`/blog/${post.slug}`}>
                  <button className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-800 bg-neutral-900 text-gray-400 transition-all duration-300 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
                    <ArrowLeft size={16} />
                  </button>
                </Link>

                <div className="flex items-center gap-3 text-right">
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {post.author?.name}
                    </h4>
                    <p className="text-[11px] text-gray-500">
                      {post.author?.role}
                    </p>
                  </div>
                  <img
                    src={
                      post.author?.avatar ||
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                    }
                    alt={post.author?.name}
                    className="h-9 w-9 rounded-full border border-neutral-700 object-cover"
                  />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
