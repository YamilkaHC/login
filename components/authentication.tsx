import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
const cookie = require('cookie');

/**
 * Checks authentication on regular pages
 * @param {GetServerSidePropsContext<ParsedUrlQuery>} ctx App context
 * @returns Props
 */
const isAuthenticated: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    const {req: {headers: { cookie: cookies }}} = await ctx;
    
    if(!cookie.parse(`${cookies}`).hasOwnProperty('auth'))
    return{
        redirect: {
            destination: '/',
            permanent: false
        }
    }
    
    return {props: {}};
}

/**
 * Checks authentication on auth pages
 * @param {GetServerSidePropsContext<ParsedUrlQuery>} ctx App context
 * @returns props
 */
const isNotAuthenticated: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    
    const forbidden = ['/signin','/'];

    console.log({forbidden})
    
    const {req: {url}, req: {headers: { cookie: cookies }}} = await ctx;

    if(forbidden.includes(String(url)) && cookie.parse(`${cookies}`).hasOwnProperty('auth'))
    return{
        redirect: {
            destination: '/dashboard',
            permanent: false
        }
    }
    
    return{props: {}}
}

export { isAuthenticated, isNotAuthenticated }