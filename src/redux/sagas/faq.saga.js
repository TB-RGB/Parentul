import { put, call, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchFaq(action) {
    try {
        const response = yield call(axios.get, '/api/faq')
        yield put({ type: 'SET_FAQ', payload: response.data })
        
    }catch (error) {
        console.error('GET frequently asked questions has failed', error)
    }
}

function* faqSaga() {
    yield takeLatest('FETCH_FAQ', fetchFaq)
}

export default faqSaga;