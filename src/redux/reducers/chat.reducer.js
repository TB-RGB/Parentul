import { RECEIVE_MESSAGE, SET_LOADING } from "../actions/chatActions";

const chatReducer = (state = { messages: [], isLoading: false }, action) => {
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
    case SET_LOADING:
      return { ...state, isLoading: action.payload };
    default:
      return state;
  }
};

export default chatReducer;
