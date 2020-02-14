import React, { Component } from 'react';
import ChatForm from '../ChatForm';

class WebSocketComponent extends Component {
    constructor(props) {
        super(props);

        this.setMessages = this.setMessages.bind(this)

        this.state = {
            ws: null,
            messages: [],
        };
    }

    // single websocket instance for the own application and constantly trying to reconnect.
    componentDidMount() {
        //this.connect();
    }

    timeout = 250; // Initial timeout duration as a class variable

    /**
     * @function connect
     * This function establishes the connect with the websocket and also ensures constant reconnection if connection closes
     */
    connect = (userValue) => {
        var ws = new WebSocket("wss://pure-bastion-70060.herokuapp.com/");
        //var ws = new WebSocket("ws://localhost:3000");
        let that = this; // cache the this
        var connectInterval;

        // websocket onopen event listener
        ws.onopen = () => {
            console.log("connected websocket main component");

            var messageObject = JSON.stringify({
                'message': userValue +' has joined chat ...',
                'id': Math.random(),
            })

            ws.send(messageObject);

            this.setState({ 
                ws: ws,
                messages: [], 
            });

            that.timeout = 250; // reset timer to 250 on open of websocket connection 
            clearTimeout(connectInterval); // clear Interval on on open of websocket connection
        };

        // websocket onclose event listener
        ws.onclose = e => {
            console.log(
                `Socket is closed. Reconnect will be attempted in ${Math.min(
                    10000 / 1000,
                    (that.timeout + that.timeout) / 1000
                )} second.`,
                e.reason
            );

            that.timeout = that.timeout + that.timeout; //increment retry interval
            connectInterval = setTimeout(this.check, Math.min(10000, that.timeout)); //call check function after timeout
        };

        ws.onmessage = function (event) {
            console.log('onmsg' + event.data)

            that.setState(state => ({ 
                ws: ws,
                messages: [...state.messages, JSON.parse(event.data)] 
            }))
        };

        // websocket onerror event listener
        ws.onerror = err => {
            console.error(
                "Socket encountered error: ",
                err.message,
                "Closing socket"
            );

            ws.close();
        };
    };        

    setMessages(data){
        this.setState(state => ({ 
            ws: this.state.ws,
            messages: [...state.messages, data] 
        }))
    }

    /**
     * utilited by the @function connect to check if the connection is close, if so attempts to reconnect
     */
    check = () => {
        const { ws } = this.state;
        if (!ws || ws.readyState === WebSocket.CLOSED) this.connect(); //check if websocket instance is closed, if so call `connect` function.
    };

    render() {
        return <ChatForm websocket={this.state.ws} messages={this.state.messages} setMessages={this.setMessages} connect={this.connect} />;
    }
}

export default WebSocketComponent;
