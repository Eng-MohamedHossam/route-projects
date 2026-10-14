import { Link } from "react-router"
import { Mail } from "lucide-react"

export default function CallToActionSection() {
  return (
    <section className="bg-linear-to-b from-[#e8752d] to-[#f5a623] px-4 py-20 text-center font-sans">
      <div className="mx-auto flex max-w-4xl flex-col items-center">
        {/* Title */}
        <h2 className="mb-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">
          لديك أسئلة؟ دعنا نتحدث!
        </h2>

        {/* Description */}
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/90 sm:text-base">
          نحب أن نسمع منك. سواء كان لديك سؤال حول محتوانا، أو تريد المساهمة، أو
          تريد فقط إلقاء التحية، لا تتردد في التواصل.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Dark Filled Button with Icon */}
          <Link to="/contact">
            <button className="flex items-center gap-2 rounded-xl bg-neutral-950 px-8 py-3 font-semibold text-white shadow-lg transition-transform duration-300 hover:scale-105">
              <Mail size={18} />
              <span>تواصل معنا</span>
            </button>
          </Link>

          {/* Outline Button */}
          <Link to="/blog">
            <button className="rounded-xl border border-white/80 px-8 py-3 font-semibold text-white transition-all duration-300 hover:bg-white hover:text-black">
              تصفح المقالات
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}
