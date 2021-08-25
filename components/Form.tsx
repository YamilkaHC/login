import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { gql } from "@apollo/client";
import client from "../apollo-client";
import {ApolloClient, InMemoryCache, ApolloProvider, useQuery, useMutation} from "@apollo/client";



const Form: any = () => {

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const [alert, setalert] = useState({
        state: 'no-alert',
        message: ''
    })

    const validation = (email: any, password: any) => {
        const re = /\S+@\S+\.\S+/;

        console.log(email, password)

        if (email == '' || password == '') {

            setalert({
                state: 'alert',
                message: 'complet all inputs'
            })
            return
        }
        if (!(re.test(email))) {
            setalert({
                state: 'alert',
                message: 'incorrect email'
            })
            return
        }
    }

    const handleSubmit = (e: any) => {

        e.preventDefault();

        validation(data.email, data.password)



    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        })


    }



    return (
      
            <div className="wrapper fadeInDown">
                <div id="formContent">


                    <form onSubmit={(e) => handleSubmit(e)}>

                        <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={e => handleChange(e)} />
                        <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={e => handleChange(e)} />
                        <p className={alert.state}>{alert.message}</p>
                        <input type="submit" className="fadeIn fourth" value="LogIn" />

                        <p>You dont have an account?
                            <Link href="/signin">
                                <a> Sing In</a>
                            </Link></p>
                    </form>
                </div>
            </div>

      
    )
}


export default Form