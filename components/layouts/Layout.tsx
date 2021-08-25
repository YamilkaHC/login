import type { NextPage } from 'next'
import React from 'react'
import Head from 'next/head'
import Script from 'next/script'


interface dataLayout {
    children: React.ReactNode;
    titlePage: string;
}

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
