export const SEND_MESSAGE = "SEND_MESSAGE";
export const RECEIVE_MESSAGE = "RECEIVE_MESSAGE";
export const SET_LOADING = "SET_LOADING";
export const INITIALIZE_CHAT = "INITIALIZE_CHAT";
export const RECEIVE_WEBSOCKET_MESSAGE = "RECEIVE_WEBSOCKET_MESSAGE";
export const END_CONVERSATION = "END_CONVERSATION";
export const CONVERSATION_ENDED = "CONVERSATION_ENDED";
export const SET_CURRENT_CONVERSATION_ID = "SET_CURRENT_CONVERSATION_ID";
export const CLEAR_MESSAGES = "CLEAR_MESSAGES";
export const RECEIVE_MESSAGES_ARRAY = "RECEIVE_MESSAGES_ARRAY";

export const sendMessage = (message, id) => ({
  type: SEND_MESSAGE,
  payload: { message: message, userId: id },
});
export const receiveMessage = (message) => ({
  type: RECEIVE_MESSAGE,
  payload: message,
});
export const setLoading = (isLoading) => ({
  type: SET_LOADING,
  payload: isLoading,
});
export const initializeChat = () => ({ type: INITIALIZE_CHAT });
export const receiveWebSocketMessage = (message) => ({
  type: RECEIVE_WEBSOCKET_MESSAGE,
  payload: message,
});
export const endConversation = (conversationId) => ({
  type: END_CONVERSATION,
  payload: conversationId,
});
export const conversationEnded = () => ({ type: CONVERSATION_ENDED });
export const setCurrentConversationId = (conversationId) => ({
  type: SET_CURRENT_CONVERSATION_ID,
  payload: conversationId,
});
export const clearMessages = () => ({ type: CLEAR_MESSAGES });
export const receiveMessagesArray = (sender, messages) => ({
  type: RECEIVE_MESSAGES_ARRAY,
  payload: { sender, messages },
});
