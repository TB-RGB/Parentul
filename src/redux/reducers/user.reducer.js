const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload;
    case 'UNSET_USER':
      return {};
    case 'UPDATE_USER_SUCCESS':
      return {
        ...state,
        first_name: action.payload.first_name,
        last_name: action.payload.last_name
      };
    default:
      return state;
  }
};

export default userReducer;