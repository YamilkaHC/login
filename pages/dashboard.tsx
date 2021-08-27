
import Layout from '../components/layouts/Layout'
import { useRouter } from 'next/router'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { isAuthenticated } from '../components/authentication'

export const getServerSideProps = isAuthenticated;

const dashboard = () => {

  const router = useRouter()

  const [data, setData] = useState({
    name: '',
    email: ''
  })

  const GETUSER = gql`
  query{
    me{
      id
      name
      email
    }
  }
  `;


  const LOGOUT = gql`
  mutation {
    LogOut
  }
  `;

  const { loading, error, data: dat }: any = useQuery(GETUSER)
  const [logout, { loading: loadingLogout, error: errorLogout }] = useMutation(LOGOUT, {
    onError: (e: ApolloError) => console.log({ e }),

    onCompleted: () => {
      router.reload();
    }
  })

  
  useEffect(() => {
    
    if(!dat) return;

    const { me: {  name, email } }: any = dat;


    setData({
      name,
      email
    })
  },[loading, dat])


  return (


    <Layout titlePage={"Dashboard"}>
      <h1>Dashboard</h1>
      <div>
        <div className="data">
          <h2>Name</h2>
          <p>
            {data.name}
          </p>
          <h2>Email</h2>
          <p>
            {data.email}
          </p>
        </div>
      </div>

      <br />
      <br />

      <button onClick={() => logout()} >Log out</button>
    </Layout>
  )
}



export default dashboard
