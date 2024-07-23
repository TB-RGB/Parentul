import { io }from 'socket.io-client';
import store from '../redux/store';
import { receiveWebSocketMessage } from '../redux/actions/chatActions';

let socket;

export const initializeWebSocket = () => {
  socket = io('http://localhost:3000'), {
    transports: ['websocket', 'polling'],
  };

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
  });

  socket.on('connect_error', (error) => {
    console.log('Error connecting to WebSocket server:', error);
  });
   

  socket.on('message', (message) => {
    store.dispatch(receiveWebSocketMessage({ sender: 'ai', content: message }));
  });

  return socket;
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.connected) {
    socket.emit('message', message);
  } else {
    console.log('WebSocket is not connected. Message not sent:', message);
  }
};