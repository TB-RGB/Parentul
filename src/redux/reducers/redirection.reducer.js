const redirectionReducer = (state = null, action) => {
    switch (action.type) {
      case 'REDIRECT_TO_CHAT':
        return '/chat';
      case 'CLEAR_REDIRECTION':
        return null;
      default:
        return state;
    }
  };
  
  export default redirectionReducer;