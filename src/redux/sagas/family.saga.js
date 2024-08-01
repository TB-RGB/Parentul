import { put, call, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFamily(action) {
  try {
    const response = yield call(axios.get, `/api/child/family/${action.payload}`);
    if (response.data) {
      yield put({ type: 'SET_FAMILY', payload: response.data });
    } else {
      console.log('No family data returned');
    }
  } catch (error) {
    console.log('Family get request failed', error);
  }
}

function* addChild(action) {
  try {
    const response = yield call(axios.post, '/api/child', action.payload);
    yield put({ type: 'ADD_CHILD_SUCCESS', payload: response.data });
    yield put({ type: 'FETCH_FAMILY', payload: action.payload.user_id });
  } catch (error) {
    console.error('Error adding child:', error);
  }
}

function* updateFamily(action) {
  try {
    const user = yield select(state => state.user);
    const userUpdateResponse = yield call(axios.put, '/api/child/update-user', {
      id: user.id,
      first_name: action.payload.firstName,
      last_name: action.payload.lastName
    });
    yield put({ type: 'UPDATE_USER_SUCCESS', payload: userUpdateResponse.data });
    const children = action.payload.children.map(child => ({
      ...child,
      user_id: user.id
    }));
    
    yield call(axios.put, '/api/child/update', { children });
    yield put({ type: 'UPDATE_FAMILY_SUCCESS' });
    yield put({ type: 'FETCH_FAMILY', payload: user.id });
  } catch (error) {
    console.error('Error updating family:', error);
  }
}

function* deleteChild(action) {
  try {
    const { childId } = action.payload;
    yield call(axios.delete, `/api/child/${childId}`);
    yield put({ type: 'DELETE_CHILD_SUCCESS', payload: childId });
    
    const userId = yield select(state => state.user.id);
    yield put({ type: 'FETCH_FAMILY', payload: userId });
  } catch (error) {
    console.error('Error deleting child:', error);
  }
}

function* familySaga() {
  yield takeLatest('FETCH_FAMILY', fetchFamily);
  yield takeLatest('ADD_CHILD', addChild);
  yield takeLatest('UPDATE_FAMILY', updateFamily);
  yield takeLatest('DELETE_CHILD', deleteChild)
}

export default familySaga;