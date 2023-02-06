import Layout from "@/components/Helper/Layout"
import ProfileForm from "@/components/Profile/ProfileForm"
import Loading from "@/components/Utils/Loading"
import { useGetUserDetailQuery } from "@/store/APIs/userApi"

const EditProfile = () => {
  const { data: userDetailData, isLoading: userDetailDataIsLoading } = useGetUserDetailQuery()

  const profileFormData = {
    seller_state: userDetailData?.data?.seller_state ?? "",
    seller_city: userDetailData?.data?.seller_city ?? "",
  }

  return (
    <Layout>
      {userDetailDataIsLoading && <Loading />}
      {!userDetailDataIsLoading && <ProfileForm profileFormData={profileFormData} />}
    </Layout>
  )
}

export default EditProfile
