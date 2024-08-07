import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

function* fetchUserPreferences(action) {
  try {
    const userPreferences = yield axios.get(
      `/api/preferences/${action.payload.userId}`
    );
    yield put({ type: "SET_USER_PREFERENCES", payload: userPreferences.data });
  } catch (err) {
    console.error("Error fetching user preferences:", err);
  }
}

function* updateUserPreferences(action) {
  try {
    const { userId, preferences } = action.payload;
    console.log(
      "Updating preferences for user:",
      userId,
      "with data:",
      preferences
    );
    yield call(axios.put, `/api/preferences/${userId}`, preferences);
    console.log("Preferences updated successfully");
    yield put({ type: "FETCH_USER_PREFERENCES", payload: { userId } });
  } catch (error) {
    console.error("Error updating user preferences:", error);
  }
}

function* createUserPreferences(action) {
  try {
    yield axios.post("/api/preferences", action.payload);
    yield put({ type: "FETCH_USER_PREFERENCES", payload: action.payload });
  } catch (err) {
    console.error("Error creating user preferences:", err);
  }
}

function* preferencesSaga() {
  yield takeLatest("FETCH_USER_PREFERENCES", fetchUserPreferences);
  yield takeLatest("UPDATE_USER_PREFERENCES", updateUserPreferences);
  yield takeLatest("CREATE_USER_PREFERENCES", createUserPreferences);
}

export default preferencesSaga;
