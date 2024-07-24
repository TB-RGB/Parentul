import { RECEIVE_MESSAGE, SET_LOADING, CONVERSATION_ENDED, SET_CURRENT_CONVERSATION_ID, CLEAR_MESSAGES } from "../actions/chatActions";

const chatReducer = (state = { messages: [], isLoading: false, currentConversationId: null }, action) => {
  switch (action.type) {
    case RECEIVE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            sender: action.payload.sender,
            content: action.payload.content,
          },
        ],
      };
    case CLEAR_MESSAGES:
        return { ...state, messages: [] };
    case SET_CURRENT_CONVERSATION_ID:
        return { ...state, currentConversationId: action.payload };
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    case CONVERSATION_ENDED:
      return { ...state, currentConversationId: null };
    default:
      return state;
  }
};

export default chatReducer;
