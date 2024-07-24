const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SET_USER':
      // Check if payload is not undefined
      return {...state, ...action.payload};
    case 'UNSET_USER':
      return {};
    default:
      return state;
  }
};

export default userReducer;