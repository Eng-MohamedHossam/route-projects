import { FiBookOpen } from "react-icons/fi"

export default function BlogHeader() {
  return (
    <>
      <div
        className="relative mt-23 flex flex-col items-center justify-center overflow-hidden bg-[#0d0d0d] px-4 py-28 text-center font-sans"
        dir="rtl"
        style={{
          backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `,
          backgroundSize: "40px 40px",
        }}
      >
        {/* Badge Button */}
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[#FF6100]/30 bg-[#FF6100]/10 px-4 py-1.5 text-xs text-[#FF6100]">
          <span className="h-1.5 w-1.5 rounded-full bg-[#FF6100]"></span>
          <FiBookOpen size={14} />
          <span>مدونتنا</span>
        </div>

        {/* Main Title */}
        <h1 className="mb-4 text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl">
          استكشف <span className="text-[#FF6100]">مقالاتنا</span>
        </h1>

        {/* Subtitle */}
        <p className="max-w-2xl text-sm text-gray-400 sm:text-base">
          اكتشف الدروس والرؤى وأفضل الممارسات للتطوير الحديث
        </p>
      </div>
    </>
  )
}
