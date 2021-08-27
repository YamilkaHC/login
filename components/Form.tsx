import React from 'react'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router'


const Form: any = () => {

    const router = useRouter()

    const [data, setData] = useState({
        email: '',
        password: ''
    })

    const PUSHUSER = gql`
        mutation {
            login(email: "${data.email}", password: "${data.password}"){
                id
            }
        }
    `;

    const [pushUser, { loading }] = useMutation(PUSHUSER, {

        variables: { email: data.email, password: data.password },

        onError: (e: ApolloError) => console.log({ e }),
        onCompleted: () => {
            router.reload();
        }
    });

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
        pushUser();
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

    if (loading) return 'Submitting...';


    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">


                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e)
                }}>

                    <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={e => handleChange(e)} />
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={e => handleChange(e)} />
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