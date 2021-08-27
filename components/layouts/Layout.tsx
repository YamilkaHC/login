import React from 'react'
import Head from 'next/head'


/* the interface is to create a new data type*/
interface dataLayout {
    children: React.ReactNode;/*ReactNode is used because into Layout will be html elements*/ 
    titlePage: string;
}

/**
 * This is atemplete to create pages
 * @returns jXS Element
 */
const Layout = ({ children, titlePage }: dataLayout) => {


    return (

        <>
            <Head>
                <title>{titlePage}</title>
                <link href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css" rel="stylesheet" id="bootstrap-css"/>
                <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"/>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"/> 
            </Head>
            {children}
        </>

    )
}

export default Layout;
