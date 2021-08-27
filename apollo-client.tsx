import { useMemo } from "react";
import { ApolloClient, createHttpLink, InMemoryCache, NormalizedCacheObject, } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from "@apollo/client/link/error";




let apolloClient: ApolloClient<NormalizedCacheObject> | null = null;


/**
 * this function create apollo client connection
 * @param {string} url 
 * @param {Object} headers 
 * @returns {ApolloClient<NormalizedCacheObject>} client
 */
export function createApolloClient(url: string, headers = {}) {

    /*create a httpLink with the API url */
    const httpLink = createHttpLink({ uri: url });

    /* */
    const errorLink = onError(({ graphQLErrors, networkError }) => {
        if (graphQLErrors)
            graphQLErrors.forEach(({ message, locations, path }) =>
                console.log(
                    `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
                ),
            );

        if (networkError) console.log(`[Network error]: ${networkError}`);
    });

    const authLink = setContext((_, { currentHeaders }) => {

        return {
            fetchOptions: {
                credentials: 'include'
            },
            headers: {
                ...currentHeaders,
                ...headers
            }
        }

    })

    const client = new ApolloClient({
        ssrMode: typeof window === "undefined",
        // link: authLink.concat(errorLink.concat(httpLink)),
        link: authLink.concat(errorLink.concat(httpLink)),
        cache: new InMemoryCache({
            addTypename: false
        })
    });

    return client;

}

/**
 * this function initialize apollo client
 * @param {Object} initialState 
 * @param {string} url 
 * @param {Object} headers 
 * @returns {ApolloClient<NormalizedCacheObject>} _apolloClient
 */
export function initializeApollo(initialState = {}, url: string, headers = {}) {
    const _apolloClient = apolloClient ?? createApolloClient(url, headers);

    if (initialState) {
        const existingCache = _apolloClient.extract();
        _apolloClient.cache.restore({ ...existingCache, ...initialState });
    }

    if (typeof window === "undefined") return _apolloClient;
    if (!apolloClient) apolloClient = _apolloClient;
    return _apolloClient;
}

/**
 * useApollo client hook
 * @param {any} pageProps 
 * @param {string} url 
 * @returns {ApolloClient<NormalizedCacheObject>} store
 */
export function useApollo(pageProps: any, url: string) {
    const store = useMemo(() => initializeApollo(pageProps, url), [pageProps])

    return store
}