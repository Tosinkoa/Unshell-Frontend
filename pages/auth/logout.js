import Layout from "@/components/Helper/Layout"
import Loading from "@/components/Utils/Loading"
import { useLogoutUserMutation } from "@/store/APIs/authApi"
import { fetcherApi } from "@/store/fetcherApi"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useDispatch } from "react-redux"

const Logout = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [logoutUser] = useLogoutUserMutation()

  useEffect(() => {
    logoutUser()
    dispatch(fetcherApi.util.resetApiState())
    router.push("/auth/login")
  }, [router])

  return (
    <Layout dontShowNavbarOrNotification={true}>
      <h1 className="sr-only">Blank</h1>
      <Loading />
    </Layout>
  )
}

export default Logout
