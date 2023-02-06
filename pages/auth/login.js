import AlreadyAuthorized from "@/HOC/AlreadyAuthorized"
import LoginComponent from "@/components/Auth/LoginComponent"
import Layout from "@/components/Helper/Layout"

function Login() {
  return (
    <Layout dontShowNavbarOrNotification={true}>
      <LoginComponent />
    </Layout>
  )
}

export default AlreadyAuthorized(Login)
