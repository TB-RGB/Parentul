
const faqReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_FAQ':
            return action.payload
        default: 
            return state;
    }
}

export default faqReducer