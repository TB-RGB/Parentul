const preferencesReducer = (state = { userPreferences: [] }, action) => {
    switch (action.type) {
        case 'SET_USER_PREFERENCES':
            return { ...state, userPreferences: action.payload };
        default:
            return state;
    }
}

export default preferencesReducer;