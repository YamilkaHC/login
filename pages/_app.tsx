import '../styles/globals.css'
import type { AppProps } from 'next/app'
import apolloclient from '../apollo-client'
import { ApolloProvider } from "@apollo/client";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={apolloclient}>
      <Component {...pageProps} />
    </ApolloProvider>
  )
}
export default MyApp
