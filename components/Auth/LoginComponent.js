import MyInput from "@/components/Utils/Formik"
import { useLoginUserMutation } from "@/store/APIs/authApi"
import { Form, Formik } from "formik"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { BsEye, BsEyeSlash } from "react-icons/bs"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import * as Yup from "yup"

const LoginComponent = () => {
  const router = useRouter()
  const [showPassword, setShowPassword] = useState("password")
  const [loginUser] = useLoginUserMutation()
  const [isLoading, setIsLoading] = useState(false)

  // This function makes request to submit user credentials for authentication
  const MakeRequestToLogin = async (values) => {
    try {
      setIsLoading(true)
      const result = await loginUser(values)
      if (result?.error) {
        if (typeof result?.error?.data?.error === "string") {
          setIsLoading(false)
          return toast.warning(result?.error?.data?.error)
        } else {
          setIsLoading(false)
          return toast.warning(result?.error?.data?.error[0])
        }
      } else {
        router.push("/items")
      }
    } catch (err) {
      console.log(err)
      setIsLoading(false)
    }
  }

  // Validate user input
  const validation = Yup.object({
    username: Yup.string()
      .required("Username is required")
      .min(8, "Username must be at least 8 characters")
      .max(60, "Username must be max of 60 characters"),
    password: Yup.string()
      .required("Password is required")
      .min(4, "Password must be at least 5 characters")
      .max(10, "Password must be max of 10 characters"),
  })

  // Hide or show user password
  const showPasswordHandler = () => {
    if (showPassword === "password") setShowPassword("text")
    else setShowPassword("password")
  }

  return (
    <div className="auth_form_header">
      <p className="auth_form_header_text">Login to your account</p>

      <Formik
        initialValues={{ username: "", password: "" }}
        onSubmit={MakeRequestToLogin}
        validationSchema={validation}
      >
        {() => (
          <Form className="space-y-5">
            <div className="mt-5">
              <MyInput
                type="text"
                placeholder="Enter your username"
                className="auth_form"
                name="username"
                label="Username"
              />
            </div>
            <div className="relative">
              <div className="absolute right-4 top-12">
                <button type="button" onClick={showPasswordHandler} className="login_comp_show_password_button">
                  {showPassword === "password" && <BsEye className="text-gray-800" />}
                  {showPassword === "text" && <BsEyeSlash className="text-gray-800" />}
                </button>
              </div>
              <MyInput
                placeholder="Enter your password"
                type={showPassword}
                className="auth_form"
                name="password"
                label="Password"
              />
            </div>

            <div className="mt-8">
              <button type="submit" disabled={isLoading} className="authformbutton">
                {!isLoading ? <div className="my-4">Login</div> : <div className="login_comp_loading_spinner"></div>}
              </button>

              <Link href="/auth/login/#">
                <div className="login_comp_forgot_password">
                  <span className="mx-auto mt-2">Forgot Password?</span>
                </div>
              </Link>
              <div className="auth_question">
                <span>Don't have an account?</span>
                <span role="link" className="auth_switch">
                  <Link href="/auth/login/#">Register here</Link>
                </span>
              </div>
            </div>
          </Form>
        )}
      </Formik>
      <ToastContainer />
    </div>
  )
}

export default LoginComponent
