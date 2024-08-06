const historyReducer = (state = { conversations: [], log: [], feedbackError: null, }, action) => {
    switch (action.type) {
        case 'SET_CONVERSATIONS':
            return { ...state, conversations: action.payload };
        case 'SET_LOG':
            return { ...state, log: action.payload };
        case 'SET_FEEDBACK_ERROR':
            return { ...state, feedbackError: action.payload };
        case 'CLEAR_FEEDBACK_ERROR':
            return { ...state, feedbackError: null };
        default:
            return state;
    }
}

export default historyReducer;