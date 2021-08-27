import Layout from '../components/layouts/Layout'
import SignInForm from '../components/SignInForm'
import { isNotAuthenticated } from '../components/authentication'


export const getServerSideProps = isNotAuthenticated;

/**
 * Renders the Sign In page
 * @returns jXS Element
 */
const signin = () => {

  return (

    <Layout titlePage={"Login"}>
      <h1>Register</h1>
      <SignInForm />
    </Layout>


  )
}

export default signin
