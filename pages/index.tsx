import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layouts/Layout'
import Form from '../components/Form'
import { isNotAuthenticated } from '../components/authentication'


export const getServerSideProps = isNotAuthenticated;


const Home = () => {
  return (

    <>
    <Layout titlePage = {"Login"}>
      <h1>log in</h1>
      <Form></Form>
    </Layout>
    </>

  )
}

export default Home
