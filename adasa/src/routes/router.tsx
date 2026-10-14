import Layout from "@/myComponents/Layout"
import About from "@/pages/About"
import Blog from "@/pages/Blog"
import Home from "@/pages/Home"
import Privacy from "@/pages/Privacy"
import Terms from "@/pages/Terms"

import { createBrowserRouter } from "react-router"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { path: "/about", element: <About /> },
      { path: "/blog", element: <Blog /> },
      { path: "/", element: <Home /> },
      { path: "/privacy", element: <Privacy /> },
      { path: "/terms", element: <Terms /> },
    ],
  },
])

export default router
