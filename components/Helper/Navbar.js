import { useGetAuthQuery } from "@/store/APIs/authApi"
import { useTheme } from "next-themes"
import Link from "next/link"
import { useEffect, useState } from "react"
import { AiOutlineMenu } from "react-icons/ai"
import { IoIosMoon } from "react-icons/io"
import { MdWbSunny } from "react-icons/md"

const Navbar = ({ sideBarHandler }) => {
  const result = useGetAuthQuery()
  const [showMyOrder, setShowMyOrder] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [showLogout, setShowLogout] = useState(false)
  const [showLogin, setShowLogin] = useState(true)

  useEffect(() => {
    if (result?.data === true && result.status === "fulfilled") {
      setShowMyOrder(true)
      setShowProfile(true)
      setShowSettings(true)
      setShowLogout(true)
      setShowLogin(false)
    }
  }, [result])

  // Theme Changing
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()
  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const navbarList = [
    { link: "/items", title: "My Order", shower: showMyOrder },
    { link: "/profile", title: "Profile", shower: showProfile },
    { link: "/profile/edit-profile", title: "Settings", shower: showSettings },
    { link: "/auth/logout", title: "Logout", shower: showLogout },
    { link: "/auth/login", title: "Login", shower: showLogin },
  ]
  return (
    <div className="navbar_bg">
      <div className="navbar_second_bg">
        <div className="navbar_third_bg">
          <Link href="/">
            <h1 className="navbar_logo">OL</h1>
          </Link>
          <div className="navbar_buttons_bg">
            <div className="navbar_list_bg">
              {navbarList.map((data) => (
                <div key={data.link}>
                  {data.shower && (
                    <Link href={data.link}>
                      <div className="navbar_list">{data.title}</div>
                    </Link>
                  )}
                </div>
              ))}
            </div>
            <div className="navbar_buttons_background" onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
              {theme === "light" ? <IoIosMoon /> : <MdWbSunny />}
            </div>
            <AiOutlineMenu className="cursor-pointer md:hidden" onClick={sideBarHandler} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
