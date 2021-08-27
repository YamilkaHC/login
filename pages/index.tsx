import Layout from '../components/layouts/Layout'
import Form from '../components/Form'
import { isNotAuthenticated } from '../components/authentication'


export const getServerSideProps = isNotAuthenticated;

/**
 * Renders the Home page
 * @returns jXS Element
 */
const Home = () => {
  return (
    <>
      <Layout titlePage={"Login"}>
        <h1>log in</h1>
        <Form></Form>
      </Layout>
    </>
  )
}

export default Home
