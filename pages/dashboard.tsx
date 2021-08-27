
import Layout from '../components/layouts/Layout'
import { useRouter } from 'next/router'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { isAuthenticated } from '../components/authentication'

export const getServerSideProps = isAuthenticated;




/**
 * Renders the dashboard page
 * @returns jXS Element
 */
const dashboard = () => {

  /* UseRouter is declaraded to redirector to another page*/
  const router = useRouter()

  /*This useState is used to save the user data from the form*/
  const [data, setData] = useState({
    name: '',
    email: ''
  })

  /*OJO*/
  /*This is the query to recive user data to API*/
  const GETUSER = gql`
  query{
    me{
      id
      name
      email
    }
  }
  `;

  /*OJO*/
  /*This is the mutation to send log out to API*/
  const LOGOUT = gql`
  mutation {
    LogOut
  }
  `;

  /*OJO*/
  /**/
  const { loading, error, data: dat }: any = useQuery(GETUSER)

  /*OJO*/
  /**/
  const [logout, { loading: loadingLogout, error: errorLogout }] = useMutation(LOGOUT, {
    onError: (e: ApolloError) => console.log({ e }),
    onCompleted: () => { router.reload(); }
  })


  /*OJO*/
  /* useEffect is used because, the data cannot render in the page if there aren't data*/
  useEffect(() => {

    if (!dat) return;

    /*OJO */
    const { me: { name, email } }: any = dat;
    setData({
      name,
      email
    })
  }, [loading, dat])


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
