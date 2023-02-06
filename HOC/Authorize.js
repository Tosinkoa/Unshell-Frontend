import Loading from "@/components/Utils/Loading"
import { useGetAuthQuery } from "@/store/APIs/User/authApi"
import { useRouter } from "next/router"
import { useEffect } from "react"

const AuthorizedHOC = (ChildComponent) => {
  const ComposeComponentChildFunc = (props) => {
    const router = useRouter()
    const authResult = useGetAuthQuery()

    useEffect(() => {
      if (authResult.isError && authResult.status === "rejected" && !authResult.isSuccess) {
        router.push("/auth/login")
      }
    }, [authResult])
    return (
      <div>
        {authResult.isLoading ? (
          <div>
            <h1 className="sr-only">Blank</h1>
            <Loading />
          </div>
        ) : (
          !authResult.isError &&
          !authResult.isFetching &&
          authResult.isSuccess &&
          !authResult.isUninitialized && <ChildComponent {...props} />
        )}
      </div>
    )
  }
  return ComposeComponentChildFunc
}

export default AuthorizedHOC
