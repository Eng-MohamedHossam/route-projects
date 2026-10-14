import { Link } from "react-router"
import { allPosts } from "../data/blogData"
import FeaturedBlogCard from "./FeaturedBlogCard"

export default function FeaturedSection() {
  const featuredPosts = allPosts.slice(0, 3)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 py-24 text-right font-sans text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-12">
        {/* Header Title & Button */}
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex flex-col items-center text-center sm:items-start sm:text-right">
            {/* Top Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#FF6100]/30 bg-[#FF6100]/10 px-4 py-1.5 text-xs text-[#FF6100]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100]"></span>
              <span>مميز</span>
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100]"></span>
            </div>

            <h2 className="mb-2 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
              مقالات مختارة
            </h2>
            <p className="text-sm text-gray-400 sm:text-base">
              محتوى منتقى لبدء رحلة تعلمك
            </p>
          </div>

          <Link to="/blog">
            <button className="rounded-full bg-[#FF6100] px-8 py-3.5 font-bold text-white shadow-md shadow-[#FF6100]/20 transition-transform duration-300 hover:scale-105 hover:bg-[#e05600]">
              عرض الكل
            </button>
          </Link>
        </div>

        {/* Featured Posts Stack */}
        <div className="flex flex-col gap-8">
          {featuredPosts.map((post) => (
            <FeaturedBlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  )
}
