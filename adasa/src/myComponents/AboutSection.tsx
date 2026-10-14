import { FaNewspaper, FaPenNib } from "react-icons/fa"
import { BiSolidBookOpen } from "react-icons/bi"
import { HiOutlineUserGroup } from "react-icons/hi2"

const stats = [
  {
    value: "2+ مليون",
    label: "قارئ شهريًا",
    icon: HiOutlineUserGroup,
  },
  {
    value: "500+",
    label: "مقالة منشورة",
    icon: FaNewspaper,
  },
  {
    value: "50+",
    label: "كاتب خبير",
    icon: FaPenNib,
  },
  {
    value: "15+",
    label: "تصنيف",
    icon: BiSolidBookOpen,
  },
]

export default function AboutSection() {
  return (
    <section
      dir="rtl"
      className="relative mt-23 overflow-hidden bg-[#0b0b0b] px-4 py-16 text-white sm:px-6 sm:py-20 lg:py-24"
      style={{
        backgroundImage: `
          linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px),
          linear-gradient(90deg, rgba(255,255,255,0.055) 1px, transparent 1px)
        `,
        backgroundSize: "78px 78px",
      }}
    >
      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <div className="mx-auto max-w-5xl text-center">
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-[#f97316]/40 bg-[#f97316]/10 px-5 py-2 text-base font-medium text-[#f97316]">
            <span>من نحن</span>
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#f97316]" />
            </span>
          </div>

          <h2 className="text-3xl leading-relaxed font-extrabold sm:text-4xl md:text-5xl lg:text-6xl">
            مهمتنا هي{" "}
            <span className="bg-linear-to-l from-[#fbbf24] to-[#ed8732] bg-clip-text text-transparent">
              الإعلام والإلهام
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-5xl text-base leading-8 text-gray-400 sm:text-lg sm:leading-9 md:text-xl">
            مدونة متخصصة في فن التصوير الفوتوغرافي، نشارك معكم أسرار المحترفين
            ونصائح عملية لتطوير مهاراتكم. نحن شغوفون بمشاركة المعرفة ومساعدة
            المصورين على تنمية مهاراتهم من خلال محتوى عالي الجودة.
          </p>
        </div>

        {/* Statistics */}
        <div className="mx-auto mt-12 grid max-w-5xl grid-cols-1 gap-4 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((stat) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className="group flex min-h-44 flex-col items-center justify-center rounded-[30px] border border-white/10 bg-[#151515]/95 px-5 py-7 transition-all duration-300 hover:-translate-y-2 hover:border-[#f97316]/40 hover:bg-[#191919] hover:shadow-xl hover:shadow-orange-500/5"
              >
                <Icon
                  size={32}
                  className="mb-3 text-[#f97316] transition-transform duration-300 group-hover:scale-110"
                />

                <h3 className="text-2xl font-extrabold text-[#f5a742] sm:text-3xl">
                  {stat.value}
                </h3>

                <p className="mt-2 text-sm text-gray-500 sm:text-base">
                  {stat.label}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
