import Loading from "@/components/Utils/Loading"
import { useGetAuthQuery } from "@/store/APIs/authApi"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"

const AlreadyAuthorizedHOC = (ChildComponent) => {
  const ComposeComponentChildFunc = (props) => {
    const router = useRouter()
    const result = useGetAuthQuery()
    const [pushToAuth, setPushToAuth] = useState(false)
    const { isLoading, isError } = result

    useEffect(() => {
      if (router.pathname === "/auth/login" && !result.isError && result.isSuccess && !result.isFetching) {
        router.push("/items")
      }
    }, [result, router])

    useEffect(() => {
      if (isError) setPushToAuth(true)
    }, [result])

    return (
      <div>
        {pushToAuth && <ChildComponent {...props} />}
        {isLoading && (
          <div>
            <h1 className="sr-only">Blank</h1>
            <Loading />
          </div>
        )}
      </div>
    )
  }
  return ComposeComponentChildFunc
}

export default AlreadyAuthorizedHOC
