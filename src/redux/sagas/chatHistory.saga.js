import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchConversations(action) {
  try {
    const conversations = yield axios.get(
      `/api/chat/history/${action.payload.userId}`
    );
    yield put({ type: "SET_CONVERSATIONS", payload: conversations.data });
  } catch (err) {
    console.error("Error fetching conversations:", err);
  }
}

function* fetchLog(action) {
  try {
    const log = yield axios.get(
      `/api/chat/log/${action.payload.conversationId}`
    );
    yield put({ type: "SET_LOG", payload: log.data });
  } catch (err) {
    console.error("Error fetching log:", err);
  }
}

function* sendFeedback(action) {
    try {
        yield axios.post(`/api/chat/feedback`, action.payload);
        yield axios.post(`/api/followup`, {conversationId: action.payload.conversationId, userId: action.payload.userId, questionText: action.payload.questionText});
    } catch (err) {
        console.error("Error sending feedback:", err);
    }
}

function* deleteConversation(action) {
  try {
    yield axios.delete(`/api/chat/conversation/${action.payload.conversationId}`);
    yield put({ 
      type: "FETCH_CONVERSATIONS", 
      payload: { userId: action.payload.userId } 
    });
  } catch (err) {
    console.error("Error deleting conversation:", err);
  }
}

const historySaga = function* historySaga() {
  yield takeLatest("FETCH_CONVERSATIONS", fetchConversations);
  yield takeLatest("FETCH_LOG", fetchLog);
  yield takeLatest('SEND_FEEDBACK', sendFeedback);
  yield takeLatest('DELETE_CONVERSATION', deleteConversation)
};

export default historySaga;
