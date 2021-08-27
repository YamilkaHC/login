import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {useApollo} from '../apollo-client'
import { ApolloClient, ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
 
  const apolloClient = useApollo(pageProps.initialApolloState, "http://localhost:4000/graphql");
 
  return (
    <ApolloProvider client= {apolloClient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
