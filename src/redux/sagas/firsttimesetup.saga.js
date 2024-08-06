import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

function* finalizeFirstTimeSetup() {
  try {
    const firstTimeSetup = yield select(state => state.firstTimeSetupReducer);
    console.log('First Time Setup State:', firstTimeSetup);

    if (!firstTimeSetup) {
      throw new Error('First Time Setup data is not available');
    }

    const { firstName, lastName, children, hasDiagnosis } = firstTimeSetup;
    const userId = yield select(state => state.user.id);

  
    const updatedUser = yield call(axios.put, '/api/user', {
      id: userId,
      first_name: firstName,
      last_name: lastName,
      has_diag_in_family: hasDiagnosis
    });

 
    for (let child of children) {
      yield call(axios.post, '/api/child', {
        ...child,
        user_id: userId
      });
    }

  
    yield put({ 
      type: 'SET_USER', 
      payload: updatedUser.data 
    });

 
    yield put({ type: 'FETCH_FAMILY', payload: userId });


    yield put({ type: 'CLEAR_FIRST_TIME_SETUP' });

 
    yield put({ type: 'REDIRECT_TO_PREFERENCES' });

  } catch (error) {
    console.error('Error finalizing first time setup:', error);
    yield put({ type: 'SET_FIRST_TIME_SETUP_ERROR', payload: error.message });
  }
}

export function* firstTimeSetupSaga() {
  yield takeLatest('FINALIZE_FIRST_TIME_SETUP', finalizeFirstTimeSetup);
}