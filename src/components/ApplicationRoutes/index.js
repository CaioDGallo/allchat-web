import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import ChatLobby from '../ChatLobby';
import Authentication from '../Authentication';

import store from '../../store';

import PrivateRoute from '../PrivateRoute';
import ChatRoute from '../ChatRoute';
import AuthenticationRoute from '../AuthenticationRoute';

function ApplicationRoutes() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <AuthenticationRoute exact path="/">
                    <Authentication />
                </ AuthenticationRoute>
                <PrivateRoute path="/lobby">
                    <ChatLobby />
                </ PrivateRoute>
                <ChatRoute path="/chatroom">
                    <ChatRoom />
                </ ChatRoute>
            </ BrowserRouter>
        </Provider>
    );
}

export default ApplicationRoutes;