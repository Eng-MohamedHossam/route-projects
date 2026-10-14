import { Component } from "react"
import { Link } from "react-router"
import { FaXTwitter } from "react-icons/fa6"
import { FaLinkedin } from "react-icons/fa"
import { FaGithub } from "react-icons/fa"
import { FaYoutube } from "react-icons/fa"

export class Footer extends Component {
  render() {
    return (
      <>
        <div className="flex flex-col border-t pt-7 text-gray-600">
          <div className="flex justify-around">
            <div>
              <h2 className="mb-5 font-extrabold text-white">
                <span className="m-2 rounded-lg bg-[#FF6100] px-3 py-2 text-white">
                  {" "}
                  ع{" "}
                </span>
                عدسة
              </h2>
              <p>
                مدونة متخصصة في فن التصوير الفوتوغرافي،
                <br /> نشارك معكم أسرار المحترفين ونصائح عملية
                <br /> لتطوير مهاراتكم.
              </p>

              <div className="mt-4 flex gap-2.5">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-transform duration-300 hover:scale-125 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
                  <FaXTwitter size={18} />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-transform duration-300 hover:scale-125 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
                  <FaGithub size={18} />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-transform duration-300 hover:scale-125 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
                  <FaLinkedin size={18} />
                </div>

                <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-700 text-gray-400 transition-transform duration-300 hover:scale-125 hover:border-[#FF6100] hover:bg-[#FF6100] hover:text-white">
                  <FaYoutube size={18} />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="mb-5 flex items-center font-extrabold text-white before:ml-1 before:block before:h-1 before:w-6 before:rounded-full before:bg-[#ff6900] before:content-['']">
                استكشف
              </h2>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  الرئيسية
                </span>
              </Link>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/blog"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  المدونة
                </span>
              </Link>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/about"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  من نحن
                </span>
              </Link>
            </div>

            <div className="flex flex-col gap-y-2">
              <h2 className="mb-5 flex items-center font-extrabold text-white before:ml-1 before:block before:h-1 before:w-6 before:rounded-full before:bg-[#ff6900] before:content-['']">
                التصنيفات
              </h2>
              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/blog"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  إضاءة
                </span>
              </Link>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/blog"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  بورتريه
                </span>
              </Link>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/blog"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  مناظر طبيعية
                </span>
              </Link>

              <Link
                className="group flex items-center gap-2 transition-colors duration-300 hover:text-[#F66E13]"
                to="/blog"
              >
                <span className="opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                  ›
                </span>
                <span className="transition-transform duration-300 group-hover:-translate-x-1">
                  تقنيات
                </span>
              </Link>
            </div>

            <div>
              <h2 className="mb-5 flex items-center font-extrabold text-white before:ml-1 before:block before:h-1 before:w-6 before:rounded-full before:bg-[#ff6900] before:content-['']">
                ابقى على اطلاع
              </h2>
              <p>
                اشترك للحصول على أحدث المقالات <br /> والتحديثات.
              </p>
              <fieldset className="flex flex-col">
                <input
                  className="m-3 rounded-md border-2 border-gray-800 bg-stone-950 px-2.5 py-3 text-amber-50 outline-none focus:border-[#ff6900]"
                  type="text"
                  placeholder="أدخل بريدك الإلكتروني"
                />
                <button className="rounded-full bg-[#e8752d] py-3 font-bold text-white">
                  اشترك
                </button>
              </fieldset>
            </div>
          </div>

          <hr className="mt-9" />

          <div className="mx-auto flex w-5/6 justify-between py-4">
            <p className="">© 2026 عدسة. صنع بكل جميع الحقوق محفوظة.</p>

            <div className="flex">
              <Link className="ml-5 hover:text-[#F66E13]" to="/privacy">
                سياسة الخصوصية
              </Link>
              <Link className="hover:text-[#F66E13]" to="/terms">
                شروط الخدمة
              </Link>
            </div>
          </div>
        </div>
      </>
    )
  }
}

export default Footer
