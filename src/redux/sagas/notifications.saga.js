import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

function* checkJobStatus() {
  try {
    const response = yield call(axios.get, '/api/notifications/job-status');
    console.log('Job Status:', response.data);
    yield put({ type: 'SET_JOB_STATUS', payload: response.data });
  } catch (error) {
    console.error('Error checking job status:', error);
    yield put({ type: 'FETCH_JOB_STATUS_FAILED', error: error.message });
  }
}

function* notificationSaga() {
  yield takeEvery('CHECK_JOB_STATUS', checkJobStatus);
}

export default notificationSaga;