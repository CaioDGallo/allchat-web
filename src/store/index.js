import { createStore } from 'redux';
import socketIOClient from 'socket.io-client';

const INITIAL_STATE = {
  socket: null,
};

function socketIO(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_SOCKET':
        console.log('ENTERED START')
      return { ...state, socket: socketIOClient(action.address) };
    default:
      return state;
  }
}

const store = createStore(socketIO);

export default store;