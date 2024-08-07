import { put, call, takeLatest } from "redux-saga/effects";
import axios from "axios";

// worker Saga: will be fired on "REGISTER" actions
function* registerUser(action) {
  try {
    // Clear any existing error on the registration page
    yield put({ type: "CLEAR_REGISTRATION_ERROR" });

    // Passes the username and password from the payload to the server
    const response = yield call(
      axios.post,
      "/api/user/register",
      action.payload
    );

    if (response.data && response.data.user) {
      // Automatically log a user in after registration
      yield put({ type: "SET_USER", payload: response.data.user });
      yield put({ type: "LOGIN_SUCCESS" });
    } else {
      yield put({ type: "REGISTRATION_FAILED" });
    }
  } catch (error) {
    console.log("Error with user registration:", error);
    yield put({ type: "REGISTRATION_FAILED" });
  }
}
function* googleRegisterUser(action) {
  try {
    const response = yield call(axios.post, "/api/user/google", {
      token: action.payload.token,
    });

    if (response.data && response.data.token) {
      yield put({ type: "SET_USER", payload: response.data });
    } else {
      yield put({ type: "LOGIN_FAILED", payload: { message: "Login failed" } });
    }
  } catch (error) {
    console.log("Error with Google login:", error);
    yield put({ type: "LOGIN_FAILED", payload: { message: "Login failed" } });
  }
}

function* registrationSaga() {
  yield takeLatest("REGISTER", registerUser);
  yield takeLatest("GOOGLE_LOGIN", googleRegisterUser);
}

export default registrationSaga;
