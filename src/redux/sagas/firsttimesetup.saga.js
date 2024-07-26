import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

function* finalizeFirstTimeSetup() {
  try {
    

    // Select the firstTimeSetup state
    const firstTimeSetup = yield select(state => state.firstTimeSetupReducer);
    console.log('First Time Setup State:', firstTimeSetup);

    if (!firstTimeSetup) {
      throw new Error('First Time Setup data is not available');
    }

    const { firstName, lastName, children } = firstTimeSetup;
    const userId = yield select(state => state.user.id);

    // Update user profile
    yield call(axios.put, '/api/user', {
      id: userId,
      first_name: firstName,
      last_name: lastName
    });

    // Add children
    for (let child of children) {
      yield call(axios.post, '/api/child', {
        ...child,
        user_id: userId
      });
    }

    // Update user state
    yield put({ 
      type: 'SET_USER', 
      payload: { 
        first_name: firstName, 
        last_name: lastName 
      } 
    });

    // Fetch updated children
    yield put({ type: 'FETCH_CHILDREN', payload: userId });

    // Clear first time setup data
    yield put({ type: 'CLEAR_FIRST_TIME_SETUP' });


  } catch (error) {
    console.error('Error finalizing first time setup:', error);
    // Handle error (e.g., show error message to user)
    yield put({ type: 'SET_FIRST_TIME_SETUP_ERROR', payload: error.message });
  }
}

export function* firstTimeSetupSaga() {
  yield takeLatest('FINALIZE_FIRST_TIME_SETUP', finalizeFirstTimeSetup);
}