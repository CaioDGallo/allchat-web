import React from 'react';
import ChatForm from '../ChatForm';
import ChatMessages from '../ChatMessages';
import socketIOClient from 'socket.io-client';

import './styles.css';
import { Component } from 'react';

class ChatRoom extends Component {
    constructor(props) {
        super(props);

        this.sendMessage = this.sendMessage.bind(this)

        this.state = {
            socket: null,
            messages: [],
        };
    }

    componentDidMount() {
        var socket = socketIOClient("https://allchat-web.herokuapp.com")
        var instance = this;

        instance.setState({ 
            socket: socket,
            messages: [], 
        });

        socket.on('user_connection', (data) => {
            //console.log("connected websocket main component");
            socket.emit('message', data);
            instance.setMessages(data)
        });

        socket.on('message', (data) => {
            console.log('onmsg ' + data.message)
            
            instance.setMessages(data)
        });
    }

    setMessages(data){
        this.setState(state => ({ 
            socket: this.state.socket,
            messages: [...state.messages, data] 
        }))
    }

    sendMessage(messageObject) {
        this.setMessages(messageObject)
        this.state.socket.emit('message', messageObject)

        console.log('entered send message')
    }

    render() {
        return <>
            <div id='chat'>
                <ChatMessages messages={this.state.messages} />
                <ChatForm sendMessage={this.sendMessage} />
            </div>
        </>
    }
}

export default ChatRoom;