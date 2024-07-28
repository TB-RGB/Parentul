import { takeLatest, put } from "redux-saga/effects"; 
import axios from "axios";

function* fetchUserPreferences(action) {
    try {
        const userPreferences = yield axios.get(`/api/preferences/${action.payload.userId}`);
        yield put({ type: 'SET_USER_PREFERENCES', payload: userPreferences.data });
    } catch (err) {
        console.error('Error fetching user preferences:', err);
    }
}

function* updateUserPreferences(action) {
    try {
        yield axios.put(`/api/preferences/${action.payload.userId}`, action.payload.preferences);
        yield put({ type: 'FETCH_USER_PREFERENCES', payload: action.payload.userId });
    } catch (err) {
        console.error('Error updating user preferences:', err);
    }
}

function* createUserPreferences(action) {
    try {
        yield axios.post('/api/preferences', action.payload);
        yield put({ type: 'FETCH_USER_PREFERENCES', payload: action.payload.user_id });
    } catch (err) {
        console.error('Error creating user preferences:', err);
    }
}



function* preferencesSaga() {
    yield takeLatest('FETCH_USER_PREFERENCES', fetchUserPreferences);
    yield takeLatest('UPDATE_USER_PREFERENCES', updateUserPreferences);
    yield takeLatest('CREATE_USER_PREFERENCES', createUserPreferences);
}

export default preferencesSaga;