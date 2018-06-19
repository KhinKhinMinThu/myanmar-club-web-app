import axios from "axios";
import { takeLatest } from "redux-saga/effects";
import { LOGIN_REQUEST } from "./actions/login";

axios.defaults.baseURL = "https://api.example.com";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.method = "POST";

function* watchLoginRequest() {
  yield takeLatest(LOGIN_REQUEST, fetchLoginAsync);
}

export default watchLoginRequest;
