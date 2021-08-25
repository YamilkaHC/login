import type { NextPage } from 'next'
import Head from 'next/head'
import Layout from '../components/layouts/Layout'
import SignInForm from '../components/SignInForm'



const signin = () => {
  return (

    
    <Layout titlePage = {"Login"}>
      <h1>Sign In</h1>
      <SignInForm/>
    </Layout>
 

  )
}


export default signin
