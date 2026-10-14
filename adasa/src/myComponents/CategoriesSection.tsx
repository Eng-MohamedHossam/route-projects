import React from "react"
import { Sliders, Mountain, User, SunMedium, Wrench } from "lucide-react"

interface CategoryItem {
  id: number
  title: string
  count: string
  icon: React.ReactNode
}

export default function CategoriesSection() {
  const categories: CategoryItem[] = [
    {
      id: 1,
      title: "تقنيات",
      count: "5 مقالة",
      icon: <Sliders className="h-5 w-5 text-[#FF6100]" />,
    },
    {
      id: 2,
      title: "مناظر طبيعية",
      count: "2 مقالة",
      icon: <Mountain className="h-5 w-5 text-[#FF6100]" />,
    },
    {
      id: 3,
      title: "بورتريه",
      count: "3 مقالة",
      icon: <User className="h-5 w-5 text-[#FF6100]" />,
    },
    {
      id: 4,
      title: "إضاءة",
      count: "3 مقالة",
      icon: <SunMedium className="h-5 w-5 text-[#FF6100]" />,
    },
    {
      id: 5,
      title: "معدات",
      count: "3 مقالة",
      icon: <Wrench className="h-5 w-5 text-[#FF6100]" />,
    },
  ]

  return (
    <section className="relative overflow-hidden bg-[#111111] px-4 py-24 text-center font-sans">
      <div className="mx-auto flex max-w-7xl flex-col items-center">
        {/* Top Badge */}
        <div className="felx bg-[#111111]">
          <div className="w-32">
            <p className="flex items-center gap-2 rounded-4xl border border-[#F66E13] bg-[#F66E13]/20 px-3 py-1 text-sm text-[#F66E13]">
              <span className="relative flex h-2 w-2">
                <span className="absolute h-full w-full animate-ping rounded-full bg-[#F66E13]"></span>
                <span className="relative h-2 w-2 rounded-full bg-[#F66E13]"></span>
              </span>
              <span className="h-2 w-2 rounded-full bg-[#F66E13]"></span>
              التصنيفات
            </p>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="mb-3 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          استكشف حسب الموضوع
        </h2>

        {/* Subtitle */}
        <p className="mb-16 text-sm text-gray-400 sm:text-base">
          اعثر على محتوى مصمم حسب اهتماماتك
        </p>

        {/* Cards Grid */}
        <div className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((item) => (
            <div
              key={item.id}
              className="group relative flex h-44 cursor-pointer flex-col items-start justify-between rounded-2xl border border-neutral-800 bg-[#141414] p-6 text-right transition-all duration-300 hover:border-[#FF6100] hover:bg-[#FF6100]"
            >
              {/* Icon Box */}
              <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#FF6100]/20 bg-[#FF6100]/10 transition-colors duration-300 group-hover:border-white/30 group-hover:bg-white/20">
                <span className="text-[#FF6100] transition-colors duration-300 group-hover:text-white">
                  {item.icon}
                </span>
              </div>

              {/* Text Info */}
              <div className="w-full">
                <h3 className="mb-1 text-lg font-bold text-white transition-colors duration-300">
                  {item.title}
                </h3>
                <p className="text-xs text-gray-500 transition-colors duration-300 group-hover:text-white/90">
                  {item.count}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
