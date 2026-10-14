import { useState } from "react"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  SlidersHorizontal,
} from "lucide-react"
import { categories, allPosts } from "../data/blogData"
import BlogCard, { type Post } from "./BlogCard"

export default function BlogListSection() {
  const [selectedCategory, setSelectedCategory] =
    useState<string>("جميع المقالات")
  const [searchQuery, setSearchQuery] = useState<string>("")
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 6

  // Filter posts based on category and search query
  const filteredPosts: Post[] = allPosts.filter((post: Post) => {
    const matchesCategory =
      selectedCategory === "جميع المقالات" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage) || 1
  const indexOfLastPost = currentPage * postsPerPage
  const indexOfFirstPost = indexOfLastPost - postsPerPage
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <section className="relative min-h-screen overflow-hidden bg-[#0A0A0A] px-4 py-16 text-right font-sans text-gray-300">
      <div className="mx-auto flex max-w-7xl flex-col gap-8">
        {/* Top Header & Search Bar */}
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-neutral-800 bg-[#161616] p-4 lg:flex-row">
          {/* Category Filter Badges */}
          <div className="flex w-full scrollbar-none items-center gap-2 overflow-x-auto pb-2 lg:w-auto lg:pb-0">
            <button
              onClick={() => {
                setSelectedCategory("جميع المقالات")
                setCurrentPage(1)
              }}
              className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === "جميع المقالات"
                  ? "bg-[#FF6100] text-white shadow-md"
                  : "border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-white"
              }`}
            >
              جميع المقالات
            </button>
            {categories
              .filter((cat: string) => cat !== "جميع المقالات")
              .map((cat: string, index: number) => (
                <button
                  key={index}
                  onClick={() => {
                    setSelectedCategory(cat)
                    setCurrentPage(1)
                  }}
                  className={`rounded-full px-4 py-2 text-sm font-semibold whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-[#FF6100] text-white shadow-md"
                      : "border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              ))}
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3.5 text-gray-500">
              <Search size={18} />
            </span>
            <input
              type="text"
              placeholder="ابحث في المقالات..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value)
                setCurrentPage(1)
              }}
              className="w-full rounded-full border border-neutral-800 bg-neutral-900 py-2.5 pr-10 pl-4 text-sm text-white transition-colors outline-none focus:border-[#FF6100]"
            />
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between px-2 text-sm text-gray-400">
          <span>عرض {filteredPosts.length} مقالات</span>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <SlidersHorizontal size={14} />
            <span>مرتبة حسب الأحدث</span>
          </div>
        </div>

        {/* Posts Grid rendering the separate BlogCard component */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-gray-400 hover:border-neutral-700 disabled:opacity-40"
            >
              <ChevronRight size={18} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`h-10 w-10 rounded-xl text-sm font-semibold transition-colors ${
                  currentPage === page
                    ? "bg-[#FF6100] text-white shadow-md"
                    : "border border-neutral-800 bg-neutral-900 text-gray-400 hover:text-white"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-neutral-800 bg-neutral-900 text-gray-400 hover:border-neutral-700 disabled:opacity-40"
            >
              <ChevronLeft size={18} />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}
