import React from 'react'
import { useState } from 'react'
import Link from 'next/link'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { useRouter } from 'next/router'

/**
 * Renders the Fom component
 * @returns jXS Element
 */
const Form: any = () => {

    /* UseRouter is declaraded to redirector to another page*/
    const router = useRouter()

    /*This useState is used to save the user data from the form*/
    const [data, setData] = useState({
        email: '',
        password: ''
    })

    /*This use state is to alert user about any error, this is uses in <p> classname,
    its initial state is no-alert and this change into validation function */
    const [alert, setalert] = useState({
        state: 'no-alert',
        message: ''
    })

    /**
     * this is the data validation, here I use Setalert to change the state 
     * @param {any} email userEmail 
     * @param {any} password userPassword
     * @returns void
     */
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

    /*OJO*/
    /*This is the mutation to send user data to API, this use the data useState*/
    const PUSHUSER = gql`
        mutation {
            login(email: "${data.email}", password: "${data.password}"){
                id
            }
        }
    `;

    /*OJO*/
    /* */
    const [pushUser, { loading }] = useMutation(PUSHUSER, {

        variables: { email: data.email, password: data.password },

        onError: (e: ApolloError) => console.log({ e }),
        onCompleted: () => {
            router.reload();
        }
    });
    if (loading) return 'Submitting...';

    /**
     * This was created because Enrique say "dont put these functions into the onSumit"
     * @param {any} e  React event
     */
    const handleSubmit = (e: any) => {

        e.preventDefault();

        validation(data.email, data.password)
    }

    /*OJO*/
    /**
     * This function is to set data after the user write anything
     * @param {React.FormEvent<HTMLInputElement>} e event form
     */
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setData({
            ...data,
            [e.currentTarget.name]: e.currentTarget.value
        })


    }

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