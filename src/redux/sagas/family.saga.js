import { put, call, takeLatest } from 'redux-saga/effects';
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

function* familySaga() {
  yield takeLatest('FETCH_FAMILY', fetchFamily);
}

export default familySaga;