import React from 'react';
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import api from '../../services/api';
import { useEffect } from 'react';

function Authentication() {
    let history = useHistory();

    useEffect(() => {
        //Temporary logs out everytime this component renders for test purposes
        Cookies.remove('auth')
        Cookies.remove('email')
        Cookies.remove('_id')
        Cookies.remove('username')
        //--
    }, [])

    async function login(user){

        api.post('/session', {
            email: user.email,
            password: user.password
        })
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200 && response.data.token) {
                    Cookies.set('auth', response.data.token, { expires: 7 })
                    Cookies.set('email', response.data.user.email, { expires: 7 })
                    Cookies.set('_id', response.data.user._id, { expires: 7 })
                    Cookies.set('username', response.data.user.username, { expires: 7 })

                    history.push('/lobby')
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    async function handleLoginEvent(e) {
        e.preventDefault();

        login({
            'email':e.target.email,
            'password':e.target.password
        })
    }

    async function handleSignUp(e) {
        e.preventDefault();

        api.post('/user', {
            email: e.target.emailSignUp.value,
            password: e.target.passwordSignUp.value,
            username: e.target.username.value
        })
            .then(function (response) {
                console.log(response.data);
                if (response.status === 200) {
                    login(response.data)
                }
            })
            .catch(function (error) {
                console.log(error);
            });

    }

    return (
        <>
            <form onSubmit={handleLoginEvent} id='login-form'>
                <div className="input-block">
                    <label htmlFor="email">Email</label>
                    <input
                        name="email"
                        id="email"
                        required
                        type="email"
                    />
                    <label htmlFor="password">Password</label>
                    <input
                        name="password"
                        id="password"
                        required
                        type="password"
                    />
                </div>

                <button type="submit">Login</button>
            </form>
            <form onSubmit={handleSignUp} id='signup-form'>

                <div className="input-block">
                    <label htmlFor="emailSignUp">Email</label>
                    <input
                        name="emailSignUp"
                        id="emailSignUp"
                        required
                        type="email"
                    />
                    <label htmlFor="username">Username</label>
                    <input
                        name="username"
                        id="username"
                        required
                        type="text"
                    />
                    <label htmlFor="passwordSignUp">Password</label>
                    <input
                        name="passwordSignUp"
                        id="passwordSignUp"
                        required
                        type="password"
                    />
                </div>

                <button type="submit">Sign Up</button>
            </form>

        </>
    );
}

export default Authentication;