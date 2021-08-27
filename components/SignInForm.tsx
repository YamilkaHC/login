import React from 'react'
import { useState } from 'react'
import { ApolloError, gql } from "@apollo/client";
import { useMutation } from "@apollo/client";
import Link from 'next/link'
import { useRouter } from 'next/router'



/**
 * Renders the SignInFom component
 * @returns jXS Element
 */
const SignInForm: any = () => {

    /* UseRouter is declaraded to redirector to another page*/
    const router = useRouter()

    /*This useState is used to save the user data from the form*/
    const [Udata, setData] = useState({
        name: '',
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
     * @param {any} name userName  
     * @param {any} email userEmail
     * @param {any} password userPassword
     * @returns void
     */
    const validation = (name: any, email: any, password: any) => {
        const re = /\S+@\S+\.\S+/;
        const number = /\d/;

        if (email == '' || password == '' || name == '') {

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
        if (password.length < 6) {
            setalert({
                state: 'alert',
                message: 'You need to have 6 caracters minumun'
            })
            return
        }
        if (!(/\d/.test(password))) {
            setalert({
                state: 'alert',
                message: 'You need include numbers in your password'
            })
            return
        }
        if (!(/[a-z]/.test(password))) {
            setalert({
                state: 'alert',
                message: 'You need include lowercase letter in your password'
            })
            return
        }
        if (!(/[A-Z]/.test(password))) {
            setalert({
                state: 'alert',
                message: 'You need include uppercase letter in your password'
            })
            return
        }

        if (!(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(password))) {
            setalert({
                state: 'alert',
                message: 'You need include symbols in your password'
            })
            return
        }

        pushUser();


    }

    /*OJO*/
    /*This is the mutation to send user data to API, this use the data useState*/
    const PUSHUSER = gql`
        mutation {
            register(
                data:{
                    name: "${Udata.name}", 
                    email: "${Udata.email}", 
                    password: "${Udata.password}"
                }) 
                {
              id
              name
              email
            }   
    }`;

    /*OJO*/
    /* */
    const [pushUser, { loading }] = useMutation(PUSHUSER, {
        variables: { name: Udata.name, email: Udata.email, password: Udata.password },
        onError: (e: ApolloError) => console.log({ e }),
        onCompleted: () => (console.log('success'), router.push('/'))
    }
    );

    if (loading) return 'Submitting...';
    redirectTo: '/login'

    /**
     * This was created because Enrique say "dont put these functions into the onSumit"
     * @param {any} e  React event
     */
    const handleSubmit = (e: any) => {

        e.preventDefault();

        validation(Udata.name, Udata.email, Udata.password)

    }

    /*OJO*/
    /**
     * This function is to set data after the user write anything
     * @param {React.FormEvent<HTMLInputElement>} e event form
     */
    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        /*I use ...Udata frist because is necesary into all data to the same time but, here I am introducing
         only 1 data*/
        setData({
            ...Udata,
            [e.currentTarget.name]: e.currentTarget.value
        })


    }

    return (
        <div className="wrapper fadeInDown">
            <div id="formContent">

                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                }}>
                    <input type="text" id="name" className="fadeIn second" name="name" placeholder="name" onChange={e => handleChange(e)} />
                    <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={e => handleChange(e)} />
                    <input type="password" id="password" className="fadeIn third" name="password" placeholder="password" onChange={e => handleChange(e)} />
                    <p className={alert.state}>{alert.message}</p>
                    <input type="submit" className="fadeIn fourth" value="Register" />
                    <p>Do you have an account?
                        <Link href="/">
                            <a> Log In</a>
                        </Link></p>
                </form>
            </div>
        </div>
    )
}



export default SignInForm