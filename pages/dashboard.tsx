
import Layout from '../components/layouts/Layout'
import { ApolloError, gql, useSubscription } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { isAuthenticated } from '../components/authentication'

export const getServerSideProps = isAuthenticated;

const dashboard = ({ getUsers }: any) => {

  const [data, setData] = useState({
    name: '',
    email: ''
  })

  const PUSHUSER = gql`
  query me{
    me{
      id
      name
    }
  }
  `;

  /*const { loading, error, data: dataQuery } = useQuery(PUSHUSER)

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;
*/

  return (


    <Layout titlePage={"Dashboard"}>
      <h1>Dashboard</h1>


      <div>
        {getUsers.map(() => (
          <div>
            <p>
              {getUsers.id}
            </p>
          </div>
        ))}
      </div>

      <button>Log out</button>
    </Layout>
  )
}



export default dashboard
