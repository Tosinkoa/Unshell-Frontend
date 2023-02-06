import Layout from "@/components/Helper/Layout"
import ProfileComponent from "@/components/Profile/ProfileComponent"
import Loading from "@/components/Utils/Loading"
import { useGetUserDetailQuery } from "@/store/APIs/userApi"

const Profile = () => {
  const { data: userDetailData, isLoading: userDetailDataIsLoading } = useGetUserDetailQuery()
  return (
    <Layout>
      {userDetailDataIsLoading && <Loading />}
      {!userDetailDataIsLoading && <ProfileComponent userDetailData={userDetailData} />}
    </Layout>
  )
}

export default Profile
