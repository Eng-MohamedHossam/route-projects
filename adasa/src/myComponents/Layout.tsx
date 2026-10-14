import { Outlet } from "react-router"
import { MyNavbar } from "./MyNavbar"
import MyFooter from "./MyFooter"

export default function Layout() {
  return (
    <>
      <MyNavbar />

      <Outlet />

      <MyFooter />
    </>
  )
}
