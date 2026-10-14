import { Link } from "react-router"
import { Lock, ChevronLeft } from "lucide-react"

export default function PrivacyHeader() {
  return (
    <>
      <section
        className="relative mt-23 overflow-hidden bg-[#111111] px-4 py-28 text-center font-sans"

        style={{
          backgroundImage: `
          linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
        `,
          backgroundSize: "40px 40px",
        }}
      >
        <div className="mx-auto flex max-w-4xl flex-col items-center">
          {/* Breadcrumb Navigation */}
          <div className="mb-6 flex items-center gap-2 text-sm text-gray-400">
            <Link to="/" className="transition-colors hover:text-[#FF6100]">
              الرئيسية
            </Link>
            <ChevronLeft size={14} className="text-gray-600" />
            <span className="text-[#FF6100]">سياسة الخصوصية</span>
          </div>

          {/* Lock Icon Box */}
          <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-[#FF6100]/30 bg-[#FF6100]/10 text-[#FF6100] shadow-lg">
            <Lock size={28} />
          </div>

          {/* Main Title */}
          <h1 className="mb-4 text-3xl font-extrabold text-white sm:text-5xl">
            سياسة الخصوصية
          </h1>

          {/* Last Updated Subtitle */}
          <p className="text-xs text-gray-500 sm:text-sm">
            آخر تحديث: 15 يناير 2026
          </p>
        </div>
      </section>
    </>
  )
}
