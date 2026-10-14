import { FiRefreshCw, FiUsers, FiZap, FiTarget } from "react-icons/fi"

export default function ValuesSection() {
  return (
    <>
      <div
        className="flex flex-col bg-[#121212] px-6 py-16 text-gray-400"
        dir="rtl"
      >
        {/* Section Header */}
        <div className="mb-12 text-center">
          <h2 className="mb-2 text-3xl font-extrabold text-white">
            <span className="mx-1 text-[#FF6100]">|</span>
            قيمنا
            <span className="mx-1 text-[#FF6100]">|</span>
          </h2>
          <p className="text-sm">المبادئ التي توجه كل ما نقوم بإنشائه</p>
        </div>

        {/* Cards Grid */}
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {/* Card 1 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-[#1a1a1a] p-6 text-center transition-all duration-300 hover:border-neutral-700">
            <FiRefreshCw className="mb-4 h-10 w-10 text-[#FF6100]" />
            <h3 className="mb-2 text-lg font-bold text-white">دائماً محدث</h3>
            <p className="text-sm">أحدث الاتجاهات وأفضل الممارسات</p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-[#1a1a1a] p-6 text-center transition-all duration-300 hover:border-neutral-700">
            <FiUsers className="mb-4 h-10 w-10 text-[#FF6100]" />
            <h3 className="mb-2 text-lg font-bold text-white">المجتمع</h3>
            <p className="text-sm">تعلم مع آلاف المصورين</p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-[#1a1a1a] p-6 text-center transition-all duration-300 hover:border-neutral-700">
            <FiZap className="mb-4 h-10 w-10 text-[#FF6100]" />
            <h3 className="mb-2 text-lg font-bold text-white">تركيز عملي</h3>
            <p className="text-sm">أمثلة واقعية يمكنك تطبيقها اليوم</p>
          </div>

          {/* Card 4 */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-neutral-800 bg-[#1a1a1a] p-6 text-center transition-all duration-300 hover:border-neutral-700">
            <FiTarget className="mb-4 h-10 w-10 text-[#FF6100]" />
            <h3 className="mb-2 text-lg font-bold text-white">الجودة أولاً</h3>
            <p className="text-sm">محتوى مدروس ومكتوب بخبرة</p>
          </div>
        </div>
      </div>
    </>
  )
}
