import { combineReducers } from 'redux';

// loginMessage holds the string that will display
// on the login screen if there's an error
const family = (state = {parent:[], children:[]}, action) => {
  switch (action.type) {
    //FETCH_FAMILY will just return the state without processing it
    case 'FETCH_FAMILY':
      return state;

      //reducer will have to deconstruct and parse data from the saga
    case 'SET_FAMILY':
      let toReturn = action.payload;
      return ;

    case 'UNSET_FAMILY':
      return null;

    default:
      return state;
  }
};



// make one object that has keys loginMessage, registrationMessage
// these will be on the redux state at:
// state.errors.loginMessage and state.errors.registrationMessage
export default combineReducers({
  family,
  registrationMessage,
});
