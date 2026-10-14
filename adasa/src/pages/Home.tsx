import { FaArrowLeftLong, FaNewspaper, FaPenNib } from "react-icons/fa6"
import { IoMdInformationCircleOutline } from "react-icons/io"
import { HiOutlineUserGroup } from "react-icons/hi"
import { FaFolderOpen } from "react-icons/fa"
import CategoriesSection from "@/myComponents/CategoriesSection"
import NewsletterSection from "@/myComponents/NewsletterSection"
import FeaturedSection from "@/myComponents/FeaturedSection"
import LatestPostsSection from "@/myComponents/LatestPostsSection"

export default function Home() {
  return (
    <>
      <main>
        <div className="hero mt-22 flex min-h-screen flex-col items-center justify-center bg-[#080808] bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-size-[76px_76px]">
          <p className="flex items-center gap-2 rounded-4xl border border-[#F66E13] bg-[#F66E13]/20 p-3 text-sm text-gray-300">
            <span className="relative flex h-2 w-2">
              <span className="absolute h-full w-full animate-ping rounded-full bg-[#F66E13]"></span>
              <span className="relative h-2 w-2 rounded-full bg-[#F66E13]"></span>
            </span>
            <span className="h-2 w-2 rounded-full bg-[#F66E13]"></span>
            مرحباً بك في عدسة
          </p>

          <h1 className="p-3 text-center text-6xl leading-relaxed font-extrabold text-white">
            اكتشف<span className="text-[#FAA31F]"> فن </span>
            <br />
            التصوير الفوتوغرافي
          </h1>

          <p className="p-3 text-center text-2xl text-gray-500">
            انغمس في أسرار المحترفين ونصائح عملية لتطوير مهاراتك في <br />
            التصوير.
          </p>

          <div className="mt-6 flex gap-5">
            <button className="flex items-center gap-2 rounded-4xl bg-[#F66E13] px-5 text-white transition-all duration-300 hover:-translate-y-1">
              <span>استكشف المقالات</span>
              <FaArrowLeftLong size={12} />
            </button>

            <button className="flex items-center justify-center gap-1.5 rounded-4xl border bg-transparent p-4 px-7 text-white hover:bg-[#F66E13]/20 hover:text-[#F66E13]">
              <IoMdInformationCircleOutline />
              اعرف المزيد
            </button>
          </div>

          <div className="flex gap-12">
            <div className="mt-15 flex scale-100 flex-col items-center rounded-3xl border border-gray-600 bg-gray-800/50 px-12 py-6 text-[#F66E13] transition-transform duration-300 hover:scale-110">
              <FaNewspaper size={26} />

              <p className="text-2xl font-extrabold text-[#F99A1C]">+50</p>

              <p className="text-gray-500">مقالة</p>
            </div>

            <div className="mt-15 flex scale-100 flex-col items-center rounded-3xl border border-gray-600 bg-gray-800/50 px-12 py-6 text-[#F66E13] transition-transform duration-300 hover:scale-110">
              <HiOutlineUserGroup size={26} />

              <p className="text-2xl font-extrabold text-[#F99A1C]">+10ألف</p>

              <p className="text-gray-500">قارئ</p>
            </div>

            <div className="mt-15 flex scale-100 flex-col items-center rounded-3xl border border-gray-600 bg-gray-800/50 px-12 py-6 text-[#F66E13] transition-transform duration-300 hover:scale-110">
              <FaFolderOpen size={26} />

              <p className="text-2xl font-extrabold text-[#F99A1C]">4</p>

              <p className="text-gray-500">تصنيفات</p>
            </div>

            <div className="mt-15 flex scale-100 flex-col items-center rounded-3xl border border-gray-600 bg-gray-800/50 px-12 py-6 text-[#F66E13] transition-transform duration-300 hover:scale-110">
              <FaPenNib size={26} />

              <p className="text-2xl font-extrabold text-[#F99A1C]">6</p>

              <p className="text-gray-500">كاتب</p>
            </div>
          </div>
        </div>

        <div></div>
      </main>

      <FeaturedSection />

      <CategoriesSection />

      <LatestPostsSection />

      <NewsletterSection />
    </>
  )
}
