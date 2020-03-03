import React, { Component } from 'react';
import ChatForm from '../ChatForm';
import ChatMessages from '../ChatMessages';
import socketIOClient from 'socket.io-client';

import './styles.css';

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
        var socket = socketIOClient("https://pure-bastion-70060.herokuapp.com")
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

    setMessages(data) {
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
            <main>
                <div id='chat'>
                    <ChatMessages messages={this.state.messages} />
                    <ChatForm sendMessage={this.sendMessage} />
                </div>
            </main>
        </>
    }
}

export default ChatRoom;

// function ChatRoom() {
//     const [messages, setMessages] = useState([])
//     const [socket, setSocket] = useState(null)

//     useEffect(() => {
//         async function setupWebSocket() {
//             var socket = socketIOClient("https://pure-bastion-70060.herokuapp.com")

//             setSocket(socket)

//             socket.on('user_connection', (data) => {
//                 //console.log("connected websocket main component");
//                 socket.emit('message', data);
//                 setMessages(data)
//             });

//             socket.on('message', (data) => {
//                 console.log('onmsg ' + data.message)

//                 setMessages(data)
//             });
//         }

//         setupWebSocket()
//     }, [])

//     function sendMessage(messageObject) {
//         setMessages([...messages, messageObject])
//         socket.emit('message', messageObject)

//         console.log('entered send message')
//     }

//     return (
//         <>
//             <div id='chat'>
//                 <ChatMessages messages={messages} />
//                 <ChatForm sendMessage={sendMessage} />
//             </div>
//         </>
//     );
// }