import Link from "next/link"
import ImageCreator from "../Utils/ImageCreator"

const ProfileComponent = ({ userDetailData }) => {
  return (
    <div>
      <div>
        <div className="profile_component_bg">
          <ImageCreator productImageName="User Profile" />
        </div>
        <div className="profile_component_user_detail_bg">
          <div className="space-x-4">
            Seller State: <span className="font-normal">{userDetailData.data.seller_state}</span>
          </div>
          <div className="space-x-4">
            Seller State: <span className="font-normal">{userDetailData.data.seller_city}</span>
          </div>
          <Link href="/profile/edit-profile">
            <button className="profile_component_button">Edit Profile</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ProfileComponent
