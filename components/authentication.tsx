import { GetServerSideProps, GetServerSidePropsContext } from "next";
import { ParsedUrlQuery } from "querystring";
const cookie = require('cookie');
/*OJO!!! I need to import cookie library --> npm install cookie */


/**
 * Checks authentication on regular pages
 * @param {GetServerSidePropsContext<ParsedUrlQuery>} ctx App context
 * @returns Props
 */
const isAuthenticated: GetServerSideProps = async (ctx: GetServerSidePropsContext<ParsedUrlQuery>) => {
    /*Here we are destructuring the contex to get cookies */
    const {req: {headers: { cookie: cookies }}} = await ctx;
    
    /*if cookies dont have OwnProperty, redirect to a regular page*/
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
    
    /*There is the page that a user cannot enter if has a sesion*/
    const forbidden = ['/signin','/'];

    console.log({forbidden})

    /*Here we are destructuring the contex to get cookies */
    const {req: {url}, req: {headers: { cookie: cookies }}} = await ctx;

    /*if the pages that a user cannot enter if has a sesion has the Ownproperty redirect to the dashboard */
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


/*
If i want to use these functions, I need to import it and use the second line.
isAuthenticated function is used in pages with a session like [dashboard] and
isNotAuthenticated function is used in regular pages where the user dont need a session to be there.

import { isAuthenticated } from '../components/authentication'

export const getServerSideProps = isAuthenticated;
*/