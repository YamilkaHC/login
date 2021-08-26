
import Layout from '../components/layouts/Layout'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useState } from 'react';
import { useQuery } from '@apollo/client';

import { isAuthenticated } from '../components/authentication'

export const getServerSideProps = isAuthenticated;

const dashboard = (props: any) => {

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

  const GETUSERS = gql`
  query{
    getUsers{
      id
      name
      email
    }
  }
  `;

  function getUsers({  }) {
    const { loading: loadin, error: erro, data } = useQuery(GETUSERS);
 
    if (loadin) return 'Loading...';
    if (erro) return `Error! ${erro.message}`;
  }

  const { loading, error, data: dataQuery } = useQuery(PUSHUSER)

 

  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  const [id, name]: any = dataQuery



  return (


    <Layout titlePage={"Dashboard"}>
      <h1>Dashboard</h1>
      <h2>{name}</h2>

      
      <button>Log out</button>
    </Layout>


  )


}


export default dashboard
