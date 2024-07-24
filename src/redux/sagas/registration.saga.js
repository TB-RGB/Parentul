import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // clear any existing error on the registration page
    yield put({ type: 'CLEAR_REGISTRATION_ERROR' });

    // passes the username and password from the payload to the server
    yield axios.post('/api/user/register', action.payload);

    // automatically log a user in after registration
    yield put({ type: 'LOGIN', payload: action.payload });

    // set to 'login' mode so they see the login screen
    // after registration or after they log out
    yield put({ type: 'SET_TO_LOGIN_MODE' });
  } catch (error) {
    console.log('Error with user registration:', error);
    yield put({ type: 'REGISTRATION_FAILED' });
  }
}
function* googleRegisterUser(action) {
  try {
    const response = yield call(axios.post, '/api/user/google', { token: action.payload.token });

    if (response.data && response.data.token) {
      yield put({ type: 'SET_USER', payload: response.data });
    } else {
      yield put({ type: 'LOGIN_FAILED', payload: { message: 'Login failed' } });
    }
  } catch (error) {
    console.log('Error with Google login:', error);
    yield put({ type: 'LOGIN_FAILED', payload: { message: 'Login failed' } });
  }
}

function* registrationSaga() {
  yield takeLatest('REGISTER', registerUser);
  yield takeLatest('GOOGLE_LOGIN', googleRegisterUser)
}

export default registrationSaga;
