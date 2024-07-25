import { put, takeLatest } from "redux-saga/effects";
import axios from "axios";

function* fetchConversations(action) {
  try {
    const conversations = yield axios.get(
      "/api/chat/history/${action.payload.userId}"
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

const historySaga = function* historySaga() {
  yield takeLatest("FETCH_CONVERSATIONS", fetchConversations);
  yield takeLatest("FETCH_LOG", fetchLog);
};

export default historySaga;
