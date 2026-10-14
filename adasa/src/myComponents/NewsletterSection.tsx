import { Mail } from "lucide-react"

export default function NewsletterSection() {
  return (
    <section className="relative overflow-hidden bg-[#0A0A0A] px-4 py-24 text-center font-sans">
      <div className="mx-auto max-w-4xl">
        {/* Main Card Container */}
        <div className="relative flex flex-col items-center justify-center rounded-3xl border border-neutral-800 bg-[#161616] p-8 shadow-2xl sm:p-12">
          {/* Top Icon Box */}
          <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6100] text-white shadow-lg shadow-[#FF6100]/20">
            <Mail size={28} />
          </div>

          {/* Heading */}
          <h2 className="mb-3 text-2xl font-extrabold text-white sm:text-4xl">
            اشترك في <span className="text-[#FF6100]">نشرتنا الإخبارية</span>
          </h2>

          {/* Description */}
          <p className="mb-8 max-w-lg text-sm leading-relaxed text-gray-400 sm:text-base">
            احصل على نصائح التصوير الحصرية ودروس جديدة مباشرة في بريدك
            الإلكتروني
          </p>

          {/* Input & Button Form */}
          <div className="mb-8 flex w-full max-w-xl flex-col items-center gap-3 sm:flex-row">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="w-full rounded-full border border-neutral-800 bg-[#111111] px-6 py-3.5 text-sm text-white transition-colors outline-none focus:border-[#FF6100]"
            />
            <button className="w-full rounded-full bg-[#FF6100] px-8 py-3.5 font-bold whitespace-nowrap text-white shadow-md transition-transform duration-300 hover:scale-105 hover:bg-[#e05600] sm:w-auto">
              اشترك الآن
            </button>
          </div>

          {/* Footer Info (Avatars & Perks) */}
          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-white">إنضم لـ 10,000+</span>{" "}
              مصور
            </div>

            <span className="h-1 w-1 rounded-full bg-neutral-700"></span>
            <span>بدون إزعاج</span>

            <span className="h-1 w-1 rounded-full bg-neutral-700"></span>
            <span>إلغاء الاشتراك في أي وقت</span>

            {/* Overlapping Avatar Images (Using placeholders or real links) */}
            <div className="mr-2 flex items-center -space-x-2">
              <img
                className="h-6 w-6 rounded-full border border-neutral-800 object-cover"
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100"
                alt="user"
              />
              <img
                className="h-6 w-6 rounded-full border border-neutral-800 object-cover"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100"
                alt="user"
              />
              <img
                className="h-6 w-6 rounded-full border border-neutral-800 object-cover"
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
                alt="user"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
