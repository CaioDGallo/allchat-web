import { createStore } from 'redux';
import socketIOClient from 'socket.io-client';

const INITIAL_STATE = {
  socket: null,
  messages: [],
  selectedUser: {},
  currentRoomId: ''
};

function socketIO(state = INITIAL_STATE, action) {
  switch (action.type) {
    case 'START_SOCKET':
      return { ...state, socket: socketIOClient(action.address) };
    case 'LOAD_MESSAGES':
      return { ...state, messages: action.messages };
    case 'STORE_MESSAGE':
      return { ...state, messages: [...state.messages, action.messages] };
    case 'STORE_SELECTED_USER':
      return { ...state, selectedUser: action.selectedUser };
    case 'STORE_ROOM_ID':
      return { ...state, currentRoomId: action.currentRoomId };
    default:
      return state;
  }
}

const store = createStore(socketIO);

export default store;