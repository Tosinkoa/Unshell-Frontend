import AlreadyAuthorized from "@/HOC/AlreadyAuthorized"
import LoginComponent from "@/components/Auth/LoginComponent"
import Layout from "@/components/Helper/Layout"

function Login() {
  return (
    <Layout>
      <LoginComponent />
    </Layout>
  )
}

export default AlreadyAuthorized(Login)
