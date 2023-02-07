import Head from "next/head"
import { useState } from "react"
import "react-toastify/dist/ReactToastify.css"
import NavBar from "./Navbar"
import SideBar from "./Sidebar"

const Layout = ({ title, keywords, description, children, dontShowNavbarOrNotification }) => {
  const [showSideBar, setSideBar] = useState(false)

  const sideBarHandler = () => setSideBar(!showSideBar)

  return (
    <>
      <Head>
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />

        <title>{title}</title>
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="Story" />
        <meta property="og:description" content="Story" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <link rel="icon" href="/favicon/favicon.ico" />
      </Head>
      <div className=" layout_bg">
        <SideBar sideBarHandler={sideBarHandler} showSideBar={showSideBar} />
        {!dontShowNavbarOrNotification && <NavBar sideBarHandler={sideBarHandler} />}
        <div className="layout_children">{children}</div>
      </div>
    </>
  )
}

export default Layout

Layout.defaultProps = {
  title: "Unshelled Assessment",
  description: "Unshelled Assessment",
  keywords: "Unshelled Assessment",
}
