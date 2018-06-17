import { takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST } from "./actions/login";

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, fetchLoginAsync);
}

export default watchLoginRequest;
