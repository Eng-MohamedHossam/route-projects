import { Link } from "react-router"
import { Clock, Star, ArrowLeft } from "lucide-react"
import type { Post } from "./BlogCard"

interface FeaturedBlogCardProps {
  post: Post
}

export default function FeaturedBlogCard({ post }: FeaturedBlogCardProps) {
  return (
    <article className="group flex w-full flex-col items-stretch justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-[#141414] transition-all duration-300 hover:border-neutral-700 hover:shadow-2xl lg:flex-row-reverse">
      {/* Text Details Content (On the Left) */}
      <div className="order-1 flex w-full flex-col justify-between p-8 text-right lg:w-1/2 lg:p-12">
        <div>
          {/* Top Meta info */}
          <div className="mb-6 flex items-center justify-end gap-3 text-xs text-gray-400">
            <span className="text-gray-500">{post.date}</span>
            <span>•</span>
            <div className="flex items-center gap-1 text-gray-500">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
            <span className="rounded-full border border-[#FF6100]/30 bg-[#FF6100]/10 px-3 py-1 text-xs font-medium text-[#FF6100]">
              {post.category}
            </span>
          </div>

          {/* Title */}
          <h3 className="mb-4 text-2xl leading-snug font-extrabold text-white transition-colors group-hover:text-[#FF6100] sm:text-3xl">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="mb-8 text-sm leading-relaxed text-gray-400 sm:text-base">
            {post.excerpt}
          </p>
        </div>

        {/* Author Footer & Read Button */}
        <div className="mt-auto flex w-full items-center justify-between border-t border-neutral-800/80 pt-6">
          <Link to={`/blog/${post.slug}`}>
            <button className="group/btn flex items-center gap-2 text-sm font-semibold text-[#FF6100] transition-colors hover:text-white">
              <span>اقرأ المقال</span>
              <ArrowLeft
                size={16}
                className="transition-transform duration-300 group-hover/btn:-translate-x-1"
              />
            </button>
          </Link>

          <div className="flex items-center gap-3 text-right">
            <div>
              <h4 className="text-sm font-bold text-white">
                {post.author?.name}
              </h4>
              <p className="text-xs text-gray-500">{post.author?.role}</p>
            </div>
            <img
              src={
                post.author?.avatar ||
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
              }
              alt={post.author?.name}
              className="h-10 w-10 rounded-full border border-neutral-700 object-cover"
            />
          </div>
        </div>
      </div>

      {/* Post Image Container (On the Right) */}
      <div className="relative order-2 h-64 min-h-75 w-full overflow-hidden bg-neutral-900 lg:h-auto lg:w-1/2">
        <img
          src={
            post.image ||
            "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800"
          }
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Featured Badge */}
        <div className="absolute top-4 left-4 flex items-center gap-1 rounded-full bg-amber-500/90 px-3 py-1.5 text-xs font-bold text-neutral-950 shadow-md">
          <Star size={14} className="fill-neutral-950" />
          <span>مميز</span>
        </div>
      </div>
    </article>
  )
}
