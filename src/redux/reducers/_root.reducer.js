import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import chat from './chat.reducer';
import history from './chatHistory.reducer';
import firstTimeSetupReducer from './firsttimesetup.reducer';
import familyReducer from './family.reducer';
import preferences from './preferences.reducer';
import faqReducer from './faq.reducer';
import redirectionReducer from './redirection.reducer';


// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  chat, // will have an array of messages
  history, // will have an array of conversations and a log of messages
  firstTimeSetupReducer,
  familyReducer,
  preferences, // will have an array of user preferences
  faqReducer,
  redirectionReducer

});

export default rootReducer;
