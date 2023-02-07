import { useGetAuthQuery } from "@/store/APIs/authApi"
import Link from "next/link"
import { useEffect, useState } from "react"
import { FaTimes } from "react-icons/fa"

const SideBar = ({ sideBarHandler, showSideBar }) => {
  const [showMyOrder, setShowMyOrder] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  const result = useGetAuthQuery()
  useEffect(() => {
    if (result?.data === true && result.status === "fulfilled") {
      setShowMyOrder(true)
      setShowProfile(true)
      setShowSettings(true)
      setShowLogout(true)
      setShowLogin(false)
    }
  }, [result])

  const navbarList = [
    { link: "/items", title: "My Order", shower: showMyOrder },
    { link: "/profile", title: "Profile", shower: showProfile },
    { link: "/profile/edit-profile", title: "Settings", shower: showSettings },
    { link: "/auth/logout", title: "Logout", shower: showLogout },
    { link: "/auth/login", title: "Login", shower: showLogin },
  ]

  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      {!showSideBar ? "" : <div onClick={sideBarHandler} className="backdrop"></div>}
      <div
        className={`dropdown_background ${
          showSideBar ? "translate-x-0" : "-translate-x-full"
        } animate ease-in-out duration-700 bg-inherit dark:bg-gray-900 dark:border-r border-gray-500 z-30`}
      >
        <div className="dropdown_header" onClick={sideBarHandler}>
          <FaTimes onClick={sideBarHandler} className="dropdown_close" />
        </div>

        {/* All sidebar list */}
        <div className="flex flex-col mt-16 space-y-3 ml-4">
          {navbarList.map((data) => (
            <div key={data.link}>
              {data.shower && (
                <Link href={data.link}>
                  <div className="sidebar_list" onClick={sideBarHandler}>
                    {data.title}
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SideBar
