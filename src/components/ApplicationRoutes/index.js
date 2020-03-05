import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import ChatLobby from '../ChatLobby';
import Authentication from '../Authentication';

import store from '../../store';

import PrivateRoute from '../PrivateRoute';

function ApplicationRoutes() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <Route exact path="/">
                    <Authentication />
                </ Route>
                <PrivateRoute path="/lobby">
                    <ChatLobby />
                </ PrivateRoute>
                <PrivateRoute path="/chatroom">
                    <ChatRoom />
                </ PrivateRoute>
            </ BrowserRouter>
        </Provider>
    );
}

export default ApplicationRoutes;