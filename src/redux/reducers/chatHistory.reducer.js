const historyReducer = (state = { conversations: [], log: [] }, action) => {
    switch (action.type) {
        case 'SET_CONVERSATIONS':
            return { ...state, conversations: action.payload };
        case 'SET_LOG':
            return { ...state, log: action.payload };
        default:
            return state;
    }
}

export default historyReducer;