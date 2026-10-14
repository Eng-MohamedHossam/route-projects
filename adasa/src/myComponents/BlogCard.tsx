import { Link } from "react-router"
import { Clock, ChevronLeft } from "lucide-react"

interface Author {
  name: string
  avatar: string
  role: string
}

export interface Post {
  id: number
  slug: string
  title: string
  excerpt: string
  category: string
  date: string
  readTime: string
  image: string
  author: Author
}

interface BlogCardProps {
  post: Post
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <article className="group flex flex-col justify-between overflow-hidden rounded-3xl border border-neutral-800 bg-[#161616] transition-all duration-300 hover:border-neutral-700 hover:shadow-xl">
      <div>
        {/* Post Image & Category Tag */}
        <div className="relative h-52 w-full overflow-hidden bg-neutral-900">
          <img
            src={
              post.image ||
              "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600"
            }
            alt={post.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-4 right-4 rounded-full border border-neutral-800 bg-neutral-950/80 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            {post.category}
          </span>
        </div>

        {/* Metadata & Title */}
        <div className="p-6">
          <div className="mb-3 flex items-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock size={14} />
              <span>{post.readTime}</span>
            </div>
            <span>•</span>
            <span>{post.date}</span>
          </div>

          <h3 className="mb-2 line-clamp-2 text-xl font-bold text-white transition-colors group-hover:text-[#FF6100]">
            {post.title}
          </h3>

          <p className="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-400">
            {post.excerpt}
          </p>
        </div>
      </div>

      {/* Author & Read Button */}
      <div className="mt-auto flex items-center justify-between border-t border-neutral-800/60 px-6 pt-4 pb-6">
        <div className="flex items-center gap-3">
          <img
            src={
              post.author?.avatar ||
              "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
            }
            alt={post.author?.name}
            className="h-9 w-9 rounded-full border border-neutral-700 object-cover"
          />
          <div>
            <h4 className="text-xs font-bold text-white">
              {post.author?.name}
            </h4>
            <p className="text-[11px] text-gray-500">{post.author?.role}</p>
          </div>
        </div>

        <Link to={`/blog/${post.slug}`}>
          <button className="flex h-9 w-9 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-gray-400 transition-all duration-300 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
            <ChevronLeft size={18} />
          </button>
        </Link>
      </div>
    </article>
  )
}
