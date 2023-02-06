import MyInput from "@/components/Utils/Formik"
import { useUpdateUserAccountMutation } from "@/store/APIs/userApi"
import { Form, Formik } from "formik"
import { useRouter } from "next/router"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Yup from "yup"
import ImageCreator from "../Utils/ImageCreator"

const ProfileForm = ({ profileFormData }) => {
  const router = useRouter()
  const [updateUserAccount] = useUpdateUserAccountMutation()

  // Validate user details
  const validation = Yup.object().shape({
    seller_state: Yup.string()
      .min(2, "Enter at least two character")
      .max(2, "Character must be a max of 2")
      .required("Seller state is required"),
    seller_city: Yup.string()
      .min(2, "Enter at least two character")
      .max(40, "Character must be a max of 40")
      .required("Seller city is required"),
  })

  // Initial state of user detail form
  const initialValues = {
    seller_state: profileFormData.seller_state,
    seller_city: profileFormData.seller_city,
  }

  // This function make request to update the user details
  const MakeRequestToUpdatePofile = async (values) => {
    const result = await updateUserAccount(values)
    console.log(result)
    if (result?.error) {
      if (typeof result?.error?.data?.error === "string") return toast.warning(result?.error?.data?.error)
      else return toast.warning(result?.error?.data?.error[0])
    } else {
      router.push("/profile")
    }
  }

  return (
    <div>
      <div className="profile_bg">
        <ImageCreator productImageName="User Profile" />
      </div>
      <div className="mt-4">
        <Formik validationSchema={validation} onSubmit={MakeRequestToUpdatePofile} initialValues={initialValues}>
          {() => (
            <Form className="profile_form_bg">
              <div className="space-y-1">
                <MyInput
                  className="profile_input"
                  type="text"
                  name="seller_city"
                  label="Seller City"
                  placeholder="Enter your city"
                />
              </div>
              <div className="space-y-1">
                <MyInput
                  className="profile_input"
                  type="text"
                  label="Seller State"
                  name="seller_state"
                  placeholder="Enter your state"
                />
              </div>
              <button type="submit" className="profile_form_button">
                Save
              </button>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </div>
  )
}

export default ProfileForm
