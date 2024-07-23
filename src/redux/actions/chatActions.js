export const SEND_MESSAGE = 'SEND_MESSAGE';
export const RECEIVE_MESSAGE = 'RECEIVE_MESSAGE';
export const SET_LOADING = 'SET_LOADING';
export const INITIALIZE_CHAT = 'INITIALIZE_CHAT';
export const RECEIVE_WEBSOCKET_MESSAGE = 'RECEIVE_WEBSOCKET_MESSAGE';

export const sendMessage = (message, id) => ({ type: SEND_MESSAGE, payload: {message: message, userId: id} });
export const receiveMessage = (message) => ({ type: RECEIVE_MESSAGE, payload: message });
export const setLoading = (isLoading) => ({ type: SET_LOADING, payload: isLoading });
export const initializeChat = () => ({ type: INITIALIZE_CHAT });
export const receiveWebSocketMessage = (message) => ({ type: RECEIVE_WEBSOCKET_MESSAGE, payload: message });