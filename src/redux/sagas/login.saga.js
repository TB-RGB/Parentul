import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// worker Saga: will be fired on "LOGIN" actions
function* loginUser(action) {
  try {
    yield put({ type: 'CLEAR_LOGIN_ERROR' });

    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    const response = yield call(axios.post, '/api/user/login', action.payload, config);

    if (response.data && response.data.user) {
      yield put({ type: 'SET_USER', payload: response.data.user });
      yield put({ type: 'LOGIN_SUCCESS' });
      yield put({ type: 'CLEAR_LOGIN_ERROR'})
      yield put({ type: 'FETCH_FAMILY', payload: response.data.user.id });
    } else {
      yield put({ type: 'LOGIN_FAILED' });
    }
  } catch (error) {
    console.log('Error with user login:', error);
    yield put({ type: 'LOGIN_FAILED' });
  }
}

// worker Saga: will be fired on "LOGOUT" actions
function* logoutUser(action) {
  try {
    const config = {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true,
    };

    // the config includes credentials which
    // allow the server session to recognize the user
    // when the server recognizes the user session
    // it will end the session
    yield axios.post('/api/user/logout', config);

    // now that the session has ended on the server
    // remove the client-side user object to let
    // the client-side code know the user is logged out
    yield put({ type: 'UNSET_USER' });
    yield put({ type: 'UNSET_FAMILY'})
    yield put({ type: 'CLEAR_LOGIN_ERROR'})
    
  } catch (error) {
    console.log('Error with user logout:', error);
  }
}
function* googleLoginUser(action) {
  try {
    const response = yield call(axios.post, '/api/user/google', { token: action.payload.token });
    
    if (response.data && response.data.user) {
      yield put({ type: 'SET_USER', payload: response.data.user });
      yield put({ type: 'LOGIN_SUCCESS' });
      yield put({ type: 'FETCH_FAMILY', payload: response.data.user.id });
    } else {
      yield put({ type: 'LOGIN_FAILED', payload: { message: 'Login failed' } });
    }
  } catch (error) {
    console.log('Error with Google login:', error);
    yield put({ type: 'LOGIN_FAILED', payload: { message: 'Login failed' } });
  }
}

function* loginSaga() {
  yield takeLatest('LOGIN', loginUser);
  yield takeLatest('LOGOUT', logoutUser);
  yield takeLatest('GOOGLE_LOGIN', googleLoginUser)
}

export default loginSaga;
