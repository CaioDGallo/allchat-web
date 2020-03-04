import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import ChatLobby from '../ChatLobby';
import Authentication from '../Authentication';

import PrivateRoute from '../PrivateRoute';

function ApplicationRoutes() {
    return (
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
    );
}

export default ApplicationRoutes;