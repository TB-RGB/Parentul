import {
  takeEvery,
  put,
  call,
  race,
  take,
  takeLatest,
} from "redux-saga/effects";
import {
  SEND_MESSAGE,
  INITIALIZE_CHAT,
  RECEIVE_WEBSOCKET_MESSAGE,
  END_CONVERSATION,
  setLoading,
  receiveMessage,
  conversationEnded,
  setCurrentConversationId,
  receiveMessagesArray,
} from "../actions/chatActions";
import {
  sendWebSocketMessage,
  initializeWebSocket,
} from "../../services/websocket";
import api from "../../services/api";

function* sendMessageSaga(action) {
  console.log("sendMessageSaga started", action);
  try {
    yield put(setLoading(true));
    yield put(
      receiveMessage({ sender: "user", content: action.payload.message })
    );

    // Send message via WebSocket
    yield call(
      sendWebSocketMessage,
      action.payload.message,
      action.payload.userId
    );

    // Wait for either a WebSocket response or a timeout
    const { wsResponse, timeout } = yield race({
      wsResponse: take(RECEIVE_WEBSOCKET_MESSAGE),
      timeout: call(delay, 5000), // 5 second timeout
    });

    if (wsResponse) {
      console.log("Received WebSocket response:", wsResponse.payload);

      const { content, chatLogId } = wsResponse.payload;

      if (chatLogId) {
        yield put(setCurrentConversationId(chatLogId));
      }

      if (content) {
        if (typeof content === "string") {
          yield put(receiveMessage({ sender: "ai", content }));
        } else if (typeof content === "object" && content.text) {
          yield put(receiveMessage({ sender: "ai", content: content.text }));
        } else if (content.messages) {
          yield put(receiveMessagesArray("ai", content.messages));
        } else {
          console.error(
            "Unexpected WebSocket response format:",
            wsResponse.payload
          );
          yield put(
            receiveMessage({
              sender: "ai",
              content:
                "Sorry, I received an unexpected response. Please try again.",
            })
          );
        }
      } else if (timeout) {
        console.log("Response timed out");
        yield put(
          receiveMessage({
            sender: "ai",
            content:
              "Sorry, I didn't receive a response in time. Please try again.",
          })
        );
      }
    }
  } catch (error) {
    console.error("Error in sendMessageSaga:", error);
    yield put(
      receiveMessage({
        sender: "ai",
        content: "Sorry, I encountered an error. Please try again.",
      })
    );
  } finally {
    yield put(setLoading(false));
  }
}

function* initializeChatSaga() {
  try {
    yield call(initializeWebSocket);
  } catch (error) {
    console.error("Error initializing chat:", error);
  }
}

function* endConversationSaga(action) {
  try {
    yield call(api.endConversation, action.payload);
    yield put(conversationEnded());
  } catch (err) {
    console.error("Error ending conversation:", err);
  }
}

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const chatSaga = function* () {
  yield takeEvery(SEND_MESSAGE, sendMessageSaga);
  yield takeEvery(INITIALIZE_CHAT, initializeChatSaga);
  yield takeEvery(END_CONVERSATION, endConversationSaga);
};

export default chatSaga;
