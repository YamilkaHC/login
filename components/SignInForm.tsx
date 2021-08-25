import React from 'react'
import { useState } from 'react'
import { ApolloError, gql } from "@apollo/client";
// import client from "../apollo-client";
import { useMutation } from "@apollo/client";




const SignInForm: any = () => {

    const PUSHUSER = gql`
        mutation pushUser($text: String!) {
            pushUser(text: $text) {
                id
                text
            }
        }
`;
    const [Udata, setData] = useState({
        name: '',
        email: '',
        password: ''
    })
    const [alert, setalert] = useState({
        state: 'no-alert',
        message: ''
    })


    const [pushUser, {  loading }] = useMutation(PUSHUSER, {
        variables: { name: Udata.name, email: Udata.email, password: Udata.password },
        onError: (e: ApolloError) => console.log({ e }),
        onCompleted: () => console.log('success')
    }
    );

    const validation = (name: any, email: any, password: any) => {
        const re = /\S+@\S+\.\S+/;

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

        pushUser();


    }


    const handleSubmit = (e: any) => {

        e.preventDefault();

        validation(Udata.name, Udata.email, Udata.password)

    }

    const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
        setData({
            ...Udata,
            [e.currentTarget.name]: e.currentTarget.value
        })


    }

    if (loading) return 'Submitting...';

    return (

        <div className="wrapper fadeInDown">
            <div id="formContent">


                <form onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmit(e);
                    
                }}>
                    <input type="text" id="name" className="fadeIn second" name="name" placeholder="name" onChange={e => handleChange(e)} />
                    <input type="text" id="login" className="fadeIn second" name="email" placeholder="email" onChange={e => handleChange(e)} />
                    <input type="text" id="password" className="fadeIn third" name="password" placeholder="password" onChange={e => handleChange(e)} />
                    <p className={alert.state}>{alert.message}</p>
                    <input type="submit" className="fadeIn fourth" value="Sign In" />
                </form>
            </div>
        </div>


    )
}



export default SignInForm