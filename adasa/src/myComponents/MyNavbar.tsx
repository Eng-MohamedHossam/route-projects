import { Component } from "react"
import { Link, NavLink } from "react-router"
import logo from "../assets/logo-GdqARQRt.png"
import { Search, Menu, X } from "lucide-react"

export class MyNavbar extends Component {
  state = {
    isOpen: false,
  }

  toggleMenu = () => {
    this.setState((prevState: { isOpen: boolean }) => ({
      isOpen: !prevState.isOpen,
    }))
  }

  render() {
    return (
      <>
        <nav
          className="fixed top-0 left-0 z-50 flex w-full items-center justify-between border-b border-b-gray-700 bg-[#0d0d0d]/90 px-6 py-4 text-gray-400 backdrop-blur-md lg:justify-around"
          dir="rtl"
        >
          {/* Logo on the Right */}
          <div className="logo">
            <Link to="/">
              <div className="flex items-center gap-x-2">
                <img
                  src={logo}
                  alt="Photography Logo"
                  className="h-11 w-auto transition-transform duration-500 hover:scale-110"
                />
                <div className="flex flex-col text-right">
                  <p className="text-xl text-white">عدسة</p>
                  <p className="text-xs text-amber-700">
                    عالم التصوير الفوتوغرافي
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="links hidden gap-8 rounded-full border border-gray-800 p-2 lg:flex">
            <div className="flex gap-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 ${
                    isActive
                      ? "bg-[#F66E13] text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                الرئيسية
              </NavLink>
              <NavLink
                to="/blog"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 ${
                    isActive
                      ? "bg-[#F66E13] text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                المدونة
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 ${
                    isActive
                      ? "bg-[#F66E13] text-white"
                      : "text-gray-400 hover:text-white"
                  }`
                }
              >
                من نحن
              </NavLink>
            </div>
          </div>

          {/* Desktop Actions */}
          <div className="hidden items-center lg:flex">
            <div className="mx-5 rounded-lg border border-transparent p-2 transition-all duration-300 hover:border-gray-600">
              <Search
                size={24}
                className="text-gray-600 transition-colors duration-300 hover:text-[#ff6900]"
              />
            </div>
            <Link to="/blog">
              <button className="rounded-full bg-[#F66E13] px-6 py-3 transition-transform duration-500 hover:-translate-y-1">
                <p className="font-semibold text-white">ابدأ القراءة</p>
              </button>
            </Link>
          </div>

          {/* Mobile Hamburger Button & Search */}
          <div className="flex items-center gap-3 lg:hidden">
            <div className="p-2">
              <Search
                size={22}
                className="text-gray-400 hover:text-[#ff6900]"
              />
            </div>
            <button
              onClick={this.toggleMenu}
              className="p-1 text-white focus:outline-none"
            >
              {this.state.isOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu Card (Not Fullscreen) */}
        {this.state.isOpen && (
          <div
            className="absolute top-20 right-4 left-4 z-50 flex flex-col gap-4 rounded-2xl border border-gray-800 bg-[#141414] p-6 shadow-2xl lg:hidden"
            dir="rtl"
          >
            <div className="flex flex-col gap-3">
              <NavLink
                to="/"
                onClick={this.toggleMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-center text-base transition-all ${
                    isActive
                      ? "border border-[#F66E13] bg-[#F66E13]/20 font-bold text-[#F66E13]"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                الرئيسية
              </NavLink>

              <NavLink
                to="/blog"
                onClick={this.toggleMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-center text-base transition-all ${
                    isActive
                      ? "border border-[#F66E13] bg-[#F66E13]/20 font-bold text-[#F66E13]"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                المدونة
              </NavLink>

              <NavLink
                to="/about"
                onClick={this.toggleMenu}
                className={({ isActive }) =>
                  `rounded-xl px-4 py-3 text-center text-base transition-all ${
                    isActive
                      ? "border border-[#F66E13] bg-[#F66E13]/20 font-bold text-[#F66E13]"
                      : "text-gray-300 hover:text-white"
                  }`
                }
              >
                من نحن
              </NavLink>
            </div>

            <Link to="/blog" onClick={this.toggleMenu} className="mt-2">
              <button className="w-full rounded-full bg-[#F66E13] py-3 shadow-lg transition-transform duration-300 hover:scale-[1.02]">
                <p className="font-semibold text-white">ابدأ القراءة</p>
              </button>
            </Link>
          </div>
        )}
      </>
    )
  }
}

export default MyNavbar
