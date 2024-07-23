import { io }from 'socket.io-client';
import store from '../redux/store';
import { receiveWebSocketMessage } from '../redux/actions/chatActions';



let socket;



export const initializeWebSocket = () => {
  socket = io('http://localhost:5001'), {
    transports: ['websocket', 'polling'],
  };

  socket.on('connect', () => {
    console.log('Connected to WebSocket server');
    console.log('Socket ID:', socket.id);
  });

  socket.on('connect_error', (error) => {
    console.log('Error connecting to WebSocket server:', error);
  });
   

  socket.on('message', (message) => {
    store.dispatch(receiveWebSocketMessage({ sender: 'ai', content: message }));
  });

  return socket;
};

export const sendWebSocketMessage = (message, id) => {
    console.log('Attempting to send WebSocket message', message);
    if (socket && socket.connected) {
      socket.emit('message', { text: message, userId: id }); // Replace 'someUserId' with actual user ID if available
      console.log('WebSocket message sent');
    } else {
      console.error('WebSocket is not connected. Message not sent:', message);
    }
  };