import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import ChatRoom from '../ChatRoom';
import ChatLobby from '../ChatLobby';

function ApplicationRoutes() {
    return (
        <BrowserRouter>
            <Route exact path="/">
                <ChatLobby />
            </ Route>
            <Route path="/chatroom">
                <ChatRoom />
            </ Route>
        </ BrowserRouter>
    );
}

export default ApplicationRoutes;