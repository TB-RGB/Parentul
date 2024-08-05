import { call, put, takeEvery, select } from 'redux-saga/effects';
import axios from 'axios';

function* sendNotification(action) {
    try {
        // Get the current user from the Redux store
        const user = yield select(state => state.user);

        // Check if user is logged in
        if (!user.id) {
            console.error('User not logged in');
            yield put({ type: 'NOTIFICATION_SEND_FAILED', error: 'User not logged in' });
            return;
        }

        // Fetch user preferences
        const userPreferences = yield call(axios.get, `/api/user-preferences/${user.id}`);
        const { notifications_email, notifications_sms, email, phone_number } = userPreferences.data;

        const message = `You have a follow-up question: ${action.payload.questionText}`;

        if (notifications_email && email) {
            yield call(axios.post, '/api/notifications/send-email', {
                to: email,
                subject: 'Follow-up Reminder',
                text: message
            });
        }

        if (notifications_sms && phone_number) {
            yield call(axios.post, '/api/notifications/send-sms', {
                phone_number: phone_number,
                message: message
            });
        }

        yield put({ type: 'NOTIFICATION_SENT_SUCCESSFULLY' });
    } catch (error) {
        console.error('Error sending notification:', error);
        yield put({ type: 'NOTIFICATION_SEND_FAILED', error: error.message });
    }
}

function* notificationSaga() {
    yield takeEvery('SEND_NOTIFICATION', sendNotification);
}
export default notificationSaga